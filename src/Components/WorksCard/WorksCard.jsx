import React from "react";
import { Truck } from "lucide-react"; 
import { CiDeliveryTruck } from "react-icons/ci";

const features = [
  {
    title: "Booking Pick & Drop",
    text: "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    title: "Cash On Delivery",
    text: "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    title: "Delivery Hub",
    text: "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    title: "Booking SME & Corporate",
    text: "From personal packages to business shipments — we deliver on time, every time.",
  },
];

const WorksCard = () => {
  return (
    <div className="bg-[#eef1f2] py-12 px-5">
      <h2 className="text-3xl font-semibold mb-10 text-gray-800">
        How it Works
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <CiDeliveryTruck size={80} />

            <h3 className="text-lg font-semibold text-[#0f3d3e] mb-2">
              {item.title}
            </h3>

            <p className="text-gray-600 text-sm leading-relaxed">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorksCard;

