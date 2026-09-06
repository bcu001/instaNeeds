import { Router } from 'express';
import { createOrder, getUserOrders, getUserOrderById, updateOrderStatus, getAllOrders, } from '../controllers/order.controller.js';
import authorize from "../middleware/auth.middleware.js"

const orderRouter = Router();

orderRouter.post("/create", authorize, createOrder);
orderRouter.get("/user/:id", authorize, getUserOrders);
orderRouter.get("/:orderId", authorize, getUserOrderById);

// admin only stuff (later)
orderRouter.put("/:orderId/status", updateOrderStatus)
orderRouter.get("/orders", getAllOrders)

export default orderRouter;