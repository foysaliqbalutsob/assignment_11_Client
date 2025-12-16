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



          {/* ============ MOBILE CARD VIEW ============ */}
      <div className="md:hidden space-y-4">
        {payments.length === 0 && (
          <p className="text-center py-6">No payments found</p>
        )}
        {payments.map((pay, index) => (
          <div
            key={pay._id}
            className="card bg-base-100 shadow-md p-4 border rounded-lg"
          >
            <p>
              <span className="font-semibold">#</span> {index + 1}
            </p>
            <p>
              <span className="font-semibold">Package:</span> {pay.packageName}
            </p>
            <p>
              <span className="font-semibold">Employees:</span> {pay.employeeLimit}
            </p>
            <p>
              <span className="font-semibold">Amount ($):</span> {pay.amount}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`badge ${
                  pay.status === "paid" ? "badge-success" : "badge-warning"
                }`}
              >
                {pay.status}
              </span>
            </p>
            <p>
              <span className="font-semibold">Transaction ID:</span>{" "}
              <span className="font-mono text-xs">{pay.transactionId || "—"}</span>
            </p>
            <p>
              <span className="font-semibold">Tracking ID:</span>{" "}
              <span className="font-mono text-xs">{pay.trackingId || "—"}</span>
            </p>
            <p>
              <span className="font-semibold">Date:</span>{" "}
              {new Date(pay.paymentDate).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      <div className="hidden md:block overflow-x-auto bg-base-100 shadow rounded-lg">
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
