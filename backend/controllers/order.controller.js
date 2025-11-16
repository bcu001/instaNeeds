import Order from "../models/order.model.js"

export const createOrder = async (req, res) => {
    try {
        const { items, address } = req.body;

        const newOrder = await Order.create({
            ...req.body,
            userId: req.user._id,
        })

        return res.status(200).json({
            success: true,
            data: {
                order: newOrder
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const getUserOrders = async (req, res) => {
    try {
        const { id } = req.params;
        if (!req.user._id === id) {
            const error = new Error("id not match with token");
            error.statusCode = 401;
            throw error;
        }

        const userOrders = await Order.find({ userId: id })

        return res.status(200).json({
            success: true,
            data: {
                orders: userOrders,
            }
        })

    } catch (error) {
        const status = error.statusCode || 500;

        return res.status(status).json({
            success: false,
            message: error.message
        })
    }
}
export const getUserOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;

        const order = await Order.findById(orderId);

        return res.status(200).json({
            success: true,
            data: {
                order
            }
        })

    } catch (error) {
        const status = error.statusCode || 500;

        return res.status(status).json({
            success: false,
            message: error.message
        })
    }
}
export const updateOrderStatus = async (req, res) => { }
export const getAllOrders = async (req, res) => { }