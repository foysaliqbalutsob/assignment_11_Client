import React from "react";
import icon from "../../assets/banner/service.png"; 

const services = [
  {
    title: "Express & Standard Delivery",
    text: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
  },
  {
    title: "Nationwide Delivery",
    text: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    highlight: true,
  },
  {
    title: "Fulfillment Solution",
    text: "We also offer customized service with inventory management support, online order processing, packaging, and after-sales support.",
  },
  {
    title: "Cash on Home Delivery",
    text: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
  },
  {
    title: "Corporate Service / Contract in Logistics",
    text: "Customized corporate services which include warehouse and inventory management support.",
  },
  {
    title: "Parcel Return",
    text: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
  },
];

const OurServices = () => {
  return (
    <div className="bg-[#03363D] rounded-3xl py-16 px-6 lg:px-20 text-center text-white">
      <h2 className="text-3xl font-semibold mb-3">Our Services</h2>
      <p className="text-gray-300 max-w-2xl mx-auto mb-12">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to
        business shipments — we deliver on time, every time.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((s, i) => (
          <div
            key={i}
            className={`rounded-2xl p-8 shadow-md transition ${
              s.highlight
                ? "bg-[#C7F064] text-[#03363D]"
                : "bg-white text-[#03363D]"
            }`}
          >
            <div className="flex justify-center mb-5">
              <img src={icon} alt="" className="w-16 h-16" />
            </div>

            <h3 className="text-lg font-semibold mb-3">{s.title}</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurServices;
