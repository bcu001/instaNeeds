import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "productId is required"]
    },
    quantity: {
        type: Number,
        required: [true, "quantity is required"],
        min: [1, "at least 1 quantity is required"]
    },
    price: {
        type: Number,
        required: [true, "price is required"]
    }
}, { _id: false });

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "userId is required"],
        unique: true 
    },
    items: [cartItemSchema]
}, { timestamps: true });

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
