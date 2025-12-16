import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useauth";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";

const AddAsset = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxios();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  
  const imageAPI = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_HOST_NAME}`;

  const onSubmit = async (data) => {
    if (!import.meta.env.VITE_HOST_NAME) return Swal.fire("Error", "IMGBB key missing", "error");

    try {
      setIsLoading(true);

      
      const formData = new FormData();
      formData.append("image", data.productImage[0]);

      const res = await fetch(imageAPI, { method: "POST", body: formData });
      const imgData = await res.json();

      if (!imgData.success) {
        return Swal.fire("Error", "Image upload failed", "error");
      }

      
      const asset = {
        productName: data.productName,
        productImage: imgData.data.display_url,
        productType: data.productType,
        productQuantity: parseInt(data.productQuantity),
        availableQuantity: parseInt(data.productQuantity),
        dateAdded: new Date(),
        hrEmail: user.email,
        companyName: data.companyName,
      };

      
      const result = await axiosSecure.post("/assets", asset);

      if (result.data.insertedId) {
        Swal.fire("Success", "Asset added successfully", "success");
        reset();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-16">
      <div className="w-full max-w-3xl px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Add New Asset</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card bg-base-100 shadow-xl p-8 space-y-4"
        >
          {/* Product Name */}
          <div>
            <label className="label">Product Name</label>
            <input
              type="text"
              placeholder="Asset name"
              className="input w-full border"
              {...register("productName", { required: true })}
            />
            {errors.productName && (
              <p className="text-error text-sm">Product name required</p>
            )}
          </div>

          {/* Company Name */}
          <div>
            <label className="label">Company Name</label>
            <input
              type="text"
              placeholder="Company name"
              className="input w-full border"
              {...register("companyName", { required: true })}
            />
            {errors.companyName && (
              <p className="text-error text-sm">Company name required</p>
            )}
          </div>

          {/* Product Quantity */}
          <div>
            <label className="label">Product Quantity</label>
            <input
              type="number"
              min="1"
              className="input w-full border"
              {...register("productQuantity", { required: true })}
            />
            {errors.productQuantity && (
              <p className="text-error text-sm">Quantity required</p>
            )}
          </div>

          {/* Product Type */}
          <div>
            <label className="label">Product Type</label>
            <select
              className="select border w-full"
              {...register("productType", { required: true })}
            >
              <option value="">Select Type</option>
              <option value="Returnable">Returnable</option>
              <option value="Non-returnable">Non-returnable</option>
            </select>
            {errors.productType && (
              <p className="text-error text-sm">Type required</p>
            )}
          </div>

          {/* Product Image */}
          <div>
            <label className="label">Product Image</label>
            <input
              type="file"
              accept="image/*"
              className="file-input border file-input-bordered w-full"
              {...register("productImage", { required: true })}
            />
            {errors.productImage && (
              <p className="text-error text-sm">Image required</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary border-none text-white w-full mt-4"
            disabled={isLoading}
          >
            {isLoading ? (
    <span className="loading loading-bars loading-sm"></span>
  ) : (
    "Add Asset"
  )}
            
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAsset;
