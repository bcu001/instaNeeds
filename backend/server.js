import express from 'express';

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.json({ message: "instaNeeds" });
})


app.listen(PORT, () => {
    console.log(`server live at http://localhost:${PORT}`)
})