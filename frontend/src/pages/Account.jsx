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
import { useNavigate } from "react-router-dom";

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
        <button onClick={handleLogout} className="flex items-center gap-5 def-btn">
          <div >
            <LogOut />
          </div>
          <div>Log out</div>
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
