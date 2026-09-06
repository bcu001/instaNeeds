import { useCallback,useState } from "react";
import { addToCart, clearCart, getCart, removeFromCart } from "@/services/cart.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CartContext from "@/context/cart/CartContext";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { getApiErrorMessage } from "@/lib/apiError";

const CartContextProvider = ({children})=>{
    const queryClient = useQueryClient();
    const [isDrawerOpen, setDrawerOpen] = useState(false)
    const {isAuthenticated} = useAuth();

    const {data:cartData, isLoading, isError, error, refetch} = useQuery({
        queryKey:['cart'],
        queryFn:getCart,
        staleTime: 20 * 1000,
        enabled : isAuthenticated
    })

    const addItemMutation = useMutation({
        mutationFn: ({productId,qty})=>addToCart(productId,qty),
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey:["cart"]
            })
        },
        onError: (error) => toast.error(getApiErrorMessage(error, "Unable to add item to cart"))
    })

    const removeItemMutation = useMutation({
        mutationFn: ({productId})=>removeFromCart(productId),
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey:['cart']
            })
        },
        onError: (error) => toast.error(getApiErrorMessage(error, "Unable to remove item from cart"))
    })

    const clearCartMutation = useMutation({
        mutationFn: clearCart,
        onSuccess: ()=>{
            queryClient.invalidateQueries({
                queryKey:['cart']
            })
        },
        onError: (error) => toast.error(getApiErrorMessage(error, "Unable to clear cart"))
    })

    const addToCartHandler = (productId, qty=1)=>{
        if(!isAuthenticated) return;
        addItemMutation.mutate({productId,qty})
    };
    const removeFromCartHandler = (productId)=>{
        if(!isAuthenticated) return;
        removeItemMutation.mutate({productId});
    }
    const clearCartHandler = ()=> {
        if(!isAuthenticated) return;
        clearCartMutation.mutate();
    }
    const openDrawer = useCallback(() => {
        if(!isAuthenticated) return;
        setDrawerOpen(true)
    }, [isAuthenticated])
    const closeDrawer = useCallback(() => setDrawerOpen(false), [])
    const getQty = (productId)=>{
        if(!isAuthenticated) return;
        const item = cartData?.cart.items.find(i=>i.productId === productId);
        return item?.quantity;
    }
    const isProdcutInCart = (productId)=>{
        if(!isAuthenticated) return;
        const item = cartData?.cart.items.find(i=>i.productId===productId)
        return item ? true : false;
    }

    return (
        <CartContext.Provider value={{
            cartData,
            isLoading,
            isError,
            error,
            refetch,
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

export default CartContextProvider