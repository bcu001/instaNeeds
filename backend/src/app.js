import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import productRouter from './routes/product.routes.js';
import cors from 'cors';
import orderRouter from './routes/order.routes.js';
import ENV from './config/env.js';
import cartRouter from './routes/cart.routes.js';
import categoryRouter from './routes/category.routes.js';
import morgan from 'morgan'
import helmet from 'helmet'
import { errorHandler, notFound } from './middleware/error.middleware.js';
import rateLimiter from "./middleware/rateLimiter.middleware.js"
import paymentRouter from "./routes/payment.routes.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: ENV.CLIENT_URL,
        credentials:true
    })
)
app.use(morgan("dev"))
// app.use(helmet({
//     contentSecurityPolicy: {
//         directives: {
//             "script-src": ["'self'", "https://checkout.razorpay.com"],
//             "frame-src": ["'self'", "https://checkout.razorpay.com"],
//             "connect-src": ["'self'", "https://api.razorpay.com"],
//         },
//     },
// }))
app.use(rateLimiter);

app.get("/", (req, res) => {
    res.json({ message: "instaNeeds" });
})

const apiVersion = "api/v1";

app.use(`/${apiVersion}/auth`, authRouter);
app.use(`/${apiVersion}/users`, userRouter);
app.use(`/${apiVersion}/products`, productRouter);
app.use(`/${apiVersion}/orders`, orderRouter);
app.use(`/${apiVersion}/cart`, cartRouter);
app.use(`/${apiVersion}/categories`, categoryRouter)
app.use("/api", paymentRouter);
app.use(`/${apiVersion}`, paymentRouter);

app.use(notFound);
app.use(errorHandler);

export default app;