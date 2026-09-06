import useAuth from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { getApiErrorMessage } from "@/lib/apiError";

const SignInPage = () => {
  const { handleSubmit, register } = useForm();
  const { signupHandler, signupPending } = useAuth();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      await signupHandler(data.name, data.email, data.password);
      navigate('/signin')
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Unable to create account"));
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4">
      <div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name" className="floating-label">
            <span>Full Name</span>
            <input
              id="name"
              className="input input-lg"
              placeholder="Full Name"
              type="name"
              {...register("name", {
                required: {
                  value: true,
                  message: "name is required",
                },
              })}
            />
          </label>
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
            {signupPending ? "Creating..." : "Submit"}
          </button>
        </form>
      </div>
      <div className="flex gap-1">
        <div>Already have an account?</div>
        <div>
          <Link to={`/signin`} className="link link-info">Sign in</Link > instead
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
