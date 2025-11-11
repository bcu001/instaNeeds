import express from 'express';
import { PORT } from "./config/config.js"
import connectToDatabase from './database/mongodb.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
    res.json({ message: "instaNeeds" });
})


app.listen(PORT, async () => {
    console.log(`server live at http://localhost:${PORT}`);
    await connectToDatabase();
})