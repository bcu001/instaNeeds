import React, { useContext, useEffect, useState } from "react";
import {
  ClipboardClock,
  MapPinHouse,
  WalletMinimal,
  Gift,
  LockKeyhole,
  LogOut,
} from "lucide-react";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { ArrowLeft } from "lucide-react";
import { Search } from "lucide-react";

const account_Link = [
  { name: "Order History", element: <ClipboardClock /> },
  { name: "Address Book", element: <MapPinHouse /> },
  { name: "Wallet Details", element: <WalletMinimal /> },
  { name: "E-Gift Cards", element: <Gift /> },
  { name: "Account Privacy", element: <LockKeyhole /> },
];

const AccountPage = () => {
  const { user, signout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signout();
    navigate("/signin");
  };

  return (
    <div>
      {/*personal Account Page Navbar */}
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

      {/* Account related stuff */}
      <div className="def-pad text-text">
        <div className="uppercase mb-5 text-gray-500">{user?.email}</div>
        <div className="text-sm text-gray-500 mb-6">Your Information</div>
        <div className="space-y-6">
          {account_Link.map((link) => (
            <div key={link.name} className="flex items-center gap-5">
              <div className="text-gray-500">{link.element}</div>
              <div>{link.name}</div>
            </div>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-5 def-btn"
          >
            <div>
              <LogOut />
            </div>
            <div>Log out</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
