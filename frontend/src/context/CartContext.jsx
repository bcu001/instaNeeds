import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { createContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const syncCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  const totalAmount = useMemo(() => {
    return cart.reduce((sum, item) => {
      const price = Number(item.price) || 0;
      const qty = Number(item.quantity) || 0;
      return sum + price * qty;
    }, 0);
  }, [cart]);

  const addToCart = (product) => {
    const newCart = [...cart];
    const pIdx = newCart.findIndex((p) => p._id === product._id);

    if (pIdx !== -1) {
      newCart[pIdx] = {
        ...newCart[pIdx],
        quantity: newCart[pIdx].quantity + (product.quantity || 1),
      };
    } else {
      const { _id, title, price, quantity = 1, imageURL } = product;
      newCart.push({ _id, title, price, quantity, imageURL });
    }

    syncCart(newCart);
  };

  const removeFromCart = (product) => {
    const newCart = cart.filter((p) => p._id !== product._id);
    syncCart(newCart);
  };

  const clearCart = () => {
    syncCart([]);
  };

  const updateCart = (_id, updates) => {
    const newCart = cart.map((item) =>
      item._id === _id ? { ...item, ...updates } : item
    );
    syncCart(newCart);
  };

  const value = useMemo(
    () => ({
      cart,
      totalAmount,
      addToCart,
      removeFromCart,
      updateCart,
      clearCart,
    }),
    [cart, totalAmount]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
