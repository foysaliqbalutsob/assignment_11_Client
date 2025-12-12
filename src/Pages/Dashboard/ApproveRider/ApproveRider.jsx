import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxios from "../../../Hooks/useAxios";
import Swal from "sweetalert2";
import { FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";


const ApproveRider = () => {
  const axiosSecure = useAxios();
  

  const {
    data: riders = [],
    refetch
  } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  // Common text hidden class for smaller devices
  const btnTextClass = "hidden md:inline";

  // 🔹 Approval Handler
  const handleApproval = async (rider) => {
    const id = rider._id;
    console.log(id,rider.email)
    const res = await axiosSecure.patch(`/riders/${id}`, {
      status: "approved",
      email:rider.email
    });

    if (res.data.success) {
      Swal.fire({
        icon: "success",
        title: "Approved!",
        timer: 1200,
        showConfirmButton: false,
      });
      refetch();
    }
  };

  // 🔹 Rejection Handler
  const handleRejection = async (rider) => {
    const id = rider._id;
    const res = await axiosSecure.patch(`/riders/${id}`, {
      status: "rejected",
    });

    if (res.data.success) {
      Swal.fire({
        icon: "error",
        title: "Removed!",
        timer: 1200,
        showConfirmButton: false,
      });
      refetch();
    }
  };

  // 🔹 Delete Rider (Full Remove)
  const handleDelete = async (id) => {
    console.log(id)
    const confirm = await Swal.fire({
      title: "Delete permanently?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.delete(`/riders/${id}`);

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          timer: 1200,
          showConfirmButton: false,
        });
        refetch();
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="font-bold text-xl mb-4">
        Approve Rider List: {riders.length}
      </h2>

      <div className="overflow-x-auto border rounded-lg">
        <table className="table w-full">
          <thead className="bg-gray-200 text-gray-800 font-semibold">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>District</th>
              <th>Bike Type</th>
              <th>Application Status</th>
              <th>Working Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id} className="hover:bg-gray-100">
                <td>{index + 1}</td>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.district}</td>
                <td>{rider.bikeType}</td>
                <td>
                  <span className="badge badge-warning">
                    {rider.status}
                  </span>
                </td>
                <td>{rider.workStatus}</td>
                <td>
                  <div className="flex flex-wrap gap-2">

                    {/* Approve */}
                    <button 
                      onClick={() => handleApproval(rider)}
                      className="btn  btn-sm btn-success flex items-center gap-1"
                    >
                      <FaUserCheck className="text-white" />
                      <span className={btnTextClass}>Approve</span>
                    </button>

                    {/* Reject */}
                    <button
                      onClick={() => handleRejection(rider)}
                      className="btn btn-sm btn-error flex items-center gap-1"
                    >
                      <IoPersonRemoveSharp className="text-white" />
                      <span className={btnTextClass}>Remove</span>
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(rider._id)}
                      className="btn btn-sm btn-warning flex items-center gap-1"
                    >
                      <MdDeleteForever className="text-white" />
                      <span className={btnTextClass}>Delete</span>
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default ApproveRider;
