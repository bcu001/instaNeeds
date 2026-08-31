import connectDB from "../config/db.js"
import categorySeedData from "./dummyCategoryData.js";
import Category from "../models/category.model.js"
import mongoose from "mongoose";


const seedCategory = async()=>{
    try{
        await connectDB();
        console.log("mongodb connected");

        let created = 0;
        let updated = 0;

        for( const category of categorySeedData){
            const existingCategory = await Category.findOne({
                categoryName: category.categoryName
            })

            if(existingCategory){
                await Category.updateOne(
                    {_id: existingCategory._id},
                    {$set: category}
                );
                updated++;
            } else{
                await Category.create(category);
                created++;
            }
        }

        console.log(`Products created: ${created}`);
        console.log(`Products updated: ${updated}`);
        console.log(`Total seed products: ${categorySeedData.length}`);
         await mongoose.disconnect();
        console.log("MongoDB disconnected");
    } catch(error){
        console.error("Seeding failed:", error);
        await mongoose.disconnect();
        process.exit(1);
    }
}

seedCategory();