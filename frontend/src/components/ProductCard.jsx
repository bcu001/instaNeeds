import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.title}`}>
      <div className="border-[1px] border-gray-300 rounded-md p-2">
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
          <button className="def-btn">ADD</button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
