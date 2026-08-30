import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import apiResponse from "../utils/apiResponse.js";


export const addToCart = async(req,res)=>{
    try{
        const {productId, qty} = req.body;
        const {_id} = req.user;
        const product = await Product.findById(productId);
        const userCart = await Cart.findOne({userId:_id});
        if(!userCart) {
            const newCart = await Cart.create({
                userId:_id,
                items:[{
                    productId,
                    quantity:qty,
                    price: product.price
                }]
            });
            return apiResponse(res,"product added to cart", 200, {cart:newCart});
        }

        const existingProduct = userCart.items.find(item=> item.productId === productId);
        if(existingProduct){
            existingProduct.quantity += qty;
        } else{
            userCart.items.push({
                productId,
                quantity:qty,
                price: product.price
            })
        }
        await userCart.save();
        return apiResponse(res,"product added to cart", 200, {cart:userCart});
    } catch(error){
        console.error("Error at addToCart", error);
        return apiResponse(res,"Error at addToCart", 500);
    }
}

export const removeFromCart = async(req,res)=>{
    try {
        const {productId} =req.body;
        const {_id} =req.user;
        const userCart = await Cart.findOne({userId:_id});
        const existingProduct = userCart.items.find(item=>item.productId.equals(productId));
        if(!existingProduct){
            return apiResponse(res,"item not found",200, {cart:userCart});
        }
        userCart.items = userCart.items.filter(item=>item.productId.toString() !== productId.toString());
        await userCart.save();
        return apiResponse(res,"item removed from cart", 200, {cart:userCart});
    } catch (error) {
        console.error("Error at removeFromCart",error);
        return apiResponse(res,"Error at removeFromCart", 500);
    }
}