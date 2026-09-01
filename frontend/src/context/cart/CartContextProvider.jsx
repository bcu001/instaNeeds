import { useCallback,useState } from "react";
import { addToCart, clearCart, getCart, removeFromCart } from "@/services/cart.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CartContext from "@/context/cart/CartContext";

export const CartProviderV2 = ({children})=>{
    const queryClient = useQueryClient();
    const [isDrawerOpen, setDrawerOpen] = useState(false)

    const {data:cartData, isLoading} = useQuery({
        queryKey:['cart'],
        queryFn:getCart,
        staleTime: 20 * 1000,
    })

    const addItemMutation = useMutation({
        mutationFn: ({productId,qty})=>addToCart(productId,qty),
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey:["cart"]
            })
        }
    })

    const removeItemMutation = useMutation({
        mutationFn: ({productId})=>removeFromCart(productId),
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey:['cart']
            })
        }
    })

    const clearCartMutation = useMutation({
        mutationFn: clearCart,
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey:['cart']
            })
        }
    })

    const addToCartHandler = (productId, qty=1)=>addItemMutation.mutate({productId,qty});
    const removeFromCartHandler = (productId)=>removeItemMutation.mutate({productId});
    const clearCartHandler = ()=> clearCartMutation.mutate();
    const openDrawer = useCallback(() => setDrawerOpen(true), [])
    const closeDrawer = useCallback(() => setDrawerOpen(false), [])
    const getQty = (productId)=>{
        const item = cartData?.cart.items.find(i=>i.productId === productId);
        return item?.quantity;
    }
    const isProdcutInCart = (productId)=>{
        const item = cartData?.cart.items.find(i=>i.productId===productId)
        return item ? true : false;
    }

    return (
        <CartContext.Provider value={{
            cartData,
            isLoading,
            addToCart:addToCartHandler,
            removeFromCart:removeFromCartHandler,
            clearCart:clearCartHandler,
            isDrawerOpen,
            openDrawer,
            closeDrawer,
            getQty,
            isProdcutInCart
        }}>
            {children}
        </CartContext.Provider>
    )
}