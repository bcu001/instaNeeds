import React, { useEffect, useState } from "react";
import { CircleUserRound, Search, ShoppingCart, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [isBackVisible, SetIsBackVisible] = useState(false);

  useEffect(() => {
    if (location.pathname !== "/") {
      SetIsBackVisible(true);
    } else {
      SetIsBackVisible(false);
    }
  }, [location.pathname]);

  return (
    <nav>
      <div className="flex justify-between items-center p-2 ">
        <Link to={"/"} className="hidden lg:flex">
          <img className=" w-9" src="/logo.png" alt="logo" />
        </Link>
        {isBackVisible && (
          <Link to={"/"} className="mr-2 lg:hidden">
            <ArrowLeft size={25} />
          </Link>
        )}
        <div className="lg:mx-5 flex-1 lg:flex-none">
          <h2 className="font-bold text-lg"> Delivery in 11 minutes</h2>
          <div className="text-sm">New Delhi, Delhi</div>
        </div>
        <Link
          className=" bg-input text-text  rounded-xl  cursor-pointer lg:flex-1 lg:mx-5 px-3 py-2 lg:flex hidden"
          to={"/search"}
        >
          <div>
            <Search />
          </div>
        </Link>
        <div className="flex gap-3">
          <Link to={"/account"} className="def-btn">
            <CircleUserRound />
          </Link>
          <button className="def-btn">
            <ShoppingCart />
          </button>
        </div>
      </div>
      <Link to={"/search"}>
        <div className=" bg-input text-text  rounded-xl  cursor-pointer lg:flex-1 lg:mx-5 px-3 py-2 lg:hidden m-2">
          <Search />
        </div>
      </Link>
    </nav>
  );
};

export default Navbar;
