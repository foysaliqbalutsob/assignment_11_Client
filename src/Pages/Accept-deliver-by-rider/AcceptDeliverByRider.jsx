import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import Loading from "../../Components/Loading/Loading";
import Swal from "sweetalert2";

const AcceptDeliverByRider = () => {
  const axiosSecure = useAxios();

  // Fetch parcels assigned to this rider
  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["rider-parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels?deliveryStatus=assigned");
      return res.data;
    },
  });

  // Accept Delivery Button
  const handleAccept = async (id) => {
    try {
      const res = await axiosSecure.patch(`/parcels/rider-accept/${id}`, {
        deliveryStatus: "picked",
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Delivery Accepted!",
          timer: 1500,
          showConfirmButton: false,
        });

        refetch();
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
      });
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Accept Delivery</h2>

      {parcels.length === 0 ? (
        <p className="text-center text-lg font-semibold text-gray-500">
          No parcels assigned yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-base-300">
              <tr>
                <th>#</th>
                <th>Receiver</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Parcel Type</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {parcels.map((parcel, index) => (
                <tr key={parcel._id}>
                  <td>{index + 1}</td>
                  <td>{parcel.receiverName}</td>
                  <td>{parcel.receiverPhone}</td>
                  <td>{parcel.deliveryAddress}</td>
                  <td>{parcel.parcelType}</td>
                  <td>{parcel.price}৳</td>
                  <td className="font-bold text-blue-600">
                    {parcel.deliveryStatus}
                  </td>

                  <td>
                    <button
                      onClick={() => handleAccept(parcel._id)}
                      className="btn btn-sm btn-primary"
                    >
                      Accept
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AcceptDeliverByRider;
