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
  const [search, setSearch] = useState("");

  const {
    data: assets = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/assetsEmail");
      return res.data;
    },
  });

  // 🔍 FRONTEND SEARCH FILTER
  const filteredAssets = assets.filter((asset) =>
    asset.productName.toLowerCase().includes(search.toLowerCase()) ||
    asset.companyName.toLowerCase().includes(search.toLowerCase()) ||
    asset.productType.toLowerCase().includes(search.toLowerCase())
  );

  // ✏️ Edit
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

  // ✅ Update
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
    } catch {
      Swal.fire("Error", "Failed to update asset", "error");
    }
  };

  // 🗑️ Delete
  const handleDelete = async (asset) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete "${asset.productName}" permanently?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/assets/${asset._id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Asset removed", "success");
          refetch();
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

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search by name, company or type..."
        className="input input-bordered mb-4 max-w-sm"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      
      <div className="md:hidden space-y-4">
        {filteredAssets.length === 0 && (
          <p className="text-center py-6">No assets found</p>
        )}

        {filteredAssets.map((asset) => (
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
              <p><b>Company:</b> {asset.companyName}</p>
              <p><b>Quantity:</b> {asset.productQuantity}</p>
              <p className="text-xs text-gray-400">
                Added: {new Date(asset.createdAt).toLocaleDateString()}
              </p>
              <span className="badge badge-info badge-sm">
                Assign <MdAssignmentAdd />
              </span>
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
              <th>Added</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6">
                  No assets found
                </td>
              </tr>
            )}

            {filteredAssets.map((asset, index) => (
              <tr key={asset._id}>
                <th>{index + 1}</th>
                <td className="flex items-center gap-3">
                  <img
                    src={asset.productImage}
                    className="w-10 h-10 rounded"
                  />
                  <div>
                    <p className="font-bold">{asset.productName}</p>
                    <p className="text-sm opacity-60">{asset.productType}</p>
                  </div>
                </td>
                <td>{asset.companyName}</td>
                <td>{asset.productQuantity}</td>
                <td>
                  <span className="badge badge-info badge-sm">
                    Assign <MdAssignmentAdd />
                  </span>
                </td>
                <td>{new Date(asset.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => handleEdit(asset)}
                    className="btn btn-primary btn-xs mr-2"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(asset)}
                    className="btn btn-error btn-xs"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
      <dialog id="edit_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Edit Asset</h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <input {...register("productName")} className="input w-full" />
            <input type="number" {...register("productQuantity")} className="input w-full" />
            <input type="number" {...register("availableQuantity")} className="input w-full" />

            <select {...register("productType")} className="select w-full">
              <option value="Returnable">Returnable</option>
              <option value="Non-returnable">Non-returnable</option>
            </select>

            <input {...register("companyName")} className="input w-full" />

            <div className="modal-action">
              <button type="submit" className="btn btn-primary">Update</button>
              <button
                type="button"
                className="btn btn-secondary"
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
