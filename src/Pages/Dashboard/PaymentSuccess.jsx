import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxios from '../../Hooks/useAxios';



const PaymentSuccess = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const[paymentInfo, setPaymentInfo]= useState(null);
    const sessionId= searchParams.get('session_id')
    console.log(sessionId);
    const axiosSecure = useAxios();

useEffect(() => {
  if (sessionId) {
    axiosSecure
      .patch(`/payment-success?session_id=${sessionId}`)
      .then((res) => {
        console.log("Success Response:", res.data);
        setPaymentInfo(res.data.paymentInfo); 
      })
      .catch((err) => {
        console.error("Payment Update Error:", err);
      });
  }
}, [sessionId]);

   
    



    return (
        <div>
            <h2 className='text-3xl font-bold text-center mt-20'>Payment Successful!</h2>
            <p className='text-center mt-4'>Thank you for your payment. Your transaction has been completed successfully.</p>

            <div>
            {paymentInfo && (
                <div className='text-center mt-6'>
                    <p className='text-lg'>Transaction ID: <span className='font-mono font-bold'>{paymentInfo.transactionId}</span></p> 
                    <p className='text-lg mt-2'>Tracking ID: <span className='font-mono font-bold'>{paymentInfo.trackingId}</span></p>
                </div>
            )}



            </div>
        </div>
    );
};

export default PaymentSuccess;