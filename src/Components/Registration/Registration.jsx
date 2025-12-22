import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import useAuth from "../../Hooks/useauth";
import useAxios from "../../Hooks/useAxios";
import SocialLogIn from "../SocialLogIn/SocialLogIn";

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();



  const { registerUser, updateUserprofile } = useAuth();
  const axiosSecure = useAxios();
  const navigate = useNavigate();

  const handleRegistration = async (data) => {
    try {
      setIsLoading(true);

      const imageAPI = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_HOST_NAME}`;

   
      const logoForm = new FormData();
      logoForm.append("image", data.companyLogo[0]);

      const logoRes = await axios.post(imageAPI, logoForm);
      const companyLogoUrl = logoRes.data.data.url;

      
      await registerUser(data.email, data.password);

      await updateUserprofile({
        displayName: data.name,
        photoURL: companyLogoUrl,
      });


      const userProfile = {
        name: data.name,
        email: data.email,
                  // HR photo
        companyLogo: companyLogoUrl,  
        companyName: data.companyName,
        dateOfBirth: data.dateOfBirth,
        role: "hr",
        packageLimit: 5,
        currentEmployees: 0,
        subscription: "basic",
      };

      console.log("HR Profile:", userProfile);

      await axiosSecure.post("/users", userProfile);

      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center mt-10 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-primary mb-4">
          HR Manager Registration
        </h1>

        <p className="mb-6 text-sm">
          Welcome to <span className="font-semibold">AssetVerse</span>manage
          your company assets smartly.
        </p>

        <form onSubmit={handleSubmit(handleRegistration)}>
          <fieldset className="fieldset space-y-4">


            

            {/* Full Name */}
            <label className="label">HR Name</label>
            <input
              type="text"
              placeholder="Full Name"
              className="input w-full border"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p className="text-error text-sm">Name is required</p>
            )}

            {/* Company Name */}
            <label className="label">Company Name</label>
            <input
              type="text"
              placeholder="Company Name"
              className="input w-full border"
              {...register("companyName", { required: true })}
            />
            {errors.companyName && (
              <p className="text-error text-sm">Company name is required</p>
            )}

            {/* Company Logo */}
            <label className="label">Company Logo</label>
            <input
              type="file"
              className="file-input input w-full border"
              {...register("companyLogo", { required: true })}
            />
            {errors.companyLogo && (
              <p className="text-error text-sm">Company logo is required</p>
            )}

            {/* HR Photo */}
            {/* <input
              type="file"
              className="file-input file-input-bordered w-full"
              {...register("photo", { required: true })}
            />
            {errors.photo && (
              <p className="text-error text-sm">Photo is required</p>
            )} */}

            {/* Date of Birth */}
            <label className="label">Date of Birth</label>
            <input
              type="date"
              className="input border w-full"
              {...register("dateOfBirth", { required: true })}
            />
            {errors.dateOfBirth && (
              <p className="text-error text-sm">Date of birth is required</p>
            )}

            {/* Email */}
            <label className="label">Email</label>
            <input
              type="email"
              placeholder="email@company.com"
              className="input w-full border"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-error text-sm">Email is required</p>
            )}

            {/* Password */}
            <div className="relative">
              <label className="label">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password (min 6 characters)"
                className="input w-full border pr-10"
                {...register("password", {
                  required: true,
                  minLength: 6,
                })}
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </span>
            </div>
            {errors.password && (
              <p className="text-error text-sm">
                Minimum 6 characters required
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary border-none text-white w-full"
              disabled={isLoading}
            >
              {isLoading ? (
    <span className="loading loading-bars loading-sm"></span>
  ) : (
    "Registration"
  )}
            </button>
          </fieldset>
        </form>

        <SocialLogIn />

        <Link
          to="/login"
          className="text-xs underline text-blue-600 mt-4 block"
        >
          Already have an account? Log in
        </Link>
        <Link to='/employee-registration' className="text-xs underline text-blue-600 mt-2 block">
          Register as Employee
        </Link>
      </div>
    </div>
  );
};

export default Registration;
