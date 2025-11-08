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
        {/* change it when feature/routes-setup is done */}
        <a href="">
          <CircleUserRound size={30} />
        </a>
      </div>
      {/* change this to search bar link which look like searchbar */}
      <a
        href="/"
        className=" w-full flex items-center bg-gray-200 px-2 py-3 rounded-xl relative gap-x-3 cursor-text"
      >
        <div className="">
          <Search size={20} />
        </div>
        <div className="">Search....</div>
      </a>
    </nav>
  );
};

export default Navbar;
