import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useauth";
import useUserRole from "../../Hooks/useUserRole";
import Loading from "../../Components/Loading/Loading";
import Swal from "sweetalert2";

const EmployeeList = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const { userData, refetch: refetchUserRole } = useUserRole();

  // Fetch assigned assets
  const { data: employeeAssets = [], isLoading, refetch } = useQuery({
    queryKey: ["employeeAssets", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/assigned-assets/hr/${user.email}`);
      console.log(employeeAssets)
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  // Group assets by employee
  const employeeMap = {};
  employeeAssets.forEach((asset) => {
    if (!employeeMap[asset.requesterEmail]) {
      employeeMap[asset.requesterEmail] = {
        name: asset.requesterName,
        email: asset.requesterEmail,
        photo: asset.assetImage,
        joinDate: asset.approvalDate,
        assetsCount: 1,
      };
    } else {
      employeeMap[asset.requesterEmail].assetsCount += 1;
    }
  });

  const employees = Object.values(employeeMap);

  // Remove employee handler
  const handleRemove = async (employee) => {
    console.log(employee)

    const {} = useQuery({

    })
     



    const confirm = await Swal.fire({
      title: "Remove employee from team?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Remove",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.delete(`/assigned-assets/remove/${email}`);
      Swal.fire("Removed!", "Employee has been removed.", "success");
      refetch(); 
      refetchUserRole();
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to remove employee.", "error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Employees</h2>

      {/* X/Y employees used */}
      <p className="mb-6">
        Employees used: {userData?.currentEmployees }
      </p>

      {/* Mobile view */}
      <div className="md:hidden space-y-4">
        {employees.length === 0 && (
          <p className="text-center py-6">No employees found</p>
        )}

        {employees.map((emp) => (
          <div key={emp.email} className="card bg-base-100 shadow-md p-4 border rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              {emp.photo ? (
                <img src={emp.photo} alt={emp.name} className="w-10 h-10 rounded-full" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                  {emp.name?.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <div className="font-bold">{emp.name}</div>
                <div className="text-sm opacity-50">{emp.email}</div>
              </div>
            </div>
            <p>Join Date: {emp.joinDate ? new Date(emp.joinDate).toLocaleDateString() : "-"}</p>
            <p>Assets Count: {emp.assetsCount}</p>
            <button
              className="btn btn-error btn-xs mt-2"
              onClick={() => handleRemove(emp.email)}
            >
              Remove from Team
            </button>
          </div>
        ))}
      </div>

      {/* Desktop view */}
      <div className="hidden md:block overflow-x-auto bg-base-100 shadow rounded-lg">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Join Date</th>
              <th>Assets Count</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6">
                  No employees found
                </td>
              </tr>
            )}

            {employees.map((emp) => (
              <tr key={emp.email}>
                <td>
                  {emp.photo ? (
                    <img src={emp.photo} alt={emp.name} className="w-10 h-10 rounded-full" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                      {emp.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.joinDate ? new Date(emp.joinDate).toLocaleDateString() : "-"}</td>
                <td>{emp.assetsCount}</td>
                <td>
                  <button
                    className="btn btn-error btn-xs"
                    onClick={() => handleRemove(emp)}
                  >
                    Remove
                  </button>
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
