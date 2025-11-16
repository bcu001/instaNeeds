import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  //  cart's items -> productId , quantity, price
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  //   restore cart info when refreshing the page
  useEffect(() => {
    const newCart = JSON.parse(localStorage.getItem("cart"));
    if (newCart) setCart(newCart);
  }, []);

  // make an use usefect for total price with items as dependecy
  useEffect(() => {
    const evalTotalAmount = async () => {
      let sum = 0;

      for (let i = 0; i < cart.length; i++) {
        sum += cart[i].price * cart[i].quantity;
      }

      setTotalAmount(sum);
    };

    evalTotalAmount();
  }, [cart]);

  const addToCart = (product) => {
    const newCart = [...cart];

    const productIndex = newCart.findIndex((prod) => prod._id === product._id);

    if (productIndex !== -1) {
      newCart[productIndex].quantity += product.quantity;
    } else newCart.push(product);

    setCart(newCart);

    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const removeFromCart = (product) => {
    const newCart = [...cart];

    const productIndex = newCart.findIndex((prod) => prod._id === product._id);

    if (productIndex !== -1) {
      newCart.splice(productIndex, 1);
    }

    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        totalAmount,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
