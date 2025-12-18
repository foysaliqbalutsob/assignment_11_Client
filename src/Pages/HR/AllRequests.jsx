import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import Loading from "../../Components/Loading/Loading";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useauth";
import useUserRole from "../../Hooks/useUserRole";
import { Link, useNavigate } from "react-router";

const AllRequests = () => {
  const axiosSecure = useAxios();
  const {user} = useAuth();
  console.log(user.email);
  const {userData ,refetch: refetchUserRole} = useUserRole();
  console.log(userData.packageLimit);
  const packageLimit = userData.packageLimit;
  const navigate = useNavigate();


  const {
    data: allRequests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/asset-requests/by-hr");
      console.log(res.data);
      return res.data;
    },
  });




if (isLoading) return <Loading />;
 



  const handleApprove = async (req) => {
    console.log(req._id);


if (packageLimit === 0) {
  Swal.fire({
    icon: "warning",
    title: "Package Limit Reached",
    text: "Please upgrade your package",
  });
  navigate("/package");
  return ;
}








    const confirm = await Swal.fire({
      title: "Approve Request?",
      text: "Asset quantity will be deducted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Approve",
    });

    if (!confirm.isConfirmed) return;

    await axiosSecure.patch(`/asset-requests/${req._id}/approve`);

    
    Swal.fire("Approved", "Request approved successfully", "success");
   await refetch();
await refetchUserRole();
  };















  






  const handleReject = async (req) => {
    console.log(req._id);
    await axiosSecure.patch(`/asset-requests/${req._id}/reject`);
    Swal.fire("Rejected", "Request rejected", "info");
    refetch();
  };

  if (isLoading) return <Loading />;

  return (



      <div className="p-6">
    <h2 className="text-2xl font-bold mb-6">All Asset Requests</h2>
    <p>package limit: {packageLimit}</p>


    
      <div className="md:hidden space-y-4">
        {allRequests.length === 0 && (
          <p className="text-center py-6">No requests found</p>
        )}

        {allRequests.map((req, index) => (
          <div
            key={req._id}
            className="card bg-base-100 shadow-md p-4 border rounded-lg"
          >
            {/* Employee */}
            <div className="flex items-center gap-3 mb-2">
              <div className="avatar">
                <div className="mask mask-squircle h-10 w-10 bg-primary text-white flex items-center justify-center">
                  {req.requesterName?.charAt(0).toUpperCase()}
                </div>
              </div>
              <div>
                <div className="font-bold">{req.requesterName}</div>
                <div className="text-sm opacity-50">{req.requesterEmail}</div>
              </div>
            </div>

            {/* Asset */}
            <p>
              <span className="font-semibold">Asset:</span> {req.assetName}{" "}
              <span className="badge badge-ghost badge-sm ml-1">
                {req.assetType}
              </span>
            </p>

            {/* Company */}
            <p>
              <span className="font-semibold">Company:</span> {req.companyName}
            </p>

            {/* Date */}
            <p>
              <span className="font-semibold">Date:</span>{" "}
              {new Date(req.requestDate).toLocaleDateString()}
            </p>

            {/* Status */}
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`badge ${
                  req.requestStatus === "pending"
                    ? "badge-warning"
                    : req.requestStatus === "approved"
                    ? "badge-success"
                    : "badge-error"
                }`}
              >
                {req.requestStatus}
              </span>
            </p>

            {/* Actions */}
            {req.requestStatus === "pending" && (
              <div className="flex gap-2 mt-3">
                <button
                  className="btn btn-success btn-xs flex-1"
                  onClick={() => handleApprove(req)}
                >
                  Approve
                </button>
                <button
                  className="btn btn-error btn-xs flex-1"
                  onClick={() => handleReject(req)}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

















 <div className="hidden md:block overflow-x-auto bg-base-100 shadow rounded-lg">

    <div className="overflow-x-auto bg-base-100 shadow rounded-lg">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Employee</th>
            <th>Asset</th>
            <th>Company</th>
            <th>Date</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {allRequests.map((req, index) => (
            <tr key={req._id}>
              <th>{index + 1}</th>

              {/* Employee */}
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-10 w-10 bg-primary text-white flex items-center justify-center">
                      {req.requesterName?.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{req.requesterName}</div>
                    <div className="text-sm opacity-50">
                      {req.requesterEmail}
                    </div>
                  </div>
                </div>
              </td>

              {/* Asset */}
              <td>
                {req.assetName}
                <br />
                <span className="badge badge-ghost badge-sm">
                  {req.assetType}
                </span>
              </td>

              {/* Company */}
              <td>{req.companyName}</td>

              {/* Date */}
              <td>{new Date(req.requestDate).toLocaleDateString()}</td>


              {/* <td>{req.}</td> */}

              {/* Status */}
              <td>
                <span
                  className={`badge ${
                    req.requestStatus === "pending"
                      ? "badge-warning"
                      : req.requestStatus === "approved"
                      ? "badge-success"
                      : "badge-error"
                  }`}
                >
                  {req.requestStatus}
                </span>
              </td>

              {/* Actions */}
              <td>
                {req.requestStatus === "pending" ? (
                  <div className="flex gap-2">
                    <button
                      className="btn btn-xs btn-success"
                      onClick={() => handleApprove(req)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleReject(req)}
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <span className="text-xs opacity-60">No Action</span>
                )}
              </td>
            </tr>
          ))}

          {allRequests.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center py-6">
                No requests found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
  </div>
    



  );
};

export default AllRequests;
