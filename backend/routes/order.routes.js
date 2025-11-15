import { Router } from 'express';
import { createOrder, getUserOrders, getUserOrderById, updateOrderStatus, getAllOrders, } from '../controllers/order.controller.js';

const orderRouter = Router();

orderRouter.post("/create", createOrder);
orderRouter.get("/user/:id", getUserOrders);
orderRouter.get("/:orderId", getUserOrderById);
orderRouter.put("/:orderId/status", updateOrderStatus)
orderRouter.get("/orders", getAllOrders)

export default orderRouter;