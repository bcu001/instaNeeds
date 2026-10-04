import { Link, useNavigate } from "react-router";
import { ShoppingBag } from "lucide-react";
import { formatPrice } from "@/data/mockData";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import useCartContext from "@/hooks/useCartContext";
import CartCard from "@/components/cart/CartCard";
import ApiErrorUI from "@/components/common/ApiErrorUI";
import { getApiErrorMessage } from "@/lib/apiError";

const FREE_DELIVERY_ABOVE = 199;
const DELIVERY_FEE = 39;

const CartPage = () => {
  useDocumentTitle("Cart | InstaNeeds");
  const { cartData, isError, error, refetch } = useCartContext();
  const navigate = useNavigate();

  const items = cartData?.cart?.items || [];
  const subtotal = cartData?.totalPrice || 0;
  const isFreeDelivery = items.length === 0 || subtotal >= FREE_DELIVERY_ABOVE;
  const deliveryFee = isFreeDelivery ? 0 : DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  if (isError)
    return (
      <ApiErrorUI
        message={getApiErrorMessage(error, "Unable to load cart")}
        onRetry={refetch}
      />
    );

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center justify-center px-4 py-24 text-center">
        <div className="grid h-20 w-20 place-items-center rounded-2xl bg-muted text-4xl">
          <ShoppingBag size={36} className="text-muted-foreground" />
        </div>
        <h1 className="mt-5 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          Your cart is empty
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Looks like you haven’t added anything yet. Explore our fresh catalog
          to get started.
        </p>
        <Link
          to="/products"
          className="btn btn-primary mt-6 h-10 px-6 rounded-lg text-sm font-medium shadow-xs"
        >
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pt-8 pb-20 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Shopping cart
        </h1>
        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
          {cartData?.totalItems} item{cartData?.totalItems > 1 ? "s" : ""}{" "}
          selected
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Items list */}
        <div className="rounded-xl border border-border bg-card p-4 sm:p-6 shadow-xs">
          <ul className="divide-y divide-border">
            {items.map((i) => (
              <CartCard item={i} key={i.productId} />
            ))}
          </ul>
        </div>

        {/* Order summary */}
        <aside className="h-fit rounded-xl border border-border bg-card p-5 sm:p-6 shadow-xs lg:sticky lg:top-24">
          <h2 className="text-base font-semibold text-foreground">
            Order summary
          </h2>

          <dl className="mt-4 space-y-2.5 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <dt>Subtotal ({cartData?.totalItems} items)</dt>
              <dd className="font-medium text-foreground">
                {formatPrice(subtotal)}
              </dd>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <dt>Delivery fee</dt>
              <dd className="font-medium text-foreground">
                {deliveryFee === 0 ? (
                  <span className="text-foreground">Free</span>
                ) : (
                  formatPrice(deliveryFee)
                )}
              </dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base">
              <dt className="font-semibold text-foreground">Total</dt>
              <dd className="font-bold text-foreground">
                {formatPrice(total)}
              </dd>
            </div>
          </dl>

          <div className="mt-4 rounded-lg border border-border bg-muted/60 p-3 text-xs text-muted-foreground">
            {subtotal < FREE_DELIVERY_ABOVE ? (
              <p>
                Add{" "}
                <b className="text-foreground">
                  {formatPrice(FREE_DELIVERY_ABOVE - subtotal)}
                </b>{" "}
                more for free delivery
              </p>
            ) : (
              <p className="font-medium text-foreground">
                🎉 You’ve unlocked free delivery
              </p>
            )}
          </div>

          <div className="mt-6 space-y-2">
            <button
              type="button"
              onClick={() => navigate("/checkout")}
              className="btn btn-primary w-full h-10 rounded-lg text-sm font-medium shadow-xs"
            >
              Proceed to checkout
            </button>
            <Link
              to="/products"
              className="btn btn-outline w-full h-10 rounded-lg text-sm font-medium border-border hover:bg-muted text-foreground"
            >
              Continue shopping
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CartPage;
