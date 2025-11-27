import { CartContext } from "@/context/CartContext";
import React from "react";
import { useContext } from "react";

const CartCard = ({ product }) => {
  const { cart, updateCart, removeFromCart } = useContext(CartContext);

  const item = cart.find((i) => i._id === product._id);

  const handlePlusQty = () => {
    updateCart(product._id, { quantity: item.quantity + 1 });
  };
  const handleMinusQty = () => {
    if (item.quantity > 1) {
      updateCart(product._id, { quantity: item.quantity - 1 });
    } else {
      removeFromCart(product);
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-5 items-center">
        <div className="w-15 h-15 rounded-lg overflow-hidden">
          <img
            className="w-full h-full object-center"
            src={"logo.png"}
            alt={product.title}
          />
        </div>
        <div>
          <div className="font-bold ">{product.title}</div>
          <div className="text-gray-600 text-sm">{"₹ " + product.price}</div>
        </div>
      </div>
      <div className=" flex  p-1 rounded-md bg-green-800 text-white">
        <button className=" px-2 cursor-pointer" onClick={handleMinusQty}>
          -
        </button>
        <div className="text-center w-5">{product.quantity}</div>
        <button className=" px-2 cursor-pointer" onClick={handlePlusQty}>
          +
        </button>
      </div>
    </div>
  );
};

export default CartCard;
