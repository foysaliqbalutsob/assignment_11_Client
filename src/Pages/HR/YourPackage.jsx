import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useauth";

const YourPackage = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Your Packages</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead className="border">
            <tr>
              <th>#</th>
              <th>Package</th>
              <th>Employees</th>
              <th>Amount ($)</th>
              <th>Status</th>
              <th>Transaction</th>
              <th>Tracking ID</th>
              <th>Date</th>
            </tr>
          </thead>
         
          <tbody>
            {payments.map((pay, index) => (
              <tr key={pay._id}>
                <td>{index + 1}</td>
                <td className="font-semibold">{pay.packageName}</td>
                <td>{pay.employeeLimit}</td>
                <td>{pay.amount}</td>
                <td>
                  <span
                    className={`badge ${
                      pay.status === "paid"
                        ? "badge-success p-4"
                        : "badge-warning"
                    }`}
                  >
                    {pay.status}
                  </span>
                </td>
                <td className="font-mono text-xs">
                  {pay.transactionId || ""}
                </td>
                <td className="font-mono text-xs">
                  {pay.trackingId || "—"}
                </td>
                <td>
                  {new Date(pay.paymentDate).toLocaleDateString()}
                </td>
              </tr>
            ))}

            {payments.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-6">
                  No payments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default YourPackage;
