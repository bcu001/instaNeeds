import CartCard from "@/components/cart/CartCard";
import { CartContext } from "@/context/CartContext";
import { X, Timer } from "lucide-react";
import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, totalAmount } = useContext(CartContext);

  console.log("CartPage Rendering");

  return (
    <div className="bg-gray-200 min-h-screen space-y-4">
      {/* header */}
      <section className="flex justify-between p-4 sticky bg-white top-0 ">
        <h1 className="font-semibold text-">My Cart</h1>
        <Link to={"/home"}>
          <X />
        </Link>
      </section>

      <section className="bg-white p-4 rounded-md space-y-4 mx-3">
        {/* first part */}
        <div className="flex items-center gap-5 border-b-1 pb-2">
          <div className="bg-gray-100 flex justify-center items-center p-2 rounded-md">
            <Timer size={35} />
          </div>
          <div className="">
            <h2 className="font-bold text-lg">Deliver in 8 minutes</h2>
            <p className="text-sm text-gray-500">
              {`Shipment of ${cart.length} items`}
            </p>
          </div>
        </div>

        {/* second part */}
        <div className="space-y-5">
          {cart.map((i) => (
            <CartCard product={i} key={i._id} />
          ))}
        </div>
      </section>

      {/* bill secton */}
      <section className="bg-white mx-3 mt-4 p-4 rounded-lg shadow-sm">
        <h2 className="font-semibold text-base mb-3">Bill Details</h2>

        <div className="flex justify-between text-sm text-gray-700 py-1">
          <span>Item Total</span>
          <span>₹ {totalAmount}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-700 py-1">
          <span>Delivery Fee</span>
          <span>₹ 0</span>
        </div>

        <div className="border-t mt-3 pt-3 flex justify-between font-semibold text-base">
          <span>Total Amount</span>
          <span>₹ {totalAmount}</span>
        </div>
      </section>
    </div>
  );
};

export default CartPage;
