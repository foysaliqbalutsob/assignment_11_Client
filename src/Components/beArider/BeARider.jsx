import React from "react";
import { useForm } from "react-hook-form";
import agent from '../../assets/banner/agent-pending.png'
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAuth from "../../Hooks/useauth";

const BeARider = () => {
  const axiosSecure = useAxios();
  const navigate = useNavigate();
  const {user} = useAuth();
  console.log(user.email)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const districts = [
    "Dhaka", "Chattogram", "Sylhet", "Rajshahi",
    "Khulna", "Barishal", "Rangpur", "Mymensingh",
  ];

  const onSubmit = (data) => {
    console.log(data);
    axiosSecure.post('/riders', data)
      .then(res => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            title: "Application Submitted!",
            text: "We will review your information and notify you soon.",
            icon: "success",
            confirmButtonColor: "#6CC51D",
          }).then(() => {
            reset();
            navigate('/'); // home e pathay dilam, iccha moto change koro
          });
        }
      })
      .catch(() => {
        Swal.fire({
          title: "Submission Failed!",
          text: "Please try again later.",
          icon: "error",
          confirmButtonColor: "#d33",
        });
      });
  };

  return (
    <div className="max-w-6xl mx-auto bg-white mt-10 rounded-2xl shadow-sm grid grid-cols-1 md:grid-cols-2 overflow-hidden">

      {/* Left Form Section */}
      <div className="p-8 md:p-12">
        <h2 className="text-3xl font-bold text-[#02402F]">Be a Rider</h2>
        <p className="text-gray-600 mt-2 mb-6">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Name */}
          <div>
            <label className="label">Your Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input input-bordered w-full"
              placeholder="Your Name"
            />
            {errors.name && <p className="text-red-500 text-sm">Required</p>}
          </div>

          {/* Age */}
          <div>
            <label className="label">Your Age</label>
            <input
              type="number"
              {...register("age", { required: true, min: 18 })}
              className="input input-bordered w-full"
              placeholder="Your Age"
            />
            {errors.age && <p className="text-red-500 text-sm">Must be 18+</p>}
          </div>

          {/* Email */}
          <div>
            <label className="label">Your Email</label>
            <input
              type="email" defaultValue={user.email} readOnly
              {...register("email", { required: true })}
              className="input input-bordered w-full"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500 text-sm">Required</p>}
          </div>

          {/* District */}
          <div>
            <label className="label">Your District</label>
            <select
              {...register("district", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select District</option>
              {districts.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
            {errors.district && <p className="text-red-500 text-sm">Required</p>}
          </div>

          {/* NID */}
          <div>
            <label className="label">NID No</label>
            <input
              type="text"
              {...register("nid", { required: true })}
              className="input input-bordered w-full"
              placeholder="NID"
            />
            {errors.nid && <p className="text-red-500 text-sm">Required</p>}
          </div>

          {/* Contact */}
          <div>
            <label className="label">Contact</label>
            <input
              type="text"
              {...register("contact", { required: true })}
              className="input input-bordered w-full"
              placeholder="Phone Number"
            />
            {errors.contact && <p className="text-red-500 text-sm">Required</p>}
          </div>

          {/* Bike Registration */}
          <div>
            <label className="label">Bike Registration Number</label>
            <input
              type="text"
              {...register("bikeReg", { required: true })}
              className="input input-bordered w-full"
              placeholder="Dhaka-XX-9999"
            />
            {errors.bikeReg && <p className="text-red-500 text-sm">Required</p>}
          </div>

          {/* License */}
          <div>
            <label className="label">Driving License No</label>
            <input
              type="text"
              {...register("licenseNo", { required: true })}
              className="input input-bordered w-full"
              placeholder="License Number"
            />
            {errors.licenseNo && <p className="text-red-500 text-sm">Required</p>}
          </div>

          {/* Bike Type */}
          <div>
            <label className="label">Bike Type</label>
            <select
              {...register("bikeType", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Type</option>
              <option>Scooter</option>
              <option>Motorbike</option>
              <option>Electric Bike</option>
            </select>
            {errors.bikeType && <p className="text-red-500 text-sm">Required</p>}
          </div>

          {/* Warehouse */}
          <div className="md:col-span-2">
            <label className="label">Warehouse Location</label>
            <select
              {...register("warehouse", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select warehouse</option>
              <option>Dhaka-1</option>
              <option>Dhaka-2</option>
              <option>Chattogram-1</option>
            </select>
            {errors.warehouse && <p className="text-red-500 text-sm">Required</p>}
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <button className="btn w-full bg-[#C8EB65] border-none hover:bg-[#b4d957]">
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Right Image Section */}
      <div className="w-full h-full">
        <img
          src={agent}
          alt="Be a Rider"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default BeARider;
