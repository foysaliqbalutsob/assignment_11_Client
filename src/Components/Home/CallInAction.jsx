import React from "react";

const CallInAction = () => {
  return (
    <section className="py-16 bg-gray-50 text-gray-900 text-center">
      <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
      <p className="mb-6 text-gray-700">
        Have questions or need help? Contact our support team today!
      </p>
      <a
        href="mailto:foysal@example.com"
        className="inline-block border border-gray-800 text-gray-800 font-semibold py-3 px-8 rounded-lg
                   transition-transform transform hover:-translate-y-1 hover:scale-105 hover:bg-gray-800 hover:text-white shadow-md hover:shadow-lg"
      >
        Contact Us
      </a>
    </section>
  );
};

export default CallInAction;
