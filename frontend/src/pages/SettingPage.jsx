import { Bell, MapPin, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import Avatar from "@/components/common/Avatar";

const SettingPage = () => {
  useDocumentTitle("Settings | InstaNeeds");
  const { user } = useAuth();
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    deliveryReminders: true,
    promos: false,
  });

  return (
    <section className="min-h-screen bg-base-100">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-8 sm:mb-10">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Preferences
          </div>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-base-content sm:text-4xl">
            Account settings
          </h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="card border border-base-200 bg-base-100 shadow-xl">
            <div className="card-body p-4 sm:p-6">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <div className="avatar avatar-placeholder">
                  <Avatar className={"size-16 text-2xl"} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-black uppercase tracking-[0.2em] text-base-content/50">
                    Signed in as
                  </div>
                  <div className="mt-1 text-xl font-black text-base-content">
                    {user?.name ?? "Guest"}
                  </div>
                  <div className="text-sm break-all text-base-content/60">
                    {user?.email ?? "guest@example.com"}
                  </div>
                </div>
              </div>
              <div className="divider" />
              <div className="space-y-4">
                <div className="rounded-2xl bg-base-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-base-content/60">
                    <ShieldCheck size={15} /> Security
                  </div>
                  <div className="mt-2 text-sm text-base-content/70">
                    Protected session is active.
                  </div>
                </div>
                <div className="rounded-2xl bg-base-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.16em] text-base-content/60">
                    <MapPin size={15} /> Delivery
                  </div>
                  <div className="mt-2 text-sm text-base-content/70">
                    Default addresses are managed through checkout.
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <main className="card border border-base-200 bg-base-100 shadow-xl">
            <div className="card-body p-4 sm:p-6">
              <div className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-primary">
                <SlidersHorizontal size={16} /> Update preferences
              </div>

              <div className="mt-6 space-y-4">
                <div className="form-control">
                  <label className="label cursor-pointer justify-between gap-4">
                    <span className="label-text flex items-center gap-2 font-bold">
                      <Bell size={16} /> Order updates
                    </span>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={notifications.orderUpdates}
                      onChange={(e) =>
                        setNotifications((current) => ({
                          ...current,
                          orderUpdates: e.target.checked,
                        }))
                      }
                    />
                  </label>
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer justify-between gap-4">
                    <span className="label-text flex items-center gap-2 font-bold">
                      <TruckIcon /> Delivery reminders
                    </span>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={notifications.deliveryReminders}
                      onChange={(e) =>
                        setNotifications((current) => ({
                          ...current,
                          deliveryReminders: e.target.checked,
                        }))
                      }
                    />
                  </label>
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer justify-between gap-4">
                    <span className="label-text font-bold">
                      Promotions and offers
                    </span>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={notifications.promos}
                      onChange={(e) =>
                        setNotifications((current) => ({
                          ...current,
                          promos: e.target.checked,
                        }))
                      }
                    />
                  </label>
                </div>
              </div>

              <div className="divider" />

              <div className="grid gap-3 sm:grid-cols-2">
                <button className="btn btn-primary btn-block">
                  Save settings
                </button>
                <button className="btn btn-outline btn-block">
                  Reset defaults
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

const TruckIcon = () => <span className="text-base">📦</span>;

export default SettingPage;
