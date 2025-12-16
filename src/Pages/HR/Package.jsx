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
      console.log(res.data) 
      return res.data;
    },
  });












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
    <div className="my-10   px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Our Packages</h2>
      <div className="grid  gap-6 md:grid-cols-3">
        {packagesData.map((pkg) => (
          

          <div className="card   bg-base-100 shadow-sm">
  <div className="card-body">
    <span className="badge badge-xs badge-warning">Most Popular</span>
    <div className="flex justify-between">
      <h2 className="text-3xl font-bold">{pkg.name} </h2>
      <span className="text-xl">${pkg.price}/mo</span>
    </div>
    <ul className="mt-6 flex flex-col gap-2 text-xs">
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
        <span>{pkg.features[0]}</span>
      </li>
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
        <span>{pkg.features[1]}</span>
      </li>
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
        <span>{pkg.features[2]}</span>
      </li>
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
        <span>AI-driven image enhancements</span>
      </li>
      <li className="opacity-50">
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
        <span className="line-through">Seamless cloud integration</span>
      </li>
      <li className="opacity-50">
        <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
        <span className="line-through">Real-time collaboration tools</span>
      </li>
    </ul>
    <div className="mt-6">
                <button
           onClick={()=> handlePayment(pkg)}
          className="btn btn-primary w-full mt-auto">Choose {pkg.name}</button>
    </div>
  </div>
</div>
        ))}
      </div>
    </div>
  );
};

export default Package;
