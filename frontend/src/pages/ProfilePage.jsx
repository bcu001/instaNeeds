import { Calendar, CheckCircle2, Mail, Shield, UserRound, Package, Settings } from "lucide-react";
import { Link, Navigate } from "react-router";
import useAuth from "@/hooks/useAuth";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import LoadingUI from "@/components/common/LoadingUI";
import Avatar from "@/components/common/Avatar";

const ProfilePage = () => {
  useDocumentTitle("Profile | InstaNeeds");
  const { user, isLoading, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (isLoading || !user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <LoadingUI />
      </div>
    );
  }

  const joinedDate = new Date(user.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Account
            </span>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Profile
            </h1>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              Manage your personal information and account security.
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-500 w-fit">
            <CheckCircle2 size={14} />
            <span>Active member</span>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          {/* Profile card */}
          <section className="rounded-xl border border-border bg-card p-6 shadow-xs space-y-6">
            <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
              <Avatar className="size-20 text-3xl shrink-0" />
              <div className="min-w-0">
                <span className="inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-semibold text-foreground uppercase tracking-wider">
                  {user.role ?? "CUSTOMER"}
                </span>
                <h2 className="mt-2 text-xl font-bold text-foreground sm:text-2xl truncate">
                  {user.name}
                </h2>
                <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Mail size={13} className="shrink-0" />
                    <span className="break-all">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={13} className="shrink-0" />
                    <span>Member since {joinedDate}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                Account Details
              </h3>
              <div className="space-y-1">
                <div className="flex flex-col gap-1 rounded-lg p-2.5 hover:bg-muted/40 transition-colors sm:flex-row sm:items-center sm:justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <UserRound size={15} />
                    <span>Name</span>
                  </div>
                  <span className="font-medium text-foreground">{user.name}</span>
                </div>

                <div className="flex flex-col gap-1 rounded-lg p-2.5 hover:bg-muted/40 transition-colors sm:flex-row sm:items-center sm:justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail size={15} />
                    <span>Email address</span>
                  </div>
                  <span className="font-medium text-foreground break-all">{user.email}</span>
                </div>

                <div className="flex flex-col gap-1 rounded-lg p-2.5 hover:bg-muted/40 transition-colors sm:flex-row sm:items-center sm:justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Shield size={15} />
                    <span>Role</span>
                  </div>
                  <span className="inline-flex items-center rounded-full border border-border bg-muted/60 px-2.5 py-0.5 text-xs font-medium text-foreground capitalize">
                    {user.role ?? "customer"}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Quick links & summary */}
          <aside className="rounded-xl border border-border bg-card p-6 shadow-xs space-y-5 h-fit">
            <h3 className="text-base font-semibold text-foreground">Quick actions</h3>
            <div className="space-y-2">
              <Link
                to="/order"
                className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-muted transition-all"
              >
                <div className="flex items-center gap-2.5 text-sm font-medium text-foreground">
                  <Package size={16} className="text-muted-foreground" />
                  <span>My orders</span>
                </div>
                <span className="text-xs text-muted-foreground">→</span>
              </Link>

              <Link
                to="/settings"
                className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-muted transition-all"
              >
                <div className="flex items-center gap-2.5 text-sm font-medium text-foreground">
                  <Settings size={16} className="text-muted-foreground" />
                  <span>Preferences</span>
                </div>
                <span className="text-xs text-muted-foreground">→</span>
              </Link>
            </div>

            <div className="border-t border-border pt-4 text-xs text-muted-foreground space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                <span>Encrypted checkout enabled</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                <span>Fast 10-minute neighbourhood hub routing</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
