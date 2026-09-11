import { Calendar, CheckCircle2, Mail, Shield, UserRound } from "lucide-react";
import { Navigate } from "react-router";
import useAuth from "@/hooks/useAuth";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import LoadingUI from "@/components/common/LoadingUI";
import Avatar from "@/components/common/Avatar";

const ProfilePage = () => {
  useDocumentTitle("My profile | InstaNeeds");
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
    <section className="min-h-screen bg-base-100">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              InstaNeeds account
            </div>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-base-content">
              My profile
            </h1>
          </div>
          <div>
            <span className="badge badge-success badge-outline px-4 py-3">
              <CheckCircle2 size={16} className="mr-2" />
              Active member
            </span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="card border border-base-200 bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex flex-wrap items-center gap-5">
                <Avatar className={"size-24 text-3xl "} />
                <div className="flex-1">
                  <span className="badge badge-primary badge-soft mb-3">
                    {user.role?.toUpperCase() ?? "CUSTOMER"}
                  </span>
                  <h2 className="text-3xl font-black text-base-content">
                    {user.name}
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm">
                    <span className="inline-flex items-center gap-2">
                      <Mail size={15} /> {user.email}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Calendar size={15} /> Joined {joinedDate}
                    </span>
                  </div>
                </div>
              </div>

              <div className="divider" />

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-base-200 bg-base-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-base-content/70">
                    <UserRound size={16} /> Name
                  </div>
                  <div className="mt-2 font-black text-lg">{user.name}</div>
                </div>
                <div className="rounded-2xl border border-base-200 bg-base-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-base-content/70">
                    <Mail size={16} /> Email
                  </div>
                  <div className="mt-2 font-black text-lg break-all">
                    {user.email}
                  </div>
                </div>
                <div className="rounded-2xl border border-base-200 bg-base-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-base-content/70">
                    <Shield size={16} /> Access
                  </div>
                  <div className="mt-2 font-black text-lg capitalize">
                    {user.role}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="card border border-base-200 bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-base-content/60">
                  Account summary
                </span>
              </div>
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-primary/10 p-4">
                  <div className="text-xs font-bold uppercase tracking-[0.16em] text-base-content/60">
                    Delivery address
                  </div>
                  <div className="mt-2 text-base font-semibold text-base-content">
                    Home delivery enabled
                  </div>
                </div>
                <div className="rounded-2xl bg-base-50 p-4">
                  <div className="text-xs font-bold uppercase tracking-[0.16em] text-base-content/60">
                    Order history
                  </div>
                  <div className="mt-2 text-3xl font-black text-base-content">
                    <span className="text-primary">Live</span>
                  </div>
                </div>
                <div className="rounded-2xl bg-base-50 p-4">
                  <div className="text-xs font-bold uppercase tracking-[0.16em] text-base-content/60">
                    Security
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-success">
                    <CheckCircle2 size={16} /> Protected session
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
