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
    <section className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-base-content/60">
            InstaNeeds account
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-3xl font-black capitalize sm:text-4xl">
              My profile
            </h1>

            <div className="aura aura-dual self-start sm:self-auto">
              <div className="card bg-base-100">
                <div className="badge badge-success badge-outline gap-1.5 px-3 py-3">
                  <CheckCircle2 size={16} />
                  Active member
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* Profile card */}
          <section className="card border border-base-300 bg-base-100 shadow-sm">
            <div className="card-body p-5 sm:p-6 md:p-8">
              {/* Profile information */}
              <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">
                <div className="shrink-0">
                  <Avatar className="size-20 text-4xl sm:size-24" />
                </div>

                <div className="mt-4 min-w-0 sm:ml-5 sm:mt-0 ">
                  <span className="badge badge-primary badge-soft">
                    {user.role?.toUpperCase() ?? "CUSTOMER"}
                  </span>

                  <h2 className="mt-2 truncate text-2xl font-black sm:text-3xl">
                    {user.name}
                  </h2>

                  <div className="mt-3 space-y-2 text-sm text-base-content/70 ">
                    <div className="flex min-w-0 max-w-full items-center justify-center gap-2 sm:justify-start">
                      <Mail size={15} className="shrink-0" />
                      <span className="min-w-0 max-w-full break-all">
                        {user.email}
                      </span>
                    </div>

                    <div className="flex items-center justify-center gap-2 sm:justify-start">
                      <Calendar size={15} className="shrink-0" />
                      <span>Joined {joinedDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="divider" />

              {/* Account details */}
              <div className="space-y-1">
                <div className="flex flex-col gap-1 rounded-lg p-3 hover:bg-base-200 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium text-base-content/60">
                    <UserRound size={16} />
                    <span>Name</span>
                  </div>

                  <span className="wrap-break-word font-medium sm:text-right">
                    {user.name}
                  </span>
                </div>

                <div className="flex flex-col gap-1 rounded-lg p-3 hover:bg-base-200 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium text-base-content/60">
                    <Mail size={16} />
                    <span>Email</span>
                  </div>

                  <span className="break-all font-medium sm:text-right">
                    {user.email}
                  </span>
                </div>

                <div className="flex flex-col gap-1 rounded-lg p-3 hover:bg-base-200 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium text-base-content/60">
                    <Shield size={16} />
                    <span>Access</span>
                  </div>

                  <span className="badge badge-ghost">
                    {user.role ?? "customer"}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Account summary */}
          <aside className="card border border-base-300 bg-base-100 shadow-sm">
            <div className="card-body p-5 sm:p-6">
              <h3 className="text-lg font-bold">Account summary</h3>

              <div className="mt-3 divide-y divide-base-300">
                {/* Delivery */}
                <div className="flex items-center justify-between gap-4 py-4">
                  <div className="min-w-0">
                    <p className="font-medium">Delivery address</p>
                    <p className="text-sm text-base-content/60">
                      Home delivery enabled
                    </p>
                  </div>

                  <span className="badge badge-success badge-soft shrink-0">
                    Active
                  </span>
                </div>

                {/* Orders */}
                <div className="flex items-center justify-between gap-4 py-4">
                  <div>
                    <p className="font-medium">Order history</p>
                    <p className="text-sm text-base-content/60">
                      View your previous orders
                    </p>
                  </div>

                  <span className="badge badge-info badge-soft shrink-0">
                    Live
                  </span>
                </div>

                {/* Security */}
                <div className="flex items-center justify-between gap-4 py-4">
                  <div>
                    <p className="font-medium">Security</p>
                    <p className="text-sm text-base-content/60">
                      Your session is protected
                    </p>
                  </div>

                  <CheckCircle2 size={18} className="shrink-0 text-success" />
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
