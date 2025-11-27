import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const handleProductNav = () => {
    navigate(`/product/${product.title.split(" ").join("-")}`);
  };

  const handleAddCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div onClick={handleProductNav}>
      <div className="border border-gray-300 rounded-md p-2 cursor-pointer">
        <div>
          <img src={"logo.png"} alt="" />
        </div>
        <div className="w-fit px-2 text-xs rounded-lg bg-gray-300 uppercase font-bold">
          15 mins
        </div>
        <div>
          <div className="font-bold w-full truncate">{product.title}</div>
          <div className="text-gray-400 text-sm">{`${1} ${product.unit}`}</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="font-bold">{`₹ ${product.price}`}</div>
          <button onClick={handleAddCart} className="def-btn">
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
