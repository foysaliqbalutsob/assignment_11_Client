import React from "react";
import { Link } from "react-router";

const PaymentCancel = () => {
  return (
    <div className="mb-10">
      <h2 className="text-3xl font-bold text-center mt-20">Payment Canceled</h2>
      <p className="text-center mt-4">
        Your payment has been canceled. If you have any questions, please
        contact support.
      </p>
      <div className="text-center" >
        <button className="btn btn-primary m-4 ">
            <Link to='/'>back</Link>
        </button>
      </div>
    </div>
  );
};

export default PaymentCancel;
