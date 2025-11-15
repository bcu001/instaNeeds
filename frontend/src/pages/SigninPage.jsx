import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const { signin } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const temp = { ...formData, [e.target.name]: e.target.value };
    setFormData(temp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await signin(formData);
    if (res) {
      setError(res);
    } else {
      setError(null);
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
        <h1 className="font-bold text-xl text-center mb-5">Sign in</h1>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-5 rounded-lg"
        >
          <input
            className="w-full outline-primary bg-input rounded-md p-2 text-text border-secondary border"
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            required
            onChange={handleChange}
          />
          <div className="relative">
            <input
              className="w-full outline-primary bg-input rounded-md p-2 text-text border-secondary border"
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Password"
              required
              onChange={handleChange}
            />
            <div
              onClick={handlePassword}
              className="absolute right-2 top-2.5 cursor-pointer"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </div>
          </div>
          <button
            disabled={isLoading}
            className={`def-btn ${isLoading ? "bg-gray-600" : ""}`}
          >
            Sign in
          </button>
          {error && <div className="text-error">{error}</div>}
        </form>
        <div className="text-center my-4 text-sm text-gray-600">
          You don't have an account ?
        </div>
        <button
          onClick={() => navigate("/signup")}
          className="def-btn w-full text-text bg-gray-300 shadow-lg text-sm"
        >
          Sign up Now
        </button>
      </div>
    </div>
  );
};

export default Login;
