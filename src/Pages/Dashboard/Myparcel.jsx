import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../Hooks/useauth";
import useAxios from "../../Hooks/useAxios";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Link } from "react-router";


const MyParcel = () => {
  const { user } = useAuth();
  console.log(user?.email);

  const axiosSecure = useAxios();

  const { data: parcels = [],refetch

   } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);

      console.log(res);
      return res.data;
    },
  });


  const handleDelete = (id) => {
    console.log("deleting", id);

    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {

    axiosSecure.delete(`/parcels/${id}`)
    .then(res =>{
      console.log(res.data)

      if(res.data.deletedCount){
        refetch();
        Swal.fire(
          'Deleted!',
          'Your parcel has been deleted.',
          'success'
        )
      }
    })
    // Swal.fire({
    //   title: "Deleted!",
    //   text: "Your file has been deleted.",
    //   icon: "success"
    // });
  }
});




  }




  const handlePayment = async (parcel) =>{
    console.log(parcel);
    const paymentInfo = {
    cost: parcel.cost,
     parcelId : parcel._id,
     senderEmail :parcel.senderEmail,
     parcelName : parcel.parcelName

    }
const res = await axiosSecure.post('/payment-create-checkout-session',paymentInfo);
console.log(res.data.url)
window.location.assign(res.data.url);

  }


  return (
    <div>
      <h2>All of my parcel:{parcels.length} </h2>

      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Sl No</th>
                <th>Name</th>
                <th>Cost</th>
                <th>Payment </th>
                <th>Tracking Id</th>
                <th>Delivery status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, index) => (
                <tr key={parcel._id}>
                  <th>{index + 1}</th>
                  <td>{parcel.parcelName}</td>
                  <td>{parcel.cost}</td>
                  <td className=" ">

                   {
  parcel.paymentStatus === 'paid' ? (
    <span className="text-black font-semibold">Paid</span>)
    :  <button onClick={()=>handlePayment(parcel)} className="btn btn-primary btn-xs text-black font-semibold">Pay</button>
  // ) : (
  //   <Link to={`/dashboard/payment/${parcel._id}`}>
  //     <button className="btn btn-primary btn-xs text-black font-semibold">Pay</button>
  //   </Link>
  // )
}
                  </td>
                  <td>{parcel.trackingId}</td>
                  <td>{parcel.deliveryStatus}</td>
                  <td>
                    <button className="btn btn-xs hover:bg-primary">
                      <FaMagnifyingGlass />
                    </button>

                    <button 
                     className="btn btn-xs hover:bg-primary"
                     onClick={() => handleDelete(parcel._id)} >
                      <MdDelete />
                    </button>

                    <button className="btn btn-xs hover:bg-primary">
                      <CiEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyParcel;
