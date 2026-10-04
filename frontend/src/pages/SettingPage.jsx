import {
  Bell,
  MapPin,
  ShieldCheck,
  SlidersHorizontal,
  Moon,
  Sun,
  Truck,
} from "lucide-react";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import useTheme from "@/hooks/useTheme";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import Avatar from "@/components/common/Avatar";
import toast from "react-hot-toast";

const SettingPage = () => {
  useDocumentTitle("Settings | InstaNeeds");
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    deliveryReminders: true,
    promos: false,
  });

  const handleSave = () => {
    toast.success("Preferences saved");
  };

  const handleReset = () => {
    setNotifications({
      orderUpdates: true,
      deliveryReminders: true,
      promos: false,
    });
    toast("Preferences reset to defaults");
  };

  return (
    <section className="min-h-[70vh] bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Preferences
          </span>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Account settings
          </h1>
          <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
            Customize your notifications, appearance, and delivery defaults.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          {/* User overview sidebar */}
          <aside className="rounded-xl border border-border bg-card p-5 sm:p-6 shadow-xs space-y-5 h-fit">
            <div className="flex items-center gap-3.5">
              <Avatar className="size-12 text-xl" />
              <div className="min-w-0">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Signed in as
                </span>
                <div className="truncate text-base font-bold text-foreground">
                  {user?.name ?? "Guest User"}
                </div>
                <div className="truncate text-xs text-muted-foreground">
                  {user?.email ?? "guest@example.com"}
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-4 space-y-3">
              <div className="rounded-lg border border-border bg-muted/40 p-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-foreground">
                  <ShieldCheck size={14} className="text-emerald-500" />
                  <span>Security</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Protected session is active.
                </p>
              </div>

              <div className="rounded-lg border border-border bg-muted/40 p-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-foreground">
                  <MapPin size={14} className="text-muted-foreground" />
                  <span>Delivery</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Default address configured via checkout.
                </p>
              </div>
            </div>
          </aside>

          {/* Preferences main form */}
          <main className="rounded-xl border border-border bg-card p-5 sm:p-6 shadow-xs space-y-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <SlidersHorizontal size={16} className="text-muted-foreground" />
              <span>Notification & Display Preferences</span>
            </div>

            <div className="space-y-4 divide-y divide-border">
              {/* Appearance / Theme */}
              <div className="flex items-center justify-between gap-4 pt-4 first:pt-0">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
                    <span>Theme appearance</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Currently set to {theme === "dark" ? "Dark" : "Light"} mode.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="btn btn-outline h-9 px-4 rounded-lg text-xs font-medium border-border hover:bg-muted text-foreground"
                >
                  Switch to {theme === "dark" ? "Light" : "Dark"}
                </button>
              </div>

              {/* Order updates */}
              <div className="flex items-center justify-between gap-4 pt-4">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Bell size={16} />
                    <span>Order updates</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Receive live notifications when your order status changes.
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="toggle border-border bg-muted checked:bg-primary"
                  checked={notifications.orderUpdates}
                  onChange={(e) =>
                    setNotifications((c) => ({
                      ...c,
                      orderUpdates: e.target.checked,
                    }))
                  }
                />
              </div>

              {/* Delivery reminders */}
              <div className="flex items-center justify-between gap-4 pt-4">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Truck size={16} />
                    <span>Delivery reminders</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Get an alert when your rider is arriving at your door.
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="toggle border-border bg-muted checked:bg-primary"
                  checked={notifications.deliveryReminders}
                  onChange={(e) =>
                    setNotifications((c) => ({
                      ...c,
                      deliveryReminders: e.target.checked,
                    }))
                  }
                />
              </div>

              {/* Promotions */}
              <div className="flex items-center justify-between gap-4 pt-4">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <span>Promotions and discounts</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Occasional deals and coupon alerts for seasonal specials.
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="toggle border-border bg-muted checked:bg-primary"
                  checked={notifications.promos}
                  onChange={(e) =>
                    setNotifications((c) => ({
                      ...c,
                      promos: e.target.checked,
                    }))
                  }
                />
              </div>
            </div>

            <div className="border-t border-border pt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleSave}
                className="btn btn-primary h-10 px-6 rounded-lg text-sm font-medium shadow-xs"
              >
                Save preferences
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="btn btn-outline h-10 px-5 rounded-lg text-sm font-medium border-border hover:bg-muted text-foreground"
              >
                Reset defaults
              </button>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default SettingPage;
