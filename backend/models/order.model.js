import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "ProductId is reqruied for ref"],
    },
    name: {
        type: String,
        required: [true, "name is requried for order"],
    },
    price: {
        type: Number,
        required: [true, "price is requried for order"],
    },
    quantity: {
        type: Number,
        default: 1
    },
    image: {
        type: String
    }
}, { _id: false });

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "userid is required for order"]
    },
    items: {
        type: [orderItemSchema],
        validate: v => Array.isArray(v) && v.length > 0,
    },
    totalAmount: {
        type: Number,
        min: 0,
    },
    address: {
        type: String,
        required: [true, "need address!"]
    },
    paymentMethod: {
        type: String,
        enum: ["COD", "online"],
        default: "COD"
    },
    status: {
        type: String,
        enum: ["placed", "confirmed", "out_for_delivery", "delivered", "cancelled"],
        default: "placed"
    }
}, { timestamps: true });

orderSchema.pre("save", function(next){
    let ta = 0;
    this.items.forEach(item=>{
        ta += item.price * item.quantity;
    });

    this.totalAmount = ta;
    next();
})

const Order = mongoose.model("Order", orderSchema);
export default Order; 