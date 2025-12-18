import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useauth";
import Loading from "../../Components/Loading/Loading";

const EmployeeList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  // fetch assigned assets
  const { data: employeeAssets = [], isLoading } = useQuery({
    queryKey: ["employeeAssets", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/assigned-assets/hr/${user.email}`);
      
      return res.data;
      
    },
  });
 

  if (isLoading) return <Loading />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Employee Asset List</h2>
      <p className="mb-10">Total employees: {employeeAssets.length}</p>

      
      <div className="md:hidden space-y-4">
        {employeeAssets.length === 0 && (
          <p className="text-center py-6">No records found</p>
        )}

        {employeeAssets.map((a) => (
          <div
            key={a._id}
            className="card bg-base-100 shadow-md p-4 border rounded-lg"
          >
            {/* Employee */}
            <p>
              <span className="font-semibold">Employee:</span> {a.requesterName}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {a.requesterEmail}

              
            </p>

            {/* Asset */}
            <div className="flex items-center gap-2 mt-1">
              {a.assetImage && (
                <img
                  src={a.assetImage}
                  alt={a.assetName}
                  className="w-10 h-10 rounded"
                />
              )}
              <span className="font-semibold">{a.assetName}</span>
            </div>

            <p>
              <span className="font-semibold">Type:</span> {a.assetType}
            </p>
            <p>
              <span className="font-semibold">Company:</span> {a.companyName}
            </p>
            <p>
              <span className="font-semibold">Requested:</span>{" "}
              {a.requestDate ? new Date(a.requestDate).toLocaleDateString() : "-"}
            </p>
            <p>
              <span className="font-semibold">Approved:</span>{" "}
              {a.approvalDate ? new Date(a.approvalDate).toLocaleDateString() : "-"}
            </p>
            <p>
              <span className="font-semibold">Return Deadline:</span>{" "}
              {a.returnDeadline ? new Date(a.returnDeadline).toLocaleDateString() : "-"}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`badge ${
                  a.requestStatus === "approved"
                    ? "badge-success"
                    : a.requestStatus === "returned"
                    ? "badge-info"
                    : "badge-warning"
                }`}
              >
                {a.requestStatus}
              </span>
            </p>
          </div>
        ))}
      </div>

  <div className="hidden md:block overflow-x-auto bg-base-100 shadow rounded-lg">


      
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Email</th>
              <th>Asset</th>
              <th>Type</th>
              <th>Company</th>
              <th>Requested</th>
              <th>Approved</th>
              <th>Return Deadline</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {employeeAssets.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center py-6">
                  No records found
                </td>
              </tr>
            )}

            {employeeAssets.map((a) => (
              <tr key={a._id}>
                <td>{a.requesterName}</td>
                <td>{a.requesterEmail}</td>
                <td className="flex items-center gap-2">
                  {a.assetImage && (
                    <img
                      src={a.assetImage}
                      alt={a.assetName}
                      className="w-10 h-10 rounded"
                    />
                  )}
                  <span className="font-semibold">{a.assetName}</span>
                </td>
                <td>{a.assetType}</td>
                <td>{a.companyName}</td>
                <td>
                  {a.requestDate
                    ? new Date(a.requestDate).toLocaleDateString()
                    : "-"}
                </td>
                <td>
                  {a.approvalDate
                    ? new Date(a.approvalDate).toLocaleDateString()
                    : "-"}
                </td>
                <td>
                  {a.returnDeadline
                    ? new Date(a.returnDeadline).toLocaleDateString()
                    : "-"}
                </td>
                <td>
                  <span
                    className={`badge ${
                      a.requestStatus === "approved"
                        ? "badge-success"
                        : a.requestStatus === "returned"
                        ? "badge-info"
                        : "badge-warning"
                    }`}
                  >
                    {a.requestStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
