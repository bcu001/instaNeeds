import React from 'react'
import { motion } from 'framer-motion'
import {Outlet} from "react-router-dom"

const NoFooterLayout = () => {
  return (
  <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.3 }}
    >
      <Outlet />
    </motion.main>
  )
}

export default NoFooterLayout
