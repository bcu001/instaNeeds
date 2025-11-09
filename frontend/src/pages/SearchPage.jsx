import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { MoveLeft, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const SearchPage = () => {
  return (
    <div>
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative m-5"
      >
        <input
          className="w-full  bg-gray-200 px-2 py-3 pl-12 rounded-xl  cursor-text outline-none"
          type="search"
          placeholder="search..."
          autoFocus={true}
        />
        <Link to={"/"} className="absolute left-3 top-3">
          <ArrowLeft size={25} />
        </Link>
      </motion.div>
    </div>
  );
};

export default SearchPage;
