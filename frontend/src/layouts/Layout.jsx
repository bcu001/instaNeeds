import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";


const Layout = () => {
  return (
    <main>
      {/* <Navbar/> */}
        <div>
            <Outlet/>
        </div>
    </main>
  );
};

export default Layout;
