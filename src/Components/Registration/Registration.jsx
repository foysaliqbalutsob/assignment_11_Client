import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useauth";
import { Link, useNavigate } from "react-router";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import SocialLogIn from "../SocialLogIn/SocialLogIn";
import axios from "axios";
import useAxios from "../../Hooks/useAxios";

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const watchRole = watch("role");

  const { registerUser, updateUserprofile } = useAuth();
  const axiosSecure = useAxios();
  const navigate = useNavigate();

  const handleRegistration = async (data) => {
    try {
      setLoading(true); // start
      const profileImg = data.photo[0];
      let companyLogoUrl = "";

      // Upload profile photo
      const formData = new FormData();
      formData.append("image", profileImg);
      const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_HOST_NAME}`;
      const photoRes = await axios.post(image_API_URL, formData);
      const uploadedPhotoUrl = photoRes.data.data.url;

      // If HR, upload company logo
      if (watchRole === "hr" && data.companyLogo?.[0]) {
        const companyFormData = new FormData();
        companyFormData.append("image", data.companyLogo[0]);
        const companyRes = await axios.post(image_API_URL, companyFormData);
        companyLogoUrl = companyRes.data.data.url;
      }

      // Register user in Firebase
      const result = await registerUser(data.email, data.password);

      // Prepare user profile
      const userProfile = {
        
        displayName: data.name,
         photoURL: uploadedPhotoUrl,
        email: data.email,
        role: data.role,
        companyName: watchRole === "hr" ? data.companyName : null,
        companyLogo: companyLogoUrl || null,
      };
      console.log(userProfile)

      await updateUserprofile(userProfile);

      // Save in backend
      await axiosSecure.post("/users", userProfile);

      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
    finally {
    setLoading(false); 
  }
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <div className="w-full max-w-md">
        <h1 className="text-5xl font-bold text-primary mb-4">Registration</h1>
        <p className="mb-6">
          Welcome to <span className="font-semibold">AssetVerse</span> – your
          smart platform for managing company assets efficiently.
        </p>

        <form onSubmit={handleSubmit(handleRegistration)}>
          <fieldset className="fieldset space-y-4">
            {/* Role */}
            <label className="label">Register as</label>
            <select
              {...register("role", { required: true })}
              className="input w-full border"
            >
              <option value="">Select role</option>
              <option value="hr">HR Manager</option>
              <option value="employee">Employee</option>
            </select>
            {errors.role && (
              <p className="text-red-500">Role selection is required.</p>
            )}

            {/* HR Conditional Fields */}
            {watchRole === "hr" && (
              <>
                <label className="label">Company Name</label>
                <input
                  type="text"
                  {...register("companyName", { required: true })}
                  className="input w-full border"
                  placeholder="Company Name"
                />
                {errors.companyName && (
                  <p className="text-red-500">Company Name is required.</p>
                )}

                <label className="label">Company Logo</label>
                <input
                  type="file"
                  {...register("companyLogo", { required: true })}
                  className="input w-full border"
                />
                {errors.companyLogo && (
                  <p className="text-red-500">Company Logo is required.</p>
                )}
              </>
            )}

            {/* Photo */}
            <label className="label">Photo</label>
            <input
              type="file"
              {...register("photo", { required: true })}
              className="input w-full border"
              placeholder="Your photo"
            />
            {errors.photo && (
              <p className="text-red-500">Photo is required.</p>
            )}

            {/* Name */}
            <label className="label">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input w-full border"
              placeholder="Your Name"
            />
            {errors.name && <p className="text-red-500">Name is required.</p>}

            {/* Email */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input w-full border"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500">Email is required.</p>
            )}

            {/* Password */}
            <label className="label">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                    message:
                      "Password must contain uppercase, lowercase, number & special character",
                  },
                })}
                className="input w-full border pr-10"
                placeholder="Password"
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}

            <div>
              <a className="link link-hover text-blue-700">Forgot password?</a>
            </div>

            {/* Register Button */}
 <button
  type="submit"
  className="btn w-full bg-primary border-none mt-4 relative"
  disabled={loading}
>
  {loading && (
    <span className="loading loading-spinner loading-sm absolute left-4"></span>
  )}
  {loading ? "Registering..." : "Register"}
</button>


          </fieldset>
        </form>

        <SocialLogIn />
        <Link to={"/login"} className="underline text-xs text-blue-700 mt-4 block">
          Already have an account? Log in
        </Link>
      </div>
    </div>
  );
};

export default Registration;
