import React from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

const NoNavbarLayout = () => {

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.3 }}
    >
      <Outlet />
    </motion.main>
  );
};

export default NoNavbarLayout;
