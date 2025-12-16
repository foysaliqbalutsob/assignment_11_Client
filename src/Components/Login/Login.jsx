import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useauth";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import SocialLogIn from "../SocialLogIn/SocialLogIn";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser } = useAuth();

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        setIsLoading(true);

        // Redirect to previous page
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div>
        <div className="text-center">
          <h1 className="text-[42px] font-extrabold">Welcome Back</h1>
          <p className="font-bold">Login with AssetVerse</p>
        </div>

        <form onSubmit={handleSubmit(handleLogin)}>
          <fieldset className="fieldset">
            {/* Email */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-600">Email required</p>}

            {/* Password */}
            <label className="label">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true, minLength: 6 })}
                className="input pr-10"
                placeholder="Password"
              />
              {/* Toggle */}
              <div
                className="absolute left-60 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </div>
            </div>

            {errors.password?.type === "required" && (
              <p className="text-red-600">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-600">
                Password must be at least 6 characters
              </p>
            )}

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button type="submit" className="btn btn-primary w-full mt-4">
              {isLoading ? (
                <span className="loading loading-bars loading-sm"></span>
              ) : (
                "Login"
              )}
            </button>

            <Link className="underline text-xs text-blue-400" to={"/registration"}>
              Register?
            </Link>
          </fieldset>
        </form>

        <SocialLogIn />
      </div>
    </div>
  );
};

export default Login;
