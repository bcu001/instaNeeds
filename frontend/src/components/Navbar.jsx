import React from "react";
import { CircleUserRound, Search } from "lucide-react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="p-4 space-y-2 "
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-x-2">
          <div className=" flex items-center ">
            <Link to={"/"}>
              <img className=" w-9" src="/logo.png" alt="logo" />
            </Link>
          </div>
          <div>
            <h2 className="font-bold text-lg"> Delivery in 11 minutes</h2>
            <div className="text-sm">Burari, Delhi, 110084, India</div>
          </div>
        </div>
        <Link to="account">
          <CircleUserRound size={30} />
        </Link>
      </div>
      <Link to={"/search"} className="relative">
        <div className="w-full flex items-center bg-gray-200 px-2 py-3 pl-10 rounded-xl gap-x-3 cursor-text text-gray-500">
          search...
        </div>
        <div className="absolute left-3 top-3.5">
          <Search size={20} />
        </div>
      </Link>
    </motion.nav>
  );
};

export default Navbar;
