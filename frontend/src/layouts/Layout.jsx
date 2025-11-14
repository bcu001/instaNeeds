import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Layout = () => {
  const location = useLocation();
  const [isNavVisible, setIsNavVisible] = useState(true);

  useEffect(() => {
    setIsNavVisible(location.pathname.startsWith("/search"));
  }, [location.pathname]);

  return (
    <main>
      {isNavVisible || <Navbar />}
      <Outlet />
      {isNavVisible || <Footer />}
    </main>
  );
};

export default Layout;
