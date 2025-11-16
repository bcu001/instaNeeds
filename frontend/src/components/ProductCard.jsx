import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleProductNav = () => {
    navigate(`/product/${product.title.split(" ").join("-")}`);
  };

  const handleAddCart = (e) => {
    e.stopPropagation();
    console.log("added");
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
          <div className="font-bold">{product.title}</div>
          <div className="text-gray-400 text-sm">{`${1} ${product.unit}`}</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="font-bold">{`$${product.price}`}</div>
          <button onClick={handleAddCart} className="def-btn">
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
