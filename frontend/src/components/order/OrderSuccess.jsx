import { formatPrice } from "@/data/mockData";
import { Link } from "react-router";
import { Check } from "lucide-react";

const OrderSuccess = ({ orderId, total, payment, slot }) => {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <div className="rounded-2xl border border-border bg-card p-8 sm:p-10 shadow-xs">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-fg shadow-xs">
          <Check size={26} strokeWidth={2.5} />
        </div>

        <h1 className="mt-5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Order confirmed
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Thank you for shopping with InstaNeeds!
        </p>

        <div className="mt-6 rounded-xl border border-border bg-muted/50 p-4 text-left text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Order ID</span>
            <span className="font-semibold text-foreground">#{orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Amount</span>
            <span className="font-semibold text-foreground">
              {formatPrice(total)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Payment method</span>
            <span className="font-semibold text-foreground">
              {payment === "cod" ? "Cash on delivery" : "Prepaid online ✓"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">ETA</span>
            <span className="font-semibold text-foreground">
              {slot === "now" ? "~10–30 minutes" : "Scheduled delivery"}
            </span>
          </div>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          ⚡ Your nearest store hub is packing your order now.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/products"
            className="btn btn-primary h-10 px-6 rounded-lg text-sm font-medium shadow-xs"
          >
            Shop more
          </Link>
          <Link
            to="/order"
            className="btn btn-outline h-10 px-6 rounded-lg text-sm font-medium border-border hover:bg-muted text-foreground"
          >
            View order
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
