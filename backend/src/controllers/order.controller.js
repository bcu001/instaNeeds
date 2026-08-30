import Order from "../models/order.model.js"
import apiResponse from "../utils/apiResponse.js";

export const createOrder = async (req, res) => {
    try {
        const newOrder = await Order.create({
            ...req.body,
            userId: req.user._id,
        })
        return apiResponse(res,"order created",200, {order:newOrder});
    } catch (error) {
        console.error("Error at createOrder",error);
        return apiResponse(res,"Error at createOrder",500);
    }
}
export const getUserOrders = async (req, res) => {
    try {
        const { id } = req.params;
        if (!req.user._id === id) return apiResponse(res, "access denied!", 401) 

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
        return apiResponse(res, "order found", 200, {order});

    } catch (error) {
       console.error("Error at getUserOrderById",error);
        return apiResponse(res,"Error at getUserOrderById",500);
    }
}
export const updateOrderStatus = async (req, res) => { }
export const getAllOrders = async (req, res) => { }