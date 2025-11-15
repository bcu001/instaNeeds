import React, { useState, useEffect } from "react";
import {
  CircleUserRound,
  Search,
  ShoppingCart,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import AccountMarkdown from "@/components/AccountMarkdown";

const Navbar = () => {
  const [showAccount, setShowAccount] = useState(false);

  const handleAccount = () => {
    setShowAccount(!showAccount);
  };

  useEffect(() => {
    if (showAccount) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [showAccount]);

  return (
    <>
      <nav className={`relative z-50 bg-white`}>
        <div className="flex justify-between items-center p-2">
          {/* Logo */}
          <Link to={"/"} className="hidden lg:flex">
            <img className="w-9" src="/logo.png" alt="logo" />
          </Link>

          {/* Delivery info */}
          <div className="lg:mx-5 flex-1 lg:flex-none">
            <h2 className="font-bold text-lg">Delivery in 11 minutes</h2>
            <div className="text-sm">New Delhi, Delhi</div>
          </div>

          {/* Search (desktop) */}
          <Link
            className="bg-input text-text rounded-xl cursor-pointer lg:flex-1 lg:mx-5 px-3 py-2 lg:flex hidden border-text border-2"
            to={"/search"}
          >
            <Search />
          </Link>

          {/* Right side */}
          <div className="flex gap-3 items-center">
            {/* Account on mobile */}
            <Link to={"/account"} className=" lg:hidden">
              <CircleUserRound size={30}/>
            </Link>

            {/* Account on desktop */}
            <div
              onClick={handleAccount}
              className="hidden lg:flex items-center gap-1 relative "
            >
              <span className="text-lg cursor-pointer">Account</span>
              <div className="cursor-pointer">
                {showAccount ? <ChevronUp /> : <ChevronDown />}
              </div>

              {/* Dropdown menu */}
              {showAccount && (
                <div className="absolute top-13 right-0 z-[60] shadow-lg">
                  <AccountMarkdown />
                </div>
              )}
            </div>

            {/* Cart */}
            {/* <button className="def-btn flex items-center gap-3">
              <ShoppingCart />
              <span>My Cart</span>
            </button> */}
          </div>
        </div>

        {/* Search (mobile) */}
        <Link to={"/search"}>
          <div className="bg-input text-text rounded-xl cursor-pointer lg:hidden m-2 px-3 py-2 border-text border-2">
            <Search />
          </div>
        </Link>
      </nav>

      {/* ---- DARK OVERLAY ---- */}
      {showAccount && (
        <div
          onClick={() => setShowAccount(false)}
          className="fixed inset-0 bg-black/60 z-40"
        ></div>
      )}
    </>
  );
};

export default Navbar;
