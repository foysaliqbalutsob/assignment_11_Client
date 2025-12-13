import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useauth";
import Swal from "sweetalert2";

const Package = () => {
  const axiosSecure = useAxios();
  const {user} = useAuth()

  const { data: packagesData = [], refetch } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/packages"); 
      return res.data;
    },
  });




//   payment

//   const handlePayment = async (selectedPackage) =>{
//     console.log(selectedPackage);
//     const paymentInfo = {
//     email: user?.email,
//     cost: selectedPackage.price,      
//     packageId: selectedPackage._id,    
//     packageName: selectedPackage.name

//     }
//     console.log(paymentInfo);
// const res = await axiosSecure.post('/payment-create-checkout-session',paymentInfo);
// console.log(res.data.url)
// window.location.assign(res.data.url);

//   }







const handlePayment = async (selectedPackage) => {
  const paymentInfo = {
    email: user?.email,
    cost: selectedPackage.price,
    packageId: selectedPackage._id,
    packageName: selectedPackage.name,
    employeeLimit: selectedPackage.employeeLimit
  };
  console.log(paymentInfo);

  try {
    const res = await axiosSecure.post('/payment-create-checkout-session', paymentInfo);
    
    window.location.assign(res.data.url);
  } catch (err) {
    console.error(err);
    alert("Payment initiation failed");
  }
};



// end

  return (
    <div className="my-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Our Packages</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {packagesData.map((pkg) => (
          <div
            key={pkg.name}
            className="border rounded-lg shadow p-6 flex flex-col justify-between hover:scale-105 transition-transform"
          >
            <h3 className="text-2xl font-semibold mb-4 text-center">{pkg.name}</h3>
            <p className="text-center mb-4">
              Employee Limit: <span className="font-bold">{pkg.employeeLimit}</span>
            </p>
            <p className="text-center text-xl font-bold mb-4">${pkg.price}/month</p>
            <ul className="mb-4 list-disc list-inside space-y-1">
              {pkg.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
            <button
            onClick={()=> handlePayment(pkg)}
             className="btn btn-primary w-full mt-auto">Choose {pkg.name}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Package;
