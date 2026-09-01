import CartContext from "@/context/cart/CartContext"
import { useContext } from "react"

const useCartContext = ()=>{
    const ctx = useContext(CartContext)
    if(!ctx) throw new Error("Error at useCartContext");
    return ctx;
}

export default useCartContext;