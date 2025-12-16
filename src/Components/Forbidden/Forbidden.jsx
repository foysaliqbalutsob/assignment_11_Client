import React from "react";
import animationData from "../../../src/assets/forbidden/forbidden403.json";
import Lottie from "lottie-react";
import { Link } from "react-router";


const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-center p-4">
      
      {/* Animation */}
      <div className="w-80 md:w-96">
        <Lottie animationData={animationData} loop={true} />
      </div>

      {/* Text Section */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-red-500 mt-4">
        403 — Forbidden!
      </h1>
      <p className="text-gray-600 mt-2 mb-6 max-w-md">
        You don’t have permission to access this page.
        Please contact admin or go back to home.
      </p>

      {/* Back Home Button */}
      <Link to={"/"}>
        <button className="btn btn-error text-white btn-wide">
          Go Back Home
        </button>
      </Link>
    </div>
  );
};

export default Forbidden;
