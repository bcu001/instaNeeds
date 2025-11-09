import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
    },
    imageURL: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2014/03/25/16/55/lightning-297607_960_720.png",
        trim: true,
    },
    category: {
        type: String,
        enum: ["fruits-veg", "dairy", "snacks", "cold-drinks", "personal-care", "others"],
        require: true
    },
    price: {
        type: Number,
        required: [true, "price is always required"],
        min: [0, "price should be greater than 0"],

    },
    stock: {
        type: Number,
        required: [true, "amount of stock available required"],
        min: [1, "stock should be greater or equal to 1"]
    },
    isActive: {

    }, unit: {
        type: String,
        required: [true, "unit type is required"],
        enum: {
            values: ["g", "kg", "ml", "L", "piece", "pack", "bunch", "box"],
            message: "{VALUE} is not valid unit"
        }
    }


}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;