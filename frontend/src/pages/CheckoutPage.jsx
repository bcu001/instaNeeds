import { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { formatPrice } from "@/data/mockData";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import useCartContext from "@/hooks/useCartContext";
import CartCard from "@/components/cart/CartCard";
import OrderSuccess from "@/components/order/OrderSuccess";
import useAuth from "@/hooks/useAuth";
import { createPaymentOrder, verifyPayment } from "@/services/order.service";
import { getApiErrorMessage } from "@/lib/apiError";

const FREE_DELIVERY_ABOVE = 199;
const DELIVERY_FEE = 39;

const DELIVERY_SLOTS = [
  { label: "Now", sub: "~30 min", value: "now" },
  { label: "Today, 6–8 PM", sub: "", value: "evening" },
  { label: "Tomorrow, 7–9 AM", sub: "", value: "morning" },
];

const PAYMENT_METHODS = [
  { id: "upi", label: "UPI", sub: "GPay, PhonePe, Paytm", emoji: "📱" },
  { id: "card", label: "Card", sub: "Credit / Debit", emoji: "💳" },
  {
    id: "cod",
    label: "Cash on delivery",
    sub: "Pay at your door",
    emoji: "💵",
  },
];

let razorpayScriptPromise;

const loadRazorpayScript = () => {
  if (window.Razorpay) return Promise.resolve();
  if (razorpayScriptPromise) return razorpayScriptPromise;

  razorpayScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = resolve;
    script.onerror = () =>
      reject(new Error("Unable to load Razorpay Checkout"));
    document.body.appendChild(script);
  });
  return razorpayScriptPromise;
};

const CheckoutPage = () => {
  const { user } = useAuth();
  useDocumentTitle("Checkout | InstaNeeds");
  const { cartData, clearCart } = useCartContext();
  const [step, setStep] = useState(1); // 1 = details, 2 = payment, 3 = success
  const [slot, setSlot] = useState("now");
  const [payment, setPayment] = useState("upi");
  const [deliveryDetails, setDeliveryDetails] = useState(null);
  const [isPaying, setIsPaying] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const paymentFailedRef = useRef(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  useEffect(() => {
    if (step === 2 && payment !== "cod") loadRazorpayScript().catch(() => {});
  }, [payment, step]);

  if (cartData?.cart?.items.length === 0 && step !== 3) {
    return <Navigate to="/cart" replace />;
  }

  const deliveryFee =
    cartData?.totalPrice >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE;
  const total = cartData?.totalPrice + deliveryFee;

  const onSubmitDetails = (values) => {
    setDeliveryDetails(values);
    setStep(2);
  };

  const placeOrder = async () => {
    const checkoutTotal = total;
    setTotalAmount(checkoutTotal);

    if (payment === "cod") {
      setOrderId(`IN-${Date.now()}`);
      setStep(3);
      clearCart();
      toast.success("Order placed 🎉");
      return;
    }

    setIsPaying(true);
    try {
      const paymentOrder = await createPaymentOrder({
        fullName: deliveryDetails.fullName,
        phone: deliveryDetails.phone,
        address: deliveryDetails.address,
        deliverySlot: slot,
      });
      await loadRazorpayScript();
      paymentFailedRef.current = false;

      const razorpay = new window.Razorpay({
        key: paymentOrder.key_id,
        order_id: paymentOrder.order_id,
        amount: paymentOrder.amount,
        currency: paymentOrder.currency,
        name: "InstaNeeds",
        description: "Grocery order",
        prefill: {
          name: deliveryDetails.fullName,
          email: user?.email,
          contact: deliveryDetails.phone,
        },
        notes: { order_id: paymentOrder.internal_order_id },
        theme: { color: "#16a34a" },
        handler: async (response) => {
          try {
            await verifyPayment(response);
            clearCart();
            setOrderId(paymentOrder.internal_order_id);
            setStep(3);
            toast.success("Payment verified and order placed 🎉");
          } catch (error) {
            toast.error(
              getApiErrorMessage(error, "Payment verification failed"),
            );
          } finally {
            setIsPaying(false);
          }
        },
        modal: {
          ondismiss: () => {
            setIsPaying(false);
            if (!paymentFailedRef.current) toast("Payment cancelled");
          },
        },
      });
      razorpay.on("payment.failed", (response) => {
        paymentFailedRef.current = true;
        setIsPaying(false);
        toast.error(
          response.error?.description || "Payment failed. Please retry.",
        );
      });
      razorpay.open();
    } catch (error) {
      setIsPaying(false);
      toast.error(getApiErrorMessage(error, "Unable to start payment"));
    }
  };

  /* ── Success screen ────────────────────────────────────────── */
  if (step === 3) {
    return (
      <OrderSuccess
        orderId={orderId}
        payment={payment}
        slot={slot}
        total={totalAmount || total}
      />
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-3 py-5 sm:px-6 sm:py-8 lg:px-8 lg:pb-20">
      <div className="mb-5 sm:mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Checkout
        </h1>
        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
          Complete your order details and delivery preferences.
        </p>
      </div>

      {/* steps indicator */}
      <div className="mb-6 flex flex-wrap items-center gap-2 sm:mb-8 sm:gap-3">
        <div
          className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold sm:gap-2 sm:px-3.5 sm:text-xs ${
            step >= 1
              ? "border-primary bg-primary text-secondary"
              : "border-border text-muted-foreground"
          }`}
        >
          <span>1</span>
          <span>Delivery details</span>
        </div>
        <div className="h-px w-8 bg-border" />
        <div
          className={`flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-semibold ${
            step >= 2
              ? "border-primary bg-primary text-secondary"
              : "border-border text-muted-foreground"
          }`}
        >
          <span>2</span>
          <span>Payment</span>
        </div>
      </div>

      <div className="grid min-w-0 grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:gap-8">
        <div className="min-w-0 space-y-5 sm:space-y-6">
          {/* ── Step 1: delivery details ─────────────────────── */}
          {step === 1 && (
            <form
              onSubmit={handleSubmit(onSubmitDetails)}
              className="space-y-6"
            >
              <section className="min-w-0 rounded-xl border border-border bg-card p-4 shadow-xs sm:p-6">
                <h2 className="text-base font-semibold text-foreground">
                  Delivery address
                </h2>
                <div className="mt-4 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5"
                    >
                      Full name
                    </label>
                    <input
                      id="fullName"
                      defaultValue={user?.name}
                      className={`h-10 w-full rounded-lg border bg-card px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring shadow-xs ${
                        errors.fullName
                          ? "border-error focus:ring-error"
                          : "border-border"
                      }`}
                      placeholder="e.g. Aashika Sharma"
                      {...register("fullName", {
                        required: "Name is required",
                      })}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-error">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="phone"
                      className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5"
                    >
                      Phone number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      inputMode="numeric"
                      className={`h-10 w-full rounded-lg border bg-card px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring shadow-xs ${
                        errors.phone
                          ? "border-error focus:ring-error"
                          : "border-border"
                      }`}
                      placeholder="10-digit mobile number"
                      {...register("phone", {
                        required: "Phone is required",
                        pattern: {
                          value: /^[6-9]\d{9}$/,
                          message: "Enter a valid 10-digit mobile number",
                        },
                      })}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-error">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="address"
                      className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5"
                    >
                      Address
                    </label>
                    <textarea
                      id="address"
                      rows={2}
                      className={`w-full rounded-lg border bg-card p-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring shadow-xs ${
                        errors.address
                          ? "border-error focus:ring-error"
                          : "border-border"
                      }`}
                      placeholder="House no., street, landmark, city, pincode"
                      {...register("address", {
                        required: "Address is required",
                        minLength: {
                          value: 8,
                          message: "Address looks too short",
                        },
                      })}
                    />
                    {errors.address && (
                      <p className="mt-1 text-xs text-error">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              <section className="min-w-0 rounded-xl border border-border bg-card p-4 shadow-xs sm:p-6">
                <h2 className="text-base font-semibold text-foreground">
                  Delivery slot
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {DELIVERY_SLOTS.map((s) => {
                    const active = slot === s.value;
                    return (
                      <label
                        key={s.value}
                        className={`min-w-0 cursor-pointer rounded-xl border p-3 text-center transition-all sm:p-4 ${
                          active
                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                            : "border-border hover:bg-muted/50 hover:border-ring"
                        }`}
                      >
                        <input
                          type="radio"
                          name="slot"
                          className="sr-only"
                          checked={active}
                          onChange={() => setSlot(s.value)}
                        />
                        <span className="block font-semibold text-sm text-foreground">
                          {s.label}
                        </span>
                        {s.sub && (
                          <span className="mt-1 block text-xs text-muted-foreground">
                            {s.sub}
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>
              </section>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="btn btn-primary h-11 w-full rounded-lg px-5 text-sm font-medium shadow-xs sm:w-auto sm:px-8"
                >
                  Continue to payment →
                </button>
              </div>
            </form>
          )}

          {/* ── Step 2: payment ─────────────────────────────── */}
          {step === 2 && (
            <div className="min-w-0 space-y-5 sm:space-y-6">
              <section className="min-w-0 rounded-xl border border-border bg-card p-4 shadow-xs sm:p-6">
                <h2 className="text-base font-semibold text-foreground">
                  Payment method
                </h2>
                <div className="mt-4 space-y-3">
                  {PAYMENT_METHODS.map((m) => {
                    const active = payment === m.id;
                    return (
                      <label
                        key={m.id}
                        className={`flex min-w-0 items-center gap-3 rounded-xl border p-3 transition-all sm:gap-4 sm:p-4 ${
                          active
                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                            : "border-border hover:bg-muted/50 hover:border-ring"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          className="radio radio-primary"
                          checked={active}
                          onChange={() => setPayment(m.id)}
                        />
                        <span className="text-2xl">{m.emoji}</span>
                        <span className="flex-1">
                          <span className="block font-semibold text-sm text-foreground">
                            {m.label}
                          </span>
                          <span className="block text-xs text-muted-foreground">
                            {m.sub}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </section>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn btn-outline h-11 w-full rounded-lg border-border text-sm font-medium text-foreground hover:bg-muted sm:w-auto sm:px-5"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={placeOrder}
                  disabled={isPaying}
                  className="btn btn-primary h-11 w-full rounded-lg px-5 text-sm font-medium shadow-xs sm:w-auto sm:px-8"
                >
                  {isPaying
                    ? "Opening payment..."
                    : `Place order · ${formatPrice(total)}`}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Order summary ──────────────────────────────────── */}
        <aside className="h-fit min-w-0 rounded-xl border border-border bg-card p-4 shadow-xs sm:p-6 lg:sticky lg:top-24">
          <h2 className="text-base font-semibold text-foreground">
            Order summary
          </h2>
          <ul className="mt-4 max-h-72 divide-y divide-border overflow-x-hidden overflow-y-auto">
            {cartData?.cart?.items.map((i) => (
              <CartCard item={i} key={i?.productId} />
            ))}
          </ul>
          <dl className="mt-4 space-y-2.5 text-sm">
            <div className="flex items-start justify-between gap-3 text-muted-foreground">
              <dt>
                Subtotal ({cartData?.totalItems} item
                {cartData?.totalItems > 1 ? "s" : ""})
              </dt>
              <dd className="font-medium text-foreground">
                {formatPrice(cartData?.totalPrice)}
              </dd>
            </div>
            <div className="flex items-start justify-between gap-3 text-muted-foreground">
              <dt>Delivery fee</dt>
              <dd className="font-medium text-foreground">
                {deliveryFee === 0 ? (
                  <span className="text-foreground">Free</span>
                ) : (
                  formatPrice(deliveryFee)
                )}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-border pt-3 text-base">
              <dt className="font-semibold text-foreground">Total</dt>
              <dd className="font-bold text-foreground">
                {formatPrice(total)}
              </dd>
            </div>
          </dl>
          <div className="mt-4 wrap-break-word rounded-lg border border-border bg-muted/60 p-3 text-xs text-muted-foreground">
            ⚡ {slot === "now" ? "Delivering now" : "Scheduled delivery"} · ~30
            min ETA
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CheckoutPage;
