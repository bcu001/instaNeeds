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
    script.onerror = () => reject(new Error("Unable to load Razorpay Checkout"));
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
            toast.error(getApiErrorMessage(error, "Payment verification failed"));
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
        toast.error(response.error?.description || "Payment failed. Please retry.");
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
    <div className="mx-auto max-w-7xl px-4 pt-8 pb-20">
      <h1 className="text-2xl font-bold">Checkout</h1>

      {/* steps indicator */}
      <ul className="steps steps-2 mt-5 max-w-md">
        <li className={`step ${step >= 1 ? "step-primary" : ""}`}>Details</li>
        <li className={`step ${step >= 2 ? "step-primary" : ""}`}>Payment</li>
      </ul>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          {/* ── Step 1: delivery details ─────────────────────── */}
          {step === 1 && (
            <>
              <h2 className="text-base font-bold">Delivery address</h2>
              <form
                onSubmit={handleSubmit(onSubmitDetails)}
                className="space-y-6"
              >
                <section className="rounded-box border border-base-200 bg-base-100 p-5">
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="form-control sm:col-span-2">
                      <label htmlFor="fullName" className="floating-label">
                        <span className="label-text">Full name</span>
                        <input
                          id="fullName"
                          defaultValue={user?.name}
                          className={`input bg-base-200 ${errors.fullName ? "input-error" : ""}`}
                          placeholder="e.g. Aashika Sharma"
                          {...register("fullName", {
                            required: "Name is required",
                          })}
                        />
                      </label>
                      {errors.fullName && (
                        <p className="mt-1 text-xs text-error">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>
                    <div className="form-control sm:col-span-2">
                      <label htmlFor="phone" className="floating-label">
                        <span className="label-text">Phone number</span>
                        <input
                          id="phone"
                          type="tel"
                          inputMode="numeric"
                          className={`input bg-base-200 ${errors.phone ? "input-error" : ""}`}
                          placeholder="10-digit mobile number"
                          {...register("phone", {
                            required: "Phone is required",
                            pattern: {
                              value: /^[6-9]\d{9}$/,
                              message: "Enter a valid 10-digit mobile number",
                            },
                          })}
                        />
                      </label>
                      {errors.phone && (
                        <p className="mt-1 text-xs text-error">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                    <div className="form-control sm:col-span-2">
                      <label htmlFor="address" className="floating-label">
                        <span className="label-text">Address</span>
                        <textarea
                          id="address"
                          rows={2}
                          className={`textarea mt-1 bg-base-200 ${errors.address ? "textarea-error" : ""}`}
                          placeholder="House no., street, landmark, city, pincode"
                          {...register("address", {
                            required: "Address is required",
                            minLength: {
                              value: 8,
                              message: "Address looks too short",
                            },
                          })}
                        />
                      </label>
                      {errors.address && (
                        <p className="mt-1 text-xs text-error">
                          {errors.address.message}
                        </p>
                      )}
                    </div>
                  </div>
                </section>

                <section className="rounded-box border border-base-200 bg-base-100 p-5">
                  <h2 className="text-base font-bold">Delivery slot</h2>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {DELIVERY_SLOTS.map((s) => {
                      const active = slot === s.value;
                      return (
                        <label
                          key={s.value}
                          className={`cursor-pointer rounded-box border p-3 text-center transition ${
                            active
                              ? "border-primary bg-primary/5 ring-1 ring-primary"
                              : "border-base-200 hover:border-base-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="slot"
                            className="sr-only"
                            checked={active}
                            onChange={() => setSlot(s.value)}
                          />
                          <span className="block font-semibold">{s.label}</span>
                          {s.sub && (
                            <span className="mt-0.5 block text-xs text-base-content/55">
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
                    className="btn btn-primary rounded-full px-8"
                  >
                    Continue to payment →
                  </button>
                </div>
              </form>
            </>
          )}

          {/* ── Step 2: payment ─────────────────────────────── */}
          {step === 2 && (
            <>
              <section className="rounded-box border border-base-200 bg-base-100 p-5">
                <h2 className="text-base font-bold">Payment method</h2>
                <div className="mt-4 space-y-3">
                  {PAYMENT_METHODS.map((m) => {
                    const active = payment === m.id;
                    return (
                      <label
                        key={m.id}
                        className={`flex cursor-pointer items-center gap-4 rounded-box border p-4 transition ${
                          active
                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                            : "border-base-200 hover:border-base-300"
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
                          <span className="block font-semibold">{m.label}</span>
                          <span className="block text-xs text-base-content/55">
                            {m.sub}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </section>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn btn-ghost rounded-full"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={placeOrder}
                  disabled={isPaying}
                  className="btn btn-primary rounded-full px-8"
                >
                  {isPaying ? "Opening payment..." : `Place order · ${formatPrice(total)}`}
                </button>
              </div>
            </>
          )}
        </div>

        {/* ── Order summary ──────────────────────────────────── */}
        <aside className="h-fit rounded-box border border-base-200 bg-base-100 p-5 lg:sticky lg:top-24">
          <h2 className="text-base font-bold">Order summary</h2>
          <ul className="mt-4 max-h-72 divide-y divide-base-200 overflow-y-auto">
            {cartData?.cart?.items.map((i) => (
              <CartCard item={i} key={i?.productId}/>
            ))}
          </ul>
          <dl className="mt-4 space-y-2.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-base-content/60">
                subtotal ({cartData?.totalItems} item
                {cartData?.totalItems > 1 ? "s" : ""})
              </dt>
              <dd className="font-medium">
                {formatPrice(cartData?.totalPrice)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-base-content/60">Delivery fee</dt>
              <dd className="font-medium">
                {deliveryFee === 0 ? (
                  <span className="text-success">FREE</span>
                ) : (
                  formatPrice(deliveryFee)
                )}
              </dd>
            </div>
            <div className="flex justify-between border-t border-dashed border-base-300 pt-3 text-base">
              <dt className="font-bold">Total</dt>
              <dd className="font-extrabold">{formatPrice(total)}</dd>
            </div>
          </dl>
          <p className="mt-3 rounded-box bg-base-200 px-3 py-2 text-xs text-base-content/70">
            ⚡ {slot === "now" ? "Delivering now" : "Scheduled delivery"} · ~30
            min ETA
          </p>
        </aside>
      </div>
    </div>
  );
};

export default CheckoutPage;
