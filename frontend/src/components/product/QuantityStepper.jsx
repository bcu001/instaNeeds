import useCartContext from "@/hooks/useCartContext";

const QuantityStepper = ({ productId, size = "sm" }) => {
  const { getQty, addToCart, removeFromCart } = useCartContext();
  const qty = getQty(productId);

  const isLg = size === "lg";

  return (
    <div
      className={`inline-flex items-center justify-between rounded-lg border border-border bg-background shadow-xs transition-colors ${
        isLg ? "h-10 px-1 min-w-30" : "h-9 px-0.5 w-full min-w-24"
      }`}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => removeFromCart(productId)}
        className={`flex items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors ${
          isLg ? "w-8 h-8 text-base" : "w-7 h-7 text-sm"
        }`}
      >
        −
      </button>
      <span
        className={`font-semibold text-center select-none text-foreground ${
          isLg ? "text-sm min-w-6" : "text-xs min-w-5"
        }`}
      >
        {qty}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => addToCart(productId)}
        className={`flex items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors ${
          isLg ? "w-8 h-8 text-base" : "w-7 h-7 text-sm"
        }`}
      >
        +
      </button>
    </div>
  );
};

export default QuantityStepper;
