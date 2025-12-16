import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import useAxios from "../../Hooks/useAxios";

const PaymentSuccess = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState(null);
  const sessionId = searchParams?.get("session_id")||null;
  
  const axiosSecure = useAxios();

  useEffect(() => {
    if (!sessionId)
      return; 
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
         
          setPaymentInfo(res?.data?.paymentInfo || null);
        
        })
        .catch((err) => {
          console.error("Payment Update Error:", err);
        });
    
  }, [sessionId, axiosSecure]);
  // console.log(paymentInfo);

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mt-20">
        Payment Successful!
      </h2>
      <p className="text-center mt-4">
        Thank you for your payment. Your transaction has been completed
        successfully.
      </p>

      <div>
        {paymentInfo && (
          <div className="text-center mt-6">
            <p className="text-lg">
              Transaction ID:{" "}
              <span className="font-mono font-bold">
                {paymentInfo.transactionId}
              </span>
            </p>
            <p className="text-lg mt-2">
              Tracking ID:{" "}
              <span className="font-mono font-bold">
                {paymentInfo.trackingId}
              </span>
            </p>
          </div>
        )}
      </div>
      <Link to="/your-package">
        <button className="btn btn-primary mt-10 block mx-auto">
          Go to DashBoard
        </button>
      </Link>
    </div>
  );
};

export default PaymentSuccess;









