import mongoose from "mongoose";
import Product from "../models/product.model.js";
import { products } from "./dummyData.js";
import connectDB from "../config/db.js";



const seedProducts = async () => {
    try {
        await connectDB();

        console.log("MongoDB connected");

        let created = 0;
        let updated = 0;

        for (const product of products) {
            const existingProduct = await Product.findOne({
                title: product.title
            });

            if (existingProduct) {
                await Product.updateOne(
                    { _id: existingProduct._id },
                    { $set: product }
                );

                updated++;
            } else {
                await Product.create(product);
                created++;
            }
        }

        console.log(`Products created: ${created}`);
        console.log(`Products updated: ${updated}`);
        console.log(`Total seed products: ${products.length}`);

        await mongoose.disconnect();
        console.log("MongoDB disconnected");

    } catch (error) {
        console.error("Seeding failed:", error);

        await mongoose.disconnect();
        process.exit(1);
    }
};

seedProducts();