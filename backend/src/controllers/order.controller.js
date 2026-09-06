import Order from "../models/order.model.js"
import apiResponse from "../utils/apiResponse.js";

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