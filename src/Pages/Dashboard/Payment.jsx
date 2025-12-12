import React from "react";
import { useParams } from "react-router";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading/Loading";

const Payment = () => {
  const { parcelId } = useParams();
  console.log(parcelId);
  const axiosSecure = useAxios();

  const { isLoading, data: parcel } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      console.log(res.data);
      return res.data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }





const handlePayment = async () =>{
    const paymentInfo = {
        cost: parcel.cost,
        parcelId:parcel._id,
        senderEmail :  parcel.senderEmail,
        parcelName : parcel. parcelName



    }
const res =await axiosSecure.post('/create-checkout-session', paymentInfo);
console.log(res.data);
window.location.href = res.data.url;

}






  return (
    <div>
      <p>pay : {parcel.parcelName}</p>
      <p>please pay: {parcel.cost} </p>
      <button 
      onClick={ handlePayment} className="btn btn-primary text-black">
        pay

      </button>
    </div>
  );
};

export default Payment;
