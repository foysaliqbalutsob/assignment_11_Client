import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import useAxios from "../../../Hooks/useAxios";
import Swal from "sweetalert2";

const AsssignRiders = () => {
    const [selectedParcel, setSelectedParcel] = useState(null)
  const axiosSecure = useAxios();
  const riderModalRef = useRef();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", "pending-peakUp"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels?deliveryStatus=pending-peakUp");
      return res.data;
    },
  });

//   console.log(parcels);

// const {data :riders =[],} = useQuery({
//     queryKey: ['riders' ,parcels.senderDistrict, 'available'],
//     enabled: !!selectedParcel,
//     queryFn: async () =>{
//         const res =await axiosSecure.get('/riders?status=available&district = ${senderDistrict}&workStatus=available');
//         return res.data
//     }
// })

// tode invalided query
 const { data: riders = [] } = useQuery({
    queryKey: ["riders", selectedParcel?.receiverDistrict, "available"],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?status=approved&district=${selectedParcel.receiverDistrict}&workStatus=available`
      );
      return res.data;
    },
  });
  console.log(riders)



    useEffect(() => {
    if (selectedParcel) {
      console.log("Selected parcel updated:", selectedParcel);
    }
  }, [selectedParcel]);






  const getStatusColor = (status) => {
    switch (status) {
      case "pending-peakUp":
        return "bg-yellow-200 text-yellow-800";
      case "assigned":
        return "bg-blue-200 text-blue-800";
      case "delivered":
        return "bg-green-200 text-green-800";
      case "cancelled":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const OpenAssignRiderModal = (parcel) => {
    setSelectedParcel(parcel)
    if (riderModalRef.current) {
      riderModalRef.current.showModal();
     
      console.log("Assigning Rider for parcel:", parcel);
      
    }
    console.log('selectedParcel',selectedParcel)
  };







  const handleAssignRider = async (rider) => {
  try {
    const riderAssignInfo = {
      riderId: rider._id,
      RiderEmail: rider.email, // match backend
      riderContact: rider.contact,
      riderName: rider.name,
      parcelId: selectedParcel._id,
    };

    const res = await axiosSecure.patch(`/parcels/${selectedParcel._id}`, riderAssignInfo);
    if (res.data.modifiedCount > 0 || res.data.success) { // based on backend response
      riderModalRef.current.close();
      refetch();
      Swal.fire("Success", "Rider assigned successfully!", "success");
    } else {
      Swal.fire("Error", "Failed to assign rider", "error");
    }
  } catch (error) {
    console.error(error);
    Swal.fire("Error", "Something went wrong!", "error");
  }
};











  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Assign Riders : {parcels.length}
      </h1>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="table-auto w-full border-collapse">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Sender Name</th>
              <th className="p-3 text-left">Parcel Name</th>
              <th className="p-3 text-left">Cost</th>
              <th className="p-3 text-left">Pickup District</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
              <th className="p-3 text-left">Created At</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel, index) => (
              <tr
                key={parcel._id}
                className="border-b hover:bg-gray-100 transition-all"
              >
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{parcel.senderName}</td>
                <td className="p-3">{parcel.parcelName}</td>
                <td className="p-3">{parcel.cost} ৳</td>
                <td className="p-3">{parcel.receiverDistrict}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                      parcel.deliveryStatus
                    )}`}
                  >
                    {parcel.deliveryStatus}
                  </span>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => OpenAssignRiderModal(parcel)}
                    className="btn btn-primary text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                  >
                    Assign Rider
                  </button>
                </td>
                <td className="p-3">
                  {new Date(parcel.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* modal */}

      <dialog ref={riderModalRef} className="modal modal-bottom sm:modal-middle">
  <div className="modal-box w-full max-w-2xl">
    <h3 className="font-bold text-lg mb-4">
      Assign Rider for: {selectedParcel?.parcelName || ""}
    </h3>

    {riders.length > 0 ? (
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 text-left">#</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              
              <th className="p-2 text-left">Contact</th>
              <th className="p-2 text-left">District</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id} className="border-b hover:bg-gray-100">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{rider.name}</td>
                <td className="p-2">{rider.email}</td>
                
                <td className="p-2">{rider.contact}</td>
                <td className="p-2">{rider.district}</td>
                <td className="p-2">
  <button
    onClick={() => handleAssignRider(rider)}
    className="btn btn-primary btn-sm"
  >
    Assign
  </button>
</td>
              </tr>
              
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <p className="py-4 text-gray-500">No riders available for this district.</p>
    )}

    <div className="modal-action mt-4">
      <form method="dialog">
        <button className="btn btn-sm">Close</button>
      </form>
    </div>
  </div>
</dialog>

      



      {/* modal end */}
    </div>
  );
};

export default AsssignRiders;
