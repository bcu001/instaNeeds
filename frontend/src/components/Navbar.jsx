import React from "react";
import { CircleUserRound, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="p-4 space-y-2">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold text-lg"> Delivery in 11 minutes</h2>
          <div className="text-sm">Burari, Delhi, 110084, India</div>
        </div>
        <Link to="account">
          <CircleUserRound size={30} />
        </Link>
      </div>
      <Link
        to="/search"
        className=" w-full flex items-center bg-gray-200 px-2 py-3 rounded-xl relative gap-x-3 cursor-text"
      >
        <div className="">
          <Search size={20} />
        </div>
        <div className="">Search....</div>
      </Link>
    </nav>
  );
};

export default Navbar;
