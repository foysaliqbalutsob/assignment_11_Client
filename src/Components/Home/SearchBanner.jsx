import React from "react";
import { FaLaptop, FaChair, FaKeyboard, FaQuestionCircle, FaUserShield, FaSearch } from "react-icons/fa";

const SearchBanner = () => {
  const sections = [
    {
      title: "Asset Tracking",
      desc: "Monitor which employee has which equipment, never lose track of valuable assets.",
      icon: <FaLaptop className="text-primary text-4xl" />
    },
    {
      title: "Check-in & Check-out",
      desc: "Easily assign assets to employees and track returns seamlessly.",
      icon: <FaChair className="text-primary text-4xl" />
    },
    {
      title: "Inventory Management",
      desc: "Manage asset types, quantities, and conditions in one central system.",
      icon: <FaKeyboard className="text-primary text-4xl" />
    },
    {
      title: "Reports & Analytics",
      desc: "Get insights on asset usage, losses, and employee allocations.",
      icon: <FaQuestionCircle className="text-primary text-4xl" />
    },
    {
      title: "Security & Permissions",
      desc: "Control who can assign, edit, or access asset details.",
      icon: <FaUserShield className="text-primary text-4xl" />
    },
    {
      title: "Support",
      desc: "Find answers to common issues and questions quickly.",
      icon: <FaSearch className="text-primary text-4xl" />
    },
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Welcome to AssetVerse
        </h1>
        <p className="mb-8 text-gray-600">
          Efficiently manage your company's physical assets and track assignments.
        </p>
        <div className="mb-12">
          <input
            type="text"
            placeholder="Search for help or FAQs..."
            className="input input-bordered w-full max-w-xl mx-auto rounded-full shadow-lg"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <div className="mb-4">{section.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{section.title}</h3>
              <p className="text-gray-500">{section.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBanner;
