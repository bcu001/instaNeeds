import { useEffect } from "react";
import { useNavigate } from "react-router";
import { X, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/data/mockData";
import useCartContext from "@/hooks/useCartContext";
import CartCard from "./CartCard";

const FREE_DELIVERY_ABOVE = 199;
const DELIVERY_FEE = 39;

const CartDrawer = () => {
  const { cartData, isDrawerOpen, closeDrawer, isLoading } = useCartContext();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isDrawerOpen) {
        closeDrawer();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDrawerOpen, closeDrawer]);

  if (!isDrawerOpen) return null;

  const go = (path) => {
    closeDrawer();
    navigate(path);
  };

  const items = cartData?.cart?.items || [];
  const totalItems = cartData?.totalItems || 0;
  const subtotal = cartData?.totalPrice || 0;
  const isFreeDelivery = subtotal >= FREE_DELIVERY_ABOVE;
  const fee = items.length === 0 || isFreeDelivery ? 0 : DELIVERY_FEE;
  const total = subtotal + fee;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping cart"
    >
      {/* Scrim overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Slide-over sheet matching reference .sheet */}
      <aside className="fixed inset-y-0 right-0 flex w-full max-w-100 flex-col border-l border-border bg-background shadow-2xl transition-transform duration-300 ease-out">
        {/* Sheet Header (.sh) */}
        <div className="flex items-start justify-between border-b border-border px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              Cart
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {totalItems > 0
                ? `${totalItems} item${totalItems > 1 ? "s" : ""} in your cart`
                : "Review your items"}
            </p>
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            className="btn btn-ghost h-8 w-8 p-0 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Close cart"
          >
            <X size={17} />
          </button>
        </div>

        {/* Sheet Items (.items) */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-muted text-3xl">
              <ShoppingBag size={28} className="text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-foreground">
              Your cart is empty
            </h3>
            <p className="mt-1 text-sm text-muted-foreground max-w-xs">
              Add something fresh from our store to get started.
            </p>
            <button
              type="button"
              onClick={() => go("/products")}
              className="btn btn-primary mt-6 h-9 px-5 rounded-lg text-sm font-medium"
            >
              Start shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-2">
              <ul className="divide-y divide-border">
                {!isLoading &&
                  items.map((i) => <CartCard item={i} key={i.productId} />)}
              </ul>
            </div>

            {/* Free delivery nudge */}
            <div className="px-6 py-2">
              <div className="rounded-lg border border-border bg-muted/70 px-3 py-2 text-xs text-muted-foreground">
                {isFreeDelivery ? (
                  <span className="font-medium text-foreground">
                    🎉 Free delivery unlocked
                  </span>
                ) : (
                  <span>
                    Add{" "}
                    <b className="text-foreground">
                      {formatPrice(FREE_DELIVERY_ABOVE - subtotal)}
                    </b>{" "}
                    more for free delivery
                  </span>
                )}
              </div>
            </div>

            {/* Sheet Footer (.df) */}
            <div className="border-t border-border px-6 py-5 space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-medium text-foreground">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Delivery</span>
                <span className="font-medium text-foreground">
                  {fee === 0 ? (
                    <span className="text-foreground">Free</span>
                  ) : (
                    formatPrice(fee)
                  )}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-border text-base font-semibold text-foreground">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              <div className="pt-2 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => go("/cart")}
                  className="btn btn-outline h-10 rounded-lg text-sm font-medium border-border hover:bg-muted text-foreground"
                >
                  View cart
                </button>
                <button
                  type="button"
                  onClick={() => go("/checkout")}
                  className="btn btn-primary h-10 rounded-lg text-sm font-medium shadow-xs"
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
};

export default CartDrawer;
