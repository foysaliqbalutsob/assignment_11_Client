import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useauth";
import Swal from "sweetalert2";
import Loading from "../../Components/Loading/Loading";
import useUserRole from "../../Hooks/useUserRole";

const RequestAsset = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const { userData } = useUserRole();

  const [selectedAsset, setSelectedAsset] = useState(null);
  const [note, setNote] = useState("");
  const [page, setPage] = useState(1);
  const limit = 6;

 
  const { data, isLoading } = useQuery({
    queryKey: ["assets", page, limit],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assets?page=${page}&limit=${limit}`);
      return res.data;
    },
  });

  const assets = Array.isArray(data?.assets) ? data.assets : [];
  const totalPages = data?.totalPages || 1;


  const { data: myRequests = [], refetch } = useQuery({
    queryKey: ["myRequests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/asset-requests/user/${user.email}`
      );
      return res.data;
    },
  });


  const getButtonText = (assetId) => {
    const req = myRequests.find((r) => r.assetId === assetId);

    if (!req) return "Request";

    if (req.requestStatus === "pending") return "Pending";
    if (req.requestStatus === "rejected")
      return "rejected - request again";

    if (req.requestStatus === "approved") {
      if (req.assetType === "Returnable") {
        return `Accepted (Return by ${new Date(
          req.returnDeadline
        ).toLocaleDateString()})`;
      }
      return "accepted (Non-returnable)";
    }

    return "Request";
  };


  const isDisabled = (asset) => {
    const req = myRequests.find((r) => r.assetId === asset._id);

    if (!req) return asset.availableQuantity === 0;

    if (req.requestStatus === "pending") return true;
    if (req.requestStatus === "approved") return true;

    return false; 
  };

  
  const openModal = (asset) => {
    setSelectedAsset(asset);
    document.getElementById("request_modal").showModal();
  };

  
  const submitRequest = async () => {
    if (!note.trim()) {
      Swal.fire("Error", "write a note", "error");
      return;
    }

    try {
      await axiosSecure.post("/asset-requests", {
        assetId: selectedAsset._id,
        assetName: selectedAsset.productName,
        assetImage: selectedAsset.productImage,
        assetType: selectedAsset.productType,
        productQuantity: selectedAsset.productQuantity,
        availableQuantity: selectedAsset.availableQuantity,
        requesterName: user.displayName,
        requesterEmail: user.email,
        requesterBirthOfDate: userData?.dateOfBirth || null,
        hrEmail: selectedAsset.hrEmail,
        companyName: selectedAsset.companyName,
        requestStatus: "pending",
        note,
      });

      Swal.fire("Success", "Request submitted", "success");
      setNote("");
      setSelectedAsset(null);
      refetch();
      document.getElementById("request_modal").close();
    } catch (err) {
      Swal.fire("Error", "Request failed", "error");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Request Asset</h2>

     
      <div className="md:hidden space-y-4">
        {assets.map((asset) => {
          const disabled = isDisabled(asset);

          return (
            <div
              key={asset._id}
              className="card bg-base-100 shadow p-4 border rounded-lg"
            >
              <div className="flex gap-3">
                <img
                  src={asset.productImage}
                  className="w-12 h-12 rounded"
                />
                <div>
                  <p className="font-bold">{asset.productName}</p>
                  <p className="text-sm opacity-60">
                    {asset.productType}
                  </p>
                </div>
              </div>

              <p className="mt-2">
                <b>Available:</b> {asset.availableQuantity}
              </p>

              <button
                disabled={disabled}
                className={`btn btn-sm mt-3 w-full ${
                  disabled ? "btn-disabled" : "btn-primary"
                }`}
                onClick={() => openModal(asset)}
              >
                {getButtonText(asset._id)}
              </button>
            </div>
          );
        })}
      </div>

    
      <div className="hidden md:block overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Asset</th>
              <th>Company</th>
              <th>Type</th>
              <th>Available</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset, index) => {
              const disabled = isDisabled(asset);

              return (
                <tr key={asset._id}>
                  <td>{index + 1}</td>
                  <td className="flex gap-3">
                    <img
                      src={asset.productImage}
                      className="w-10 h-10 rounded"
                    />
                    <div>
                      <p className="font-bold">{asset.productName}</p>
                      <p className="text-xs opacity-60">
                        {asset.productType}
                      </p>
                    </div>
                  </td>
                  <td>{asset.companyName}</td>
                  <td>{asset.productType}</td>
                  <td>{asset.availableQuantity}</td>
                  <td>
                    <button
                      disabled={disabled}
                      className={`btn btn-sm ${
                        disabled
                          ? "btn-disabled"
                          : "btn-primary"
                      }`}
                      onClick={() => openModal(asset)}
                    >
                      {getButtonText(asset._id)}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      
      <div className="flex justify-center gap-2 mt-6">
        <button
          className="btn btn-secondary btn-sm"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        {[...Array(totalPages).keys()].map((i) => (
          <button
            key={i}
            className={`btn  btn-sm ${
              page === i + 1 ? "btn-primary" : " btn-secondary"
            }`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="btn btn-secondary btn-sm"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

     
      <dialog id="request_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Request Asset</h3>

          <textarea
            className="textarea textarea-bordered w-full mt-4"
            placeholder="Write note..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <div className="modal-action">
            <button className="btn btn-primary" onClick={submitRequest}>
              Submit
            </button>
            <form method="dialog">
              <button className="btn btn-secondary">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default RequestAsset;
