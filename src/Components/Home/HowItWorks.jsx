
import React from "react";

const HowItWork = () => {
  const steps = [
    {
      title: "Step 1: Sign Up",
      description: "Create an account using your email and start your journey."
    },
    {
      title: "Step 2: Request Assets",
      description: "Browse company assets and submit requests easily."
    },
    {
      title: "Step 3: Track & Manage",
      description: "Check your request status and manage your profile."
    },
  ];

  return (
    <section className="py-16 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold mb-10">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <div key={index} className="p-6 bg-white shadow rounded-lg">
            <div className="text-xl font-bold text-primary mb-2">{step.title}</div>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWork;
