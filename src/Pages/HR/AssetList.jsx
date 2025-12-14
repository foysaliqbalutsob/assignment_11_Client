import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";

const AssetList = () => {
  const axiosSecure = useAxios();

  const { data: assets = [], isLoading, isError } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/assetsEmail"); // email path বা query পাঠানোর দরকার নেই
      return res.data;
    },
  });

  if (isLoading)
    return <p className="text-center py-8 font-semibold">Loading assets...</p>;
  if (isError)
    return <p className="text-center py-8 text-red-500">Failed to load assets</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Asset List</h2>
      <div className="overflow-x-auto">
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
                  <span className="badge badge-info badge-sm">Not Requested</span>
                </td>
                <td>{new Date(asset.createdAt || asset.dateAdded).toLocaleDateString()}</td>
                <td>
                  <button className="btn btn-ghost btn-xs mr-2">Edit</button>
                  <button className="btn btn-error btn-xs text-white">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetList;
