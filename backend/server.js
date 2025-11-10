import express from 'express';
import { PORT } from "./config/config.js"
import connectToDatabase from './database/mongodb.js';

const app = express();

app.get("/", (req, res) => {
    res.json({ message: "instaNeeds" });
})


app.listen(PORT, async () => {
    console.log(`server live at http://localhost:${PORT}`);
    await connectToDatabase();
})