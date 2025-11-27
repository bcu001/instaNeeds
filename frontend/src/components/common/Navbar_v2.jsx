import React from "react";
import {Link} from "react-router-dom";
import {Search, ArrowLeft } from "lucide-react";

const Navbar_v2 = () => {
  return (
    <div className="flex  items-center justify-between px-3 pt-2">
      <div className="flex items-center gap-3">
        <Link to={"/"}>
          <ArrowLeft />
        </Link>
        <div className="lg:mx-5 flex-1 lg:flex-none">
          <h2 className="font-bold text-lg">Delivery in 11 minutes</h2>
          <div className="text-sm">New Delhi, Delhi</div>
        </div>
      </div>
      <Link to={"/search"}>
        <Search />
      </Link>
    </div>
  );
};

export default Navbar_v2;
