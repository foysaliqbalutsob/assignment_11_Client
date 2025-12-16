import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdAssignmentAdd } from "react-icons/md";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const AssetList = () => {
  const axiosSecure = useAxios();
  const [selectedAsset, setSelectedAsset] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const { data: assets = [], isLoading, isError,refetch } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/assetsEmail"); 
      return res.data;
    },
  });

const handleEdit = (asset) => {
  setSelectedAsset(asset);

  reset({
    productName: asset.productName,
    productQuantity: asset.productQuantity,
    availableQuantity: asset.availableQuantity,
    productType: asset.productType,
    companyName: asset.companyName,
  });

  document.getElementById("edit_modal").showModal();
};



const onSubmit = async (data) => {
  try {
    const res = await axiosSecure.patch(
      `/assets/${selectedAsset._id}`,
      data
    );

    if (res.data.modifiedCount > 0) {
      Swal.fire("Updated!", "Asset updated successfully", "success");
      refetch();
      document.getElementById("edit_modal").close();
    }
  } catch (err) {
    console.error(err);
    Swal.fire("Error", "Failed to update asset", "error");
  }
};










const handleDelete = async (asset) => {
  Swal.fire({
    title: "Are you sure?",
    text: `You won't be able to revert deleting "${asset.productName}"!`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/assets/${asset._id}`);

        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Asset has been deleted successfully.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });

          refetch(); 
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: "Error!",
          text: "Failed to delete asset.",
          icon: "error",
        });
      }
    }
  });
};
















  if (isLoading)
    return <p className="text-center py-8 font-semibold">Loading assets...</p>;
  if (isError)
    return <p className="text-center py-8 text-red-500">Failed to load assets</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Asset List</h2>
      <div className="overflow-x-auto">


        {/* ================= MOBILE CARD VIEW ================= */}
      <div className="md:hidden space-y-4">
        {assets.length === 0 && (
          <p className="text-center py-6">No assets found</p>
        )}

        {assets.map((asset) => (
          <div
            key={asset._id}
            className="card bg-base-100 shadow-md p-4 border rounded-lg"
          >
            <div className="flex items-center gap-3">
              <img
                src={asset.productImage}
                alt={asset.productName}
                className="w-12 h-12 rounded"
              />
              <div>
                <h3 className="font-bold">{asset.productName}</h3>
                <p className="text-sm text-gray-500">{asset.productType}</p>
              </div>
            </div>

            <div className="text-sm mt-2 space-y-1">
              <p>
                <span className="font-semibold">Company:</span>{" "}
                {asset.companyName}
              </p>
              <p>
                <span className="font-semibold">Quantity:</span>{" "}
                {asset.productQuantity}
              </p>
              <p className="text-xs text-gray-400">
                Added:{" "}
                {new Date(asset.createdAt || asset.dateAdded).toLocaleDateString()}
              </p>
              <div>
               
                  <span className="badge badge-info badge-sm">Assign  <MdAssignmentAdd /></span>
                
              </div>


            </div>


            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleEdit(asset)}
                className="btn btn-primary btn-xs flex-1"
              >
                <FiEdit /> Edit
              </button>
              <button
                onClick={() => handleDelete(asset)}
                className="btn btn-error btn-xs flex-1"
              >
                <RiDeleteBin6Line /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>




 <div className="hidden md:block overflow-x-auto">

        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Asset</th>
              <th>Company</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Added On</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {assets.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6">
                  No assets found
                </td>
              </tr>
            )}
            {assets.map((asset, index) => (
              <tr key={asset._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={asset.productImage} alt={asset.productName} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{asset.productName}</div>
                      <div className="text-sm opacity-50">{asset.productType}</div>
                    </div>
                  </div>
                </td>
                <td>{asset.companyName}</td>
                <td>{asset.productQuantity}</td>
                <td>
                  <span className="badge badge-info badge-sm">Assign  <MdAssignmentAdd /></span>
                </td>
                <td>{new Date(asset.createdAt || asset.dateAdded).toLocaleDateString()}</td>
                <td>
                  <button onClick={()=>handleEdit(asset)} className="btn btn-primary btn-xs mr-2" > <FiEdit />Edit</button>
                  <button onClick={()=>handleDelete(asset)} className="btn btn-error btn-xs text-white"> <RiDeleteBin6Line />Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        
      </div>



<dialog id="edit_modal" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg mb-4">Edit Asset</h3>

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
     <label className="label">productName</label>

      <input
        {...register("productName")}
        className="input border w-full"
        placeholder="Product Name"
      />
      <label className="label">productQuantity</label>

      <input
        type="number"
        {...register("productQuantity")}
        className="input border w-full"
        placeholder="Total Quantity"
      />
<label className="label">availableQuantity</label>
      <input
        type="number"
        {...register("availableQuantity")}
        className="input border w-full"
        placeholder="Available Quantity"
      />
<label className="label">productType</label>
      <select
        {...register("productType")}
        className="select border w-full"
      >
        <option value="Returnable">Returnable</option>
        <option value="Non-returnable">Non-returnable</option>
      </select>
<label className="label">companyName</label>
      <input
        {...register("companyName")}
        className="input border w-full"
        placeholder="Company Name"
      />

      <div className="modal-action">
        <button type="submit" className="btn btn-primary">
          Update
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => document.getElementById("edit_modal").close()}
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</dialog>




     

    </div>
  );
};

export default AssetList;
