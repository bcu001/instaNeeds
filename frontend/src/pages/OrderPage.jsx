import { Calendar, PackageCheck, Truck, ShoppingBag } from "lucide-react";
import { Link, Navigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import LoadingUI from "@/components/common/LoadingUI";
import { getUserOrders } from "@/services/order.service";
import { formatPrice } from "@/data/mockData";

const statusBadgeStyles = {
  placed: "border-blue-500/30 bg-blue-500/10 text-blue-500",
  confirmed: "border-emerald-500/30 bg-emerald-500/10 text-emerald-500",
  out_for_delivery: "border-amber-500/30 bg-amber-500/10 text-amber-500",
  delivered: "border-emerald-500/30 bg-emerald-500/10 text-emerald-500",
  cancelled: "border-rose-500/30 bg-rose-500/10 text-rose-500",
};

const OrderPage = () => {
  useDocumentTitle("Orders | InstaNeeds");
  const { user, isAuthenticated } = useAuth();

  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userOrders", user?._id],
    queryFn: () => getUserOrders(user._id),
    enabled: Boolean(user?._id),
  });

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <section className="min-h-[70vh] bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Account
            </span>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Order history
            </h1>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              Track delivery progress and review previous purchases.
            </p>
          </div>
          <span className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-foreground w-fit">
            {orders.length || 0} {orders.length === 1 ? "order" : "orders"}
          </span>
        </div>

        {isLoading && (
          <div className="flex min-h-[40vh] items-center justify-center">
            <LoadingUI />
          </div>
        )}

        {isError && (
          <div className="rounded-xl border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive text-center">
            Unable to fetch your orders. Please refresh or try again later.
          </div>
        )}

        {!isLoading && !isError && orders.length === 0 && (
          <div className="rounded-2xl border border-border bg-card p-12 text-center shadow-xs">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-muted text-foreground">
              <PackageCheck size={32} className="text-muted-foreground" />
            </div>
            <h2 className="mt-4 text-lg font-bold tracking-tight text-foreground sm:text-xl">
              No orders yet
            </h2>
            <p className="mx-auto mt-1 max-w-sm text-xs text-muted-foreground sm:text-sm">
              Your previous orders and active deliveries will show up here.
            </p>
            <Link
              to="/products"
              className="btn btn-primary mt-6 h-10 px-6 rounded-lg text-sm font-medium shadow-xs"
            >
              Start shopping
            </Link>
          </div>
        )}

        <div className="space-y-4">
          {orders.map((order) => {
            const dateStr = new Date(order.createdAt).toLocaleDateString(
              "en-IN",
              {
                day: "numeric",
                month: "short",
                year: "numeric",
              },
            );
            const statusClass =
              statusBadgeStyles[order.status] ||
              "border-border bg-muted text-muted-foreground";

            return (
              <article
                key={order._id}
                className="rounded-xl border border-border bg-card p-5 sm:p-6 shadow-xs space-y-4 transition-all hover:border-ring"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar size={13} />
                      <span>{dateStr}</span>
                    </div>
                    <div className="mt-1 text-base font-bold text-foreground">
                      Order #{String(order._id).slice(-8).toUpperCase()}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${statusClass}`}
                    >
                      {String(order.status).replace(/_/g, " ")}
                    </span>
                    <span className="inline-flex items-center rounded-full border border-border bg-muted/60 px-2.5 py-0.5 text-xs font-medium text-foreground">
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-[1fr_260px]">
                  {/* Order items preview */}
                  <div className="flex flex-wrap gap-2.5">
                    {order.items?.map((item, index) => (
                      <div
                        key={`${order._id}-${item.productId ?? index}`}
                        className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 p-2.5 min-w-[200px]"
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-12 w-12 rounded-md object-cover bg-muted"
                          />
                        ) : (
                          <div className="grid h-12 w-12 place-items-center rounded-md bg-muted text-lg">
                            <ShoppingBag
                              size={20}
                              className="text-muted-foreground"
                            />
                          </div>
                        )}
                        <div className="min-w-0">
                          <div className="truncate text-xs font-semibold text-foreground">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-muted-foreground">
                            Qty {item.quantity} · {formatPrice(item.price)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary */}
                  <div className="rounded-lg border border-border bg-muted/30 p-3.5 space-y-2 text-xs">
                    <div className="flex items-center gap-1.5 font-semibold text-foreground">
                      <Truck size={14} className="text-muted-foreground" />
                      <span>Order Summary</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Total Amount</span>
                      <span className="font-semibold text-foreground">
                        {formatPrice(order.totalAmount ?? 0)}
                      </span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Payment</span>
                      <span className="font-medium text-foreground uppercase text-[11px]">
                        {order.paymentMethod ?? "PREPAID"}
                      </span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Delivery slot</span>
                      <span className="font-medium text-foreground">
                        {order.deliverySlot ?? "Standard"}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OrderPage;
