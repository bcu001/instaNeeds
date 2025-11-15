import { AuthContext } from "@/context/AuthContext";
import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

const AccountMarkdown = () => {
  const { user, signout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    signout();
    navigate("/signin");
  };

  return (
    <div className=" w-[220px] rounded-md bg-white flex flex-col text-sm overflow-hidden">
      <div className="flex flex-col p-2">
        <span className="font-bold text-lg">My Account</span>
        <span className="text-sm text-gray-300 uppercase">{user.email}</span>
      </div>
      <div className="cursor-pointer hover:bg-gray-200 p-2">My Orders</div>
      <div className="cursor-pointer hover:bg-gray-200 p-2">
        Saved Addresses
      </div>
      <div className="cursor-pointer hover:bg-gray-200 p-2">E-Gift Cards</div>
      <div className="cursor-pointer hover:bg-gray-200 p-2">FAQ's</div>
      <Link
        to={"/account/privacy"}
        className="cursor-pointer hover:bg-gray-200 p-2"
      >
        <span>Account Pirvacy</span>
      </Link>
      <div
        className="cursor-pointer hover:bg-gray-200 p-2"
        onClick={handleLogout}
      >
        Log Out
      </div>
    </div>
  );
};

export default AccountMarkdown;
