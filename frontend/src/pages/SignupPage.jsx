import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    const res = await signup(data);
    if (res) {
      setErr(res);
    } else {
      setErr(null);
      navigate("/");
    }
    setIsLoading(false);
  };

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="w-[300px]">
        <h1 className="font-bold text-xl text-center mb-4">Sign up</h1>
        <form
          className=" w-full flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            placeholder="Name"
            className="def-input"
            {...register("name", {
              required: "Name is requried!",
              minLength: 2,
            })}
          />
          {errors.name && (
            <span className=" text-error">{errors.name.message}</span>
          )}

          <input
            placeholder="Email Address"
            className="def-input"
            {...register("email", { required: "Email Address is requried!" })}
          />
          {errors.email && (
            <span className=" text-error">{errors.email.message}</span>
          )}

          <div className="relative">
            <input
              placeholder="Password"
              className="def-input"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "password is required!",
                minLength: {
                  value: 8,
                  message: "Mininum length of password is 8",
                },
              })}
            />
            {errors.password && (
              <span className=" text-error">{errors.password.message}</span>
            )}

            <div
              onClick={handlePassword}
              className="absolute right-2 top-2.5 cursor-pointer"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </div>
          </div>

          <input
            disabled={isLoading}
            className={`def-btn ${isLoading ? "bg-gray-500" : ""}`}
            type="submit"
          />
          {err && <span className="text-error">{err}</span>}
        </form>
        <div className="text-center my-4 text-sm text-gray-600">
          You already hav an account ?
        </div>
        <button
          onClick={() => navigate("/signin")}
          className="def-btn w-full text-text bg-gray-300 shadow-lg text-sm"
        >
          Sign in Now
        </button>
      </div>
    </div>
  );
};

export default Signup;
