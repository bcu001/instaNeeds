import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";
import {
    createRazorpayOrder,
    verifyRazorpayPayment,
} from "../controllers/order.controller.js";

const paymentRouter = Router();

paymentRouter.post("/create-order", authorize, createRazorpayOrder);
paymentRouter.post("/verify-payment", authorize, verifyRazorpayPayment);

export default paymentRouter;