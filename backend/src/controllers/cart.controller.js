import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import apiResponse from "../utils/apiResponse.js";

export const getCart = async(req,res)=>{
    try {
        const {_id} = req.user;
        const cart = await Cart.find({userId:_id});
        if(!cart[0]) {
            const userCart = await Cart.create({
                userId:_id,
                items:[]
            })
            return apiResponse(res, "cart created",201, {cart:userCart})
        }
        const totalItems = cart[0].items.reduce((total,i)=>total+i.quantity,0);
        const totalPrice = Number( cart[0].items.reduce((sum,i)=>{
            return sum + (i.price * i.quantity);
        },0).toFixed(2));
        return apiResponse(res, "cart found",200, {
            cart: cart[0],
            totalItems,
            totalPrice
        })
    } catch (error) {
        console.error("Error at getCart", error);
        return apiResponse(res,"Error at getCart", 500);
    }
}

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

        const existingProduct = userCart.items.find(item=> item.productId.equals(productId));
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
        if(existingProduct.quantity === 1){
            userCart.items = userCart.items.filter(item=>item.productId.toString() !== productId.toString());
        } else {
            --userCart.items.find(item=>item.productId.equals(productId)).quantity;
        }
        await userCart.save();
        return apiResponse(res,"item removed from cart", 200, {cart:userCart});
    } catch (error) {
        console.error("Error at removeFromCart",error);
        return apiResponse(res,"Error at removeFromCart", 500);
    }
}

export const clearCart = async(req,res)=>{
    try{
        const {_id} = req.user;
        const userCart = await Cart.findOne({userId:_id});
        if(!userCart) return apiResponse(res, "cart already clear", 200);
        userCart.items = [];
        await userCart.save();
        return apiResponse(res, "cart cleared", 200);
    } catch(error){
        console.error("Error at clearCart",error);
        return apiResponse(res,"Error at clearCart", 500);
    }

}