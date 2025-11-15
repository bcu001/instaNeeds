import express from 'express';
import { PORT } from "./config/config.js"
import connectToDatabase from './database/mongodb.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import productRouter from './routes/product.routes.js';
import fs from 'fs/promises';
import Product from './models/product.model.js';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173"
    })
)

app.use('/api/v1/auth', authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);

app.get("/", (req, res) => {
    res.json({ message: "instaNeeds" });
})

app.use("/bulk", async (req, res) => {
    try {
        const out = await fs.readFile("./test/DummyData.json");
        const productList = await JSON.parse(out);
        const docs = productList.map(item=>new Product(item))

        // await Product.bulkSave(docs);

        res.json(docs);
    } catch (error) {
        res.send(error.message);
    }

})


app.listen(PORT, async () => {
    console.log(`server live at http://localhost:${PORT}`);
    await connectToDatabase();
})