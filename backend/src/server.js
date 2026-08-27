import connectDB from './config/db.js';
import app from './app.js';
import ENV from './config/env.js';

const PORT = ENV.PORT || 8000;

app.get("/", (req, res) => {
    res.json({ message: "instaNeeds" });
})

const startServer = async()=>{
   try{
        await connectDB();
        app.listen(PORT,()=>{
            console.log(`server is running on http://localhost:${PORT}`)
        })
    } catch(error){
        console.error("Error at startServer: ", error);
        process.exit(1);
    }
}
startServer();