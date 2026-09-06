import useAuth from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router";
import toast from "react-hot-toast";

const SignInPage = () => {
  const { handleSubmit, register } = useForm();
  const { signinHandler, signinPending, isAuthenticated } = useAuth();
  const onSubmit = async (data) => {
    try {
      await signinHandler(data.email, data.password);
    } catch (error) {
      toast.error(error.response?.data?.message ?? "Unable to sign in");
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4">
      <div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email" className="floating-label">
            <span>Email</span>
            <input
              id="email"
              className="input input-lg"
              placeholder="mail@site.com"
              type="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "email is required",
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
            />
          </label>
          <label htmlFor="pass" className="floating-label">
            <span>Password</span>
            <input
              id="pass"
              className="input input-lg"
              placeholder="*********"
              {...register("password", {
                required: {
                  value: true,
                  message: "password is required",
                },
              })}
              type="password"
            />
          </label>
          <button className="btn btn-primary btn-lg" type="submit">
            {signinPending ? "Signing in" : "Submit"}
          </button>
        </form>
      </div>
      <div className="flex gap-1">
        <div>First time here?</div>
        <div>
          <Link to={`/signup`} className="link link-info">Sign up</Link > instead
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
