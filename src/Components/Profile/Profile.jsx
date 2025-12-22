import React, { useState, useEffect } from "react";
import useAuth from "../../Hooks/useauth";
import { useForm } from "react-hook-form";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router";

const Profile = () => {
  const { user, signOutUser, setUser, updateUserprofile } = useAuth();
  const axiosSecure = useAxios();
  const [uploading, setUploading] = useState(false);
  const [companies, setCompanies] = useState([]);

  // Fetch affiliated companies
  useEffect(() => {
    if (!user?.email) return;
    axiosSecure
      .get(`/employee/companies/${user.email}`)
      .then((res) => setCompanies(res.data))
      .catch(console.log);
  }, [user?.email]);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      displayName: user?.displayName || "",
    },
  });

  const onSubmit = async (data) => {
    setUploading(true);
    try {
      const updatedInfo = { displayName: data.displayName };

      // Handle photo upload
      if (data.photo && data.photo[0]) {
        const formData = new FormData();
        formData.append("image", data.photo[0]);
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_HOST_NAME
        }`;
        const photoRes = await axios.post(image_API_URL, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        updatedInfo.photoURL = photoRes.data.data.url;
      }

      await updateUserprofile(updatedInfo);

      // 2️⃣ Update backend
      await axiosSecure.patch(`/users/${user.email}`, updatedInfo);

      // 3️⃣ Update local state
      setUser((prev) => ({ ...prev, ...updatedInfo }));

      Swal.fire("Success", "Profile updated successfully", "success");
      reset({ displayName: updatedInfo.displayName });
    } catch (err) {
      console.error(err);
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to update profile",
        "error"
      );
    } finally {
      setUploading(false);
    }
  };

  const handleLogOut = () => {
    signOutUser().catch((err) => console.log(err));
  };

  return (
    <div className="my-10">
      <h2 className="text-3xl font-bold text-center my-5">User Profile</h2>
      <div className="card bg-base-100 shadow-xl p-6 rounded-xl max-w-md mx-auto">
        {/* Avatar */}
        <div className="avatar mb-4">
          <div className="w-28 h-28 rounded-full ring ring-primary/40 ring-offset-base-100 ring-offset-2 mx-auto">
            <img src={user?.photoURL} alt="User Avatar" />
          </div>
        </div>

        {/* User Info Form */}
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full mb-3">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("displayName")}
              placeholder="Your Name"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control w-full mb-3">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              value={user?.email}
              readOnly
              className="input border w-full "
            />
          </div>

          <div className="form-control w-full mb-3">
            <label className="label">
              <span className="label-text">Profile Picture</span>
            </label>
            <input
              type="file"
              {...register("photo")}
              className="file-input file-input-bordered w-full"
            />
          </div>

          {/* Affiliated Companies */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2 text-center">
              Affiliated Companies
            </h3>
            {companies.length === 0 && (
              <p className="text-sm text-center opacity-60">
                No company affiliations found
              </p>
            )}
            <div className="flex flex-wrap justify-center gap-2">
              {companies.map((c) => (
                <span
                  key={c.companyName}
                  className="bg-primary/20 text-primary text-sm px-3 py-1 rounded-full"
                >
                  {c.companyName}
                </span>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-3 mt-6 justify-center">
            <button
              type="submit"
              className="btn btn-primary w-full md:w-auto"
              disabled={uploading}
            >
              {uploading ? "Updating..." : "Update Profile"}
            </button>
            <button
              type="button"
              className="btn btn-primary w-full md:w-auto"
              onClick={handleLogOut}
            >
              Logout
            </button>
            <Link
              to="/forget-password"
              className="btn btn-accent w-full md:w-auto text-white"
            >
              Forget Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
