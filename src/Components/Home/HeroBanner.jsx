import React from "react";
import { motion } from "framer-motion";
import heroImg from "../../../src/assets/banner/Faq.jpg"; 

const HeroBanner = () => {
  return (
    <section className="relative bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center py-16 lg:py-24">
        
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.h1 
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Empower Your Business
          </motion.h1>

          <motion.p
            className="text-lg text-gray-700 mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Streamline operations, manage employees, and track assets effortlessly with our platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <a 
              href="#get-started"
              className="btn btn-primary px-6 py-3 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl transition"
            >
              Get Started
            </a>
          </motion.div>
        </div>

        {/* Image */}
        <motion.div 
          className="flex-1 mt-10 lg:mt-0 lg:ml-12"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img src={heroImg} alt="Corporate Banner" className="w-full rounded-xl shadow-lg"/>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBanner;
