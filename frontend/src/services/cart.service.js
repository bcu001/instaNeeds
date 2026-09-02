import api from "@/lib/axios"
import toast from "react-hot-toast";

export const getCart = async()=>{
    const res = await api.get(`/cart`);
    return res.data?.data;
}

export const addToCart = async(productId, qty)=>{
    const res = await api.post(`/cart`,{productId, qty})
    if(res.data?.data) toast.success("Item added to cart");
    return res.data?.data;
}

export const removeFromCart = async(productId)=>{
    const res =await api.delete(`/cart`,{
        data: {productId},
    });
    if(res.data?.data) toast.success("Item removed from cart");
    return res.data?.data;
}

export const clearCart = async()=>{
    const res = await api.delete(`/cart/clear`)
    if(res.data?.success === true) toast.success("Cart Cleared");
    return res.data?.data;
}