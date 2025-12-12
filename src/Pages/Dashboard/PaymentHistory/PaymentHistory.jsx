import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../Hooks/useauth';
import useAxios from '../../../Hooks/useAxios';

const PaymentHistory = () => {
  const axiosSecure = useAxios();
  const { user, } = useAuth();
  console.log(user.email)

  const { data: payments = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["payment", user?.email],  // key must include email
    
    queryFn: async () => {
  const token = await user.getIdToken();
  const res = await axiosSecure.get(`/payments?email=${user.email}`, {
    headers: { authorization: `Bearer ${token}` }
  });
  return res.data;
},
  });

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (isError) {
    return <p className="text-center mt-10 text-red-500">Failed to load payments!</p>;
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-center mb-5">Payment History</h2>

      <div className="overflow-x-auto">
        <table className="table w-full text-center">
          <thead>
            <tr>
              <th>SL</th>
              <th>Transaction ID</th>
              <th>Tracking ID</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((pay, index) => (
              <tr key={pay._id}>
                <td>{index + 1}</td>
                <td>{pay.transactionId}</td>
                <td>{pay.trackingId}</td>
                <td>${pay.amount / 100}</td>
                <td>{new Date(pay.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;