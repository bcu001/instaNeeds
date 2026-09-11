import { Calendar, PackageCheck, Truck } from "lucide-react";
import { Navigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import LoadingUI from "@/components/common/LoadingUI";
import { getUserOrders } from "@/services/order.service";
import { formatPrice } from "@/data/mockData";

const statusClass = {
  placed: "badge-info",
  confirmed: "badge-success",
  out_for_delivery: "badge-warning",
  delivered: "badge-success",
  cancelled: "badge-error",
};

const OrderPage = () => {
  useDocumentTitle("My orders | InstaNeeds");
  const { user, isAuthenticated } = useAuth();

  const { data: orders = [], isLoading, isError } = useQuery({
    queryKey: ["userOrders", user?._id],
    queryFn: () => getUserOrders(user._id),
    enabled: Boolean(user?._id),
  });

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <section className="min-h-screen bg-base-100">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              InstaNeeds orders
            </div>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-base-content">
              My order history
            </h1>
          </div>
          <span className="badge badge-primary badge-outline px-4 py-3">
            {orders.length || 0} orders
          </span>
        </div>

        {isLoading && (
          <div className="flex min-h-[40vh] items-center justify-center">
            <LoadingUI />
          </div>
        )}

        {isError && (
          <div className="alert alert-error">
            <span>Unable to fetch your orders from the backend.</span>
          </div>
        )}

        {!isLoading && !isError && orders.length === 0 && (
          <div className="card border border-dashed border-base-300 bg-base-100">
            <div className="card-body text-center">
              <PackageCheck className="mx-auto text-primary" size={44} />
              <h2 className="mt-4 text-2xl font-black">No orders yet</h2>
              <p className="text-base-content/60">
                Your order history will appear here after checkout.
              </p>
              <a href="/products" className="btn btn-primary mx-auto mt-4">
                Start shopping
              </a>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {orders.map((order) => (
            <article key={order._id} className="card border border-base-200 bg-base-100 shadow-lg">
              <div className="card-body">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-base-content/50">
                      <Calendar size={15} /> {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </div>
                    <div className="mt-2 text-xl font-black text-base-content">
                      Order #{String(order._id).slice(-6).toUpperCase()}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`badge ${statusClass[order.status] ?? "badge-neutral"}`}> 
                      {String(order.status).replace(/_/g, " ")}
                    </span>
                    <span className="badge badge-outline">
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>

                <div className="divider my-2" />

                <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_220px]">
                  <div className="flex flex-wrap gap-3">
                    {order.items?.slice(0, 3).map((item, index) => (
                      <div key={`${order._id}-${item.productId ?? index}`} className="flex items-center gap-3 rounded-2xl border border-base-200 bg-base-50 p-2">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="h-14 w-14 rounded-xl object-cover" />
                        ) : (
                          <div className="grid h-14 w-14 place-items-center rounded-xl bg-primary/10 text-lg">
                            🧺
                          </div>
                        )}
                        <div>
                          <div className="font-bold text-base-content">{item.name}</div>
                          <div className="text-xs text-base-content/50">
                            Qty {item.quantity} · {formatPrice(item.price)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl bg-base-50 p-4">
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-base-content/60">
                      <Truck size={15} /> Summary
                    </div>
                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-base-content/60">Subtotal</span>
                        <span className="font-bold">{formatPrice(order.totalAmount ?? 0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-base-content/60">Delivery</span>
                        <span className="font-bold">{formatPrice(order.deliveryFee ?? 0)}</span>
                      </div>
                      <div className="border-t border-base-200 pt-2 flex justify-between">
                        <span className="font-extrabold text-base-content">Total</span>
                        <span className="font-extrabold text-primary">{formatPrice(order.totalAmount ?? 0)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="badge badge-ghost">
                    {order.paymentMethod?.toUpperCase() ?? "ORDER"}
                  </span>
                  <span className="badge badge-ghost">
                    {order.deliverySlot ?? "Today"}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrderPage
