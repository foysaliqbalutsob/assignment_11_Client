// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxios from "../../Hooks/useAxios";
// import useAuth from "../../Hooks/useauth";
// import useUserRole from "../../Hooks/useUserRole";
// import Loading from "../../Components/Loading/Loading";
// import Swal from "sweetalert2";

// const EmployeeList = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxios();
//   const { userData, refetch: refetchUserRole } = useUserRole();
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
// const [assets, setAssets] = useState([]);
// const [loadingAssets, setLoadingAssets] = useState(false);


//   // Fetch assigned assets
//   const { data: employeeAssets = [], isLoading, refetch } = useQuery({
//     queryKey: ["employeeAssets", user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/assigned-assets/hr/${user.email}`);
//       console.log(employeeAssets)
//       return res.data;
//     },
//   });

//   if (isLoading) return <Loading />;

//   // Group assets by employee
//   const employeeMap = {};
//   employeeAssets.forEach((asset) => {
//     if (!employeeMap[asset.requesterEmail]) {
//       employeeMap[asset.requesterEmail] = {
//         name: asset.requesterName,
//         email: asset.requesterEmail,
//         photo: asset.assetImage,
//         joinDate: asset.approvalDate,
//         assetsCount: 1,
//       };
//     } else {
//       employeeMap[asset.requesterEmail].assetsCount += 1;
//     }
//   });

//   const employees = Object.values(employeeMap);






//   const handleAssignAsset = async (employee) => {
//   setSelectedEmployee(employee);
//   setLoadingAssets(true);

//   try {
//     const res = await axiosSecure.get("/assetsEmail");
//     setAssets(res.data);
//     document.getElementById("assign_modal").showModal();
//   } catch (err) {
//     Swal.fire("Error", "Failed to load assets", "error");
//   } finally {
//     setLoadingAssets(false);
//   }
// };









// const handleConfirmAssign = async (asset) => {
//   try {
//     const assignData = {
//       assetId: asset._id,
//       assetName: asset.productName,
//       assetImage: asset.productImage,
//       assetType: asset.productType,

//       employeeEmail: selectedEmployee.email,
//       employeeName: selectedEmployee.name,
//       employeeDateOfBirth: selectedEmployee.dateOfBirth,

//       hrEmail: user.email,
//       companyName: asset.companyName,

//       productQuantity: asset.productQuantity,
//       availableQuantity: asset.availableQuantity,
//     };

//     await axiosSecure.post("/assigned-assets", assignData);

//     Swal.fire("Success", "Asset assigned successfully", "success");
//     document.getElementById("assign_modal").close();


    









//     refetch();
//     refetchUserRole(); // employee list refresh
//   } catch (err) {
//     Swal.fire("Error", "Failed to assign asset", "error");
//   }
// };















//   // Remove employee handler
//  const handleRemove = async (employee) => {
//   console.log(employee)
//   const confirm = await Swal.fire({
//     title: `Remove ${employee.name}?`,
//     text: "This employee will be removed from the team",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonText: "Yes, Remove",
//     cancelButtonText: "Cancel",
//   });

//   if (!confirm.isConfirmed) return;

//   try {
//     await axiosSecure.delete(
//       `/assigned-assets/remove/${employee.email}`
//     );

//     Swal.fire("Removed!", "Employee removed successfully", "success");
//     refetch();
//     refetchUserRole();
//   } catch (err) {
//     Swal.fire("Error!", "Failed to remove employee", "error");
//   }
// };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">My Employees</h2>

//       {/* X/Y employees used */}
//       <p className="mb-6 text-sm opacity-70">
//   Employees used:{" "}
//   <span className="font-semibold">
//     {employees.length}
//   </span>
  
// </p>


//       {/* Mobile view */}
//       <div className="md:hidden space-y-4">
//         {employees.length === 0 && (
//           <p className="text-center py-6">No employees found</p>
//         )}

//         {employees.map((emp) => (
//           <div key={emp.email} className="card bg-base-100 shadow-md p-4 border rounded-lg">
//             <div className="flex items-center gap-3 mb-2">
//               {emp.photo ? (
//                 <img src={emp.photo} alt={emp.name} className="w-10 h-10 rounded-full" />
//               ) : (
//                 <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
//                   {emp.name?.charAt(0).toUpperCase()}
//                 </div>
//               )}
//               <div>
//                 <div className="font-bold">{emp.name}</div>
//                 <div className="text-sm opacity-50">{emp.email}</div>
//               </div>
//             </div>
//             <p>Join Date: {emp.joinDate ? new Date(emp.joinDate).toLocaleDateString() : "-"}</p>
//             <p>Assets Count: {emp.assetsCount}</p>
//             <button
//   onClick={() => handleAssignAsset(emp)}
//   className="btn btn-primary btn-xs"
// >
//   Assign
// </button>

//             <button
//               className="btn btn-error btn-xs mt-2"
//               onClick={() => handleRemove(emp)}
//             >
//               Remove from Team
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Desktop view */}
//       <div className="hidden md:block overflow-x-auto bg-base-100 shadow rounded-lg">
//         <table className="table table-zebra w-full">
//           <thead>
//             <tr>
//               <th>Photo</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Join Date</th>
//               <th>Assign</th>
//               <th>Assets Count</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {employees.length === 0 && (
//               <tr>
//                 <td colSpan="6" className="text-center py-6">
//                   No employees found
//                 </td>
//               </tr>
//             )}

//             {employees.map((emp) => (
//               <tr key={emp.email}>
//                 <td>
//                   {emp.photo ? (
//                     <img src={emp.photo} alt={emp.name} className="w-10 h-10 rounded-full" />
//                   ) : (
//                     <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
//                       {emp.name?.charAt(0).toUpperCase()}
//                     </div>
//                   )}
//                 </td>
//                 <td>{emp.name}</td>
//                 <td>{emp.email}</td>
//                 <td>{emp.joinDate ? new Date(emp.joinDate).toLocaleDateString() : "-"}</td>
//                 <th>
//                  <button
//   onClick={() => handleAssignAsset(emp)}
//   className="btn btn-primary btn-xs"
// >
//   Assign
// </button>

//                 </th>
//                 <td>{emp.assetsCount}</td>
//                 <td>
//                   <button
//                     className="btn btn-error btn-xs"
//                     onClick={() => handleRemove(emp)}
//                   >
//                     Remove
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>


// <dialog id="assign_modal" className="modal modal-bottom sm:modal-middle">
//   <div className="modal-box max-w-3xl">
//     <h3 className="font-bold text-lg mb-4">
//       Assign Asset to {selectedEmployee?.name}
//     </h3>

//     {loadingAssets ? (
//       <Loading />
//     ) : assets.length === 0 ? (
//       <p>No assets available</p>
//     ) : (
//       <div className="space-y-3 max-h-96 overflow-y-auto">
//         {assets.map((asset) => (
//           <div
//             key={asset._id}
//             className="flex items-center gap-4 border p-3 rounded-lg"
//           >
//             <img
//               src={asset.productImage}
//               className="w-12 h-12 rounded"
//               alt=""
//             />

//             <div className="flex-1">
//               <p className="font-semibold">{asset.productName}</p>
//               <p className="text-sm opacity-60">
//                 {asset.productType} | Available: {asset.availableQuantity}
//               </p>
//             </div>

//             <button
//               disabled={asset.availableQuantity <= 0}
//               onClick={() => handleConfirmAssign(asset)}
//               className="btn btn-success btn-xs"
//             >
//               Assign
//             </button>
//           </div>
//         ))}
//       </div>
//     )}

//     <div className="modal-action">
//       <form method="dialog">
//         <button className="btn">Close</button>
//       </form>
//     </div>
//   </div>
// </dialog>












//     </div>
//   );
// };

// export default EmployeeList;



import React, { useState } from "react";
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
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [assets, setAssets] = useState([]);
  const [loadingAssets, setLoadingAssets] = useState(false);

  // Fetch only approved assets assigned to employees
  const { data: employeeAssets = [], isLoading, refetch } = useQuery({
    queryKey: ["employeeAssets", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/assigned-assets/hr/${user.email}`);
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

  // Assign asset modal
  const handleAssignAsset = async (employee) => {
    setSelectedEmployee(employee);
    setLoadingAssets(true);
    try {
      const res = await axiosSecure.get("/assetsEmail");
      setAssets(res.data);
      document.getElementById("assign_modal").showModal();
    } catch (err) {
      Swal.fire("Error", "Failed to load assets", "error");
    } finally {
      setLoadingAssets(false);
    }
  };

  // Confirm assign
  const handleConfirmAssign = async (asset) => {
    try {
      const assignData = {
        assetId: asset._id,
        assetName: asset.productName,
        assetImage: asset.productImage,
        assetType: asset.productType,
        employeeEmail: selectedEmployee.email,
        employeeName: selectedEmployee.name,
        employeeDateOfBirth: selectedEmployee.dateOfBirth,
        hrEmail: user.email,
        companyName: asset.companyName,
        productQuantity: asset.productQuantity,
        availableQuantity: asset.availableQuantity,
      };

      await axiosSecure.post("/assigned-assets", assignData);
      Swal.fire("Success", "Asset assigned successfully", "success");
      document.getElementById("assign_modal").close();
      refetch();
      refetchUserRole();
    } catch (err) {
      Swal.fire("Error", "Failed to assign asset", "error");
    }
  };

  // Remove employee
  const handleRemove = async (employee) => {
    const confirm = await Swal.fire({
      title: `Remove ${employee.name}?`,
      text: "This employee will be removed from the team",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Remove",
      cancelButtonText: "Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.delete(`/assigned-assets/remove/${employee.email}`);
      Swal.fire("Removed!", "Employee removed successfully", "success");
      refetch();
      refetchUserRole();
    } catch (err) {
      Swal.fire("Error!", "Failed to remove employee", "error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Employees</h2>
      <p className="mb-6 text-sm opacity-70">
        Employees used: <span className="font-semibold">{employees.length}</span>
      </p>

      <div className="md:hidden space-y-4">
        {employees.length === 0 && <p className="text-center py-6">No employees found</p>}
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
            <button onClick={() => handleAssignAsset(emp)} className="btn btn-primary btn-xs">
              Assign
            </button>
            <button className="btn btn-error btn-xs mt-2" onClick={() => handleRemove(emp)}>
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
              <th>Assign</th>
              <th>Assets Count</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6">No employees found</td>
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
                <td>
                  <button onClick={() => handleAssignAsset(emp)} className="btn btn-primary btn-xs">
                    Assign
                  </button>
                </td>
                <td>{emp.assetsCount}</td>
                <td>
                  <button className="btn btn-error btn-xs" onClick={() => handleRemove(emp)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Assign Modal */}
      <dialog id="assign_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-3xl">
          <h3 className="font-bold text-lg mb-4">
            Assign Asset to {selectedEmployee?.name}
          </h3>
          {loadingAssets ? (
            <Loading />
          ) : assets.length === 0 ? (
            <p>No assets available</p>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {assets.map((asset) => (
                <div key={asset._id} className="flex items-center gap-4 border p-3 rounded-lg">
                  <img src={asset.productImage} className="w-12 h-12 rounded" alt="" />
                  <div className="flex-1">
                    <p className="font-semibold">{asset.productName}</p>
                    <p className="text-sm opacity-60">{asset.productType} | Available: {asset.availableQuantity}</p>
                  </div>
                  <button
                    disabled={asset.availableQuantity <= 0}
                    onClick={() => handleConfirmAssign(asset)}
                    className="btn btn-success btn-xs"
                  >
                    Assign
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default EmployeeList;
