import Order from "../models/order.model.js"
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import Razorpay from "razorpay";
import crypto from "node:crypto";
import ENV from "../config/env.js";
import apiResponse from "../utils/apiResponse.js";

const CURRENCY = "INR";
const FREE_DELIVERY_ABOVE = 199;
const DELIVERY_FEE = 39;
const MAX_RAZORPAY_RETRIES = 2;

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const getRazorpayClient = () => new Razorpay({
    key_id: ENV.RAZORPAY_KEY_ID,
    key_secret: ENV.RAZORPAY_KEY_SECRET,
});

const isRetryableRazorpayError = (error) => {
    const statusCode = error?.statusCode ?? error?.status;
    return !statusCode || statusCode >= 500 || error?.code === "ETIMEDOUT" || error?.code === "ECONNRESET";
};

const createRazorpayOrderWithRetry = async (client, options) => {
    for (let attempt = 0; attempt <= MAX_RAZORPAY_RETRIES; attempt += 1) {
        try {
            return await client.orders.create(options);
        } catch (error) {
            if (!isRetryableRazorpayError(error) || attempt === MAX_RAZORPAY_RETRIES) throw error;
            await sleep(250 * (2 ** attempt));
        }
    }
};

const getRazorpayError = (error) => ({
    statusCode: error?.statusCode ?? error?.status,
    code: error?.error?.code ?? error?.code,
    description: error?.error?.description ?? error?.description,
});

const providerFailure = (res, error, operation) => {
    const providerError = getRazorpayError(error);
    console.error(`Razorpay ${operation} failed`, {
        code: providerError.code,
        description: providerError.description,
    });

    if (providerError.statusCode === 400) {
        return apiResponse(res, providerError.description || "Razorpay rejected the request", 400);
    }
    if (providerError.statusCode === 401) {
        return apiResponse(res, "payment provider misconfigured", 500);
    }
    return apiResponse(res, "Payment provider temporarily unavailable", 503);
};

export const createRazorpayOrder = async (req, res) => {
    try {
        const { address, phone, fullName, deliverySlot } = req.body;
        if (typeof address !== "string" || address.trim().length < 8) {
            return apiResponse(res, "address is required", 400);
        }
        if (typeof phone !== "string" || !/^[6-9]\d{9}$/.test(phone)) {
            return apiResponse(res, "phone must be a valid 10-digit mobile number", 400);
        }
        if (typeof fullName !== "string" || fullName.trim().length < 2) {
            return apiResponse(res, "fullName is required", 400);
        }

        const cart = await Cart.findOne({ userId: req.user._id });
        if (!cart?.items?.length) return apiResponse(res, "cart is empty", 400);

        const products = await Product.find({
            _id: { $in: cart.items.map((item) => item.productId) },
            isActive: true,
        }).select("title imageURL");
        const productsById = new Map(products.map((product) => [product._id.toString(), product]));
        const items = cart.items.map((item) => {
            const product = productsById.get(item.productId.toString());
            if (!product) throw new Error("A cart item is no longer available");
            return {
                productId: item.productId,
                name: product.title,
                price: item.price,
                quantity: item.quantity,
                image: product.imageURL,
            };
        });

        const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const deliveryFee = subtotal >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE;
        const totalAmount = Number((subtotal + deliveryFee).toFixed(2));
        const amount = Math.round(totalAmount * 100);
        if (!Number.isInteger(amount) || amount < 100) return apiResponse(res, "amount must be at least 100 subunits", 400);

        const internalOrder = await Order.create({
            userId: req.user._id,
            items,
            totalAmount,
            deliveryFee,
            address: address.trim(),
            phone,
            deliverySlot,
            paymentMethod: "online",
            paymentStatus: "pending",
        });
        const receipt = `IN-${internalOrder._id.toString()}`.slice(0, 40);
        const razorpayOrder = await createRazorpayOrderWithRetry(getRazorpayClient(), {
            amount,
            currency: CURRENCY,
            receipt,
            notes: { order_id: internalOrder._id.toString() },
        });
        if (!razorpayOrder?.id) {
            console.error("Razorpay create order response did not include an id");
            return apiResponse(res, "Payment provider integration failure", 502);
        }

        internalOrder.razorpayOrderId = razorpayOrder.id;
        await internalOrder.save();
        return apiResponse(res, "payment order created", 201, {
            order_id: razorpayOrder.id,
            amount,
            currency: CURRENCY,
            key_id: ENV.RAZORPAY_KEY_ID,
            internal_order_id: internalOrder._id,
        });
    } catch (error) {
        if (error?.statusCode || error?.status || error?.error) return providerFailure(res, error, "order creation");
        console.error("Error at createRazorpayOrder", error);
        return apiResponse(res, error.message || "Error at createRazorpayOrder", 500);
    }
};

export const verifyRazorpayPayment = async (req, res) => {
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
        if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
            return apiResponse(res, "razorpay_payment_id, razorpay_order_id, and razorpay_signature are required", 400);
        }

        const expectedSignature = crypto
            .createHmac("sha256", ENV.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");
        const expectedBuffer = Buffer.from(expectedSignature, "utf8");
        const receivedBuffer = Buffer.from(razorpay_signature, "utf8");
        const signatureMatches = expectedBuffer.length === receivedBuffer.length
            && crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
        if (!signatureMatches) return apiResponse(res, "Invalid payment signature", 400);

        const order = await Order.findOne({
            razorpayOrderId: razorpay_order_id,
            userId: req.user._id,
        });
        if (!order) return apiResponse(res, "order not found", 404);
        if (order.paymentStatus === "paid") return apiResponse(res, "payment already verified", 200, { order });

        order.paymentStatus = "paid";
        order.razorpayPaymentId = razorpay_payment_id;
        order.razorpaySignature = razorpay_signature;
        order.paidAt = new Date();
        order.status = "confirmed";
        await order.save();
        await Cart.findOneAndUpdate({ userId: req.user._id }, { $set: { items: [] } });
        return apiResponse(res, "payment verified", 200, { order });
    } catch (error) {
        console.error("Error at verifyRazorpayPayment", error);
        return apiResponse(res, "Error at verifyRazorpayPayment", 500);
    }
};

export const createOrder = async (req, res) => {
    try {
        const newOrder = await Order.create({
            ...req.body,
            userId: req.user._id,
        })
        return apiResponse(res,"order created",201, {order:newOrder});
    } catch (error) {
        console.error("Error at createOrder",error);
        return apiResponse(res,"Error at createOrder",500);
    }
}
export const getUserOrders = async (req, res) => {
    try {
        const { id } = req.params;
        if (req.user._id.toString() !== id) return apiResponse(res, "access denied!", 403)

        const userOrders = await Order.find({ userId: id })
        return apiResponse(res, "orders found", 200, {orders:userOrders});
    } catch (error) {
        console.error("Error at getUserOrders",error);
        return apiResponse(res,"Error at getUserOrders",500);
    }
}
export const getUserOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId);
        if (!order) return apiResponse(res, "order not found", 404);
        if (order.userId.toString() !== req.user._id.toString()) return apiResponse(res, "access denied!", 403);
        return apiResponse(res, "order found", 200, {order});

    } catch (error) {
       console.error("Error at getUserOrderById",error);
        return apiResponse(res,"Error at getUserOrderById",500);
    }
}
export const updateOrderStatus = async (req, res) => { 
    try{
        return apiResponse(res, "api is not ready", 404)
    } catch(error){
        console.error("Error at updateOrderStatus",error);
        return apiResponse(res,"Error at updateOrderStatus",500);
    }
}
export const getAllOrders = async (req, res) => { 
      try{
        return apiResponse(res, "api is not ready", 404)
    } catch(error){
        console.error("Error at getAllOrders",error);
        return apiResponse(res,"Error at getAllOrders",500);
    }
}