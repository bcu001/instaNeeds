import useAuth from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate, useSearchParams } from "react-router";
import { getApiErrorMessage } from "@/lib/apiError";

const SignUpPage = () => {
  const [searchParams] = useSearchParams();
  const prefillEmail = searchParams.get("email") || "";

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: prefillEmail,
    },
  });

  const { signupHandler, signupPending } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await signupHandler(data.name, data.email, data.password);
      toast.success("Account created! Please sign in.");
      navigate("/signin");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Unable to create account"));
    }
  };

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
            Create an account
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Save addresses, reorder in a tap and track every delivery.
          </p>
        </div>

        {/* Sign up form */}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5"
            >
              Full name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Aashika Sharma"
              className={`h-10 w-full rounded-lg border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring shadow-xs ${
                errors.name ? "border-error focus:ring-error" : "border-border"
              }`}
              {...register("name", {
                required: "Full name is required",
              })}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-error">{errors.name.message}</p>
            )}
          </div>

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
              placeholder="At least 6 characters"
              className={`h-10 w-full rounded-lg border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring shadow-xs ${
                errors.password
                  ? "border-error focus:ring-error"
                  : "border-border"
              }`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
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
            disabled={signupPending}
          >
            {signupPending ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="mt-6 border-t border-border pt-4 text-center text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="font-semibold text-foreground hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
