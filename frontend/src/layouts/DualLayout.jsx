import React from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar_v2 from "@/components/common/Navbar_v2";
import Navbar from "@/components/common/Navbar";

const DualLayout = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.3 }}
    >
      <div className=" lg:hidden">
        <Navbar_v2 />
      </div>
      <div className="hidden lg:block">
        <Navbar />
      </div>
      <Outlet />
    </motion.main>
  );
};

export default DualLayout;
