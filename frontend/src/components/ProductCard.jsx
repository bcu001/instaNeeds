import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// {
//     "_id": "6912fced1941e9c5f71c110e",
//     "title": "realme 5i charger",
//     "imageURL": "https://cdn.pixabay.com/photo/2014/03/25/16/55/lightning-297607_960_720.png",
//     "product": "others",
//     "price": 999,
//     "stock": 90,
//     "isActive": true,
//     "unit": "piece",
//     "createdAt": "2025-11-11T09:07:57.172Z",
//     "updatedAt": "2025-11-11T09:07:57.172Z",
//     "__v": 0
// }

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
