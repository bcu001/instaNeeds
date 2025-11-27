import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CategoryCard = ({ category }) => {
  return (
    <>
      <Link to={`/category/${category.name}`}>
        <div className="flex flex-col gap-2">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`${category.bg} shadow-lg w-[150px] h-[100px] rounded-lg flex justify-center items-center capitalize relative overflow-hidden`}
          >
            <img
              className="w-full h-full object-cover"
              src={category.img}
              alt={category.name}
            />
            {/* <div className="absolute backdrop-blur-xl w-full h-full"/> */}
          </motion.div>
          <div className="text-center capitalize font-bold">
            {category.name}
          </div>
        </div>
      </Link>
    </>
  );
};

export default CategoryCard;
