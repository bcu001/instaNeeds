import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import productRouter from './routes/product.routes.js';
import cors from 'cors';
import orderRouter from './routes/order.routes.js';
import ENV from './config/env.js';


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: ENV.CLIENT_URL
    })
)

const apiVersion = "api/v1";

app.use(`/${apiVersion}/auth`, authRouter);
app.use(`/${apiVersion}/users`, userRouter);
app.use(`/${apiVersion}/products`, productRouter);
app.use(`/${apiVersion}/orders`, orderRouter);

export default app;