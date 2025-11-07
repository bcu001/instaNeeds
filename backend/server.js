import express from 'express';
import { PORT } from "./config/config.js"

const app = express();

app.get("/", (req, res) => {
    res.json({ message: "instaNeeds" });
})


app.listen(PORT, () => {
    console.log(`server live at http://localhost:${PORT}`)
})