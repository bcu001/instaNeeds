import useAuth from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router";
import toast from "react-hot-toast";

const SignInPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { signinHandler, signinPending, isAuthenticated } = useAuth();

  const onSubmit = async (data) => {
    try {
      await signinHandler(data.email, data.password);
    } catch (error) {
      toast.error(error.response?.data?.message ?? "Unable to sign in");
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs">
        {/* Brand header */}
        <div className="flex flex-col items-center text-center">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-base tracking-tight text-foreground mb-4"
          >
            <i className="not-italic w-7 h-7 rounded-[7px] bg-primary text-primary-fg flex items-center justify-center font-bold text-xs shadow-xs">
              I
            </i>
            <span>InstaNeeds</span>
          </Link>
          <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Welcome back
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Sign in to your account to review orders and reorder.
          </p>
        </div>

        {/* Sign in form */}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className={`h-10 w-full rounded-lg border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring shadow-xs ${
                errors.email ? "border-error focus:ring-error" : "border-border"
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-error">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="pass"
              className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5"
            >
              Password
            </label>
            <input
              id="pass"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              className={`h-10 w-full rounded-lg border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring shadow-xs ${
                errors.password
                  ? "border-error focus:ring-error"
                  : "border-border"
              }`}
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-error">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            className="btn btn-primary w-full h-10 rounded-lg text-sm font-medium shadow-xs mt-2"
            type="submit"
            disabled={signinPending}
          >
            {signinPending ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mt-6 border-t border-border pt-4 text-center text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-foreground hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
