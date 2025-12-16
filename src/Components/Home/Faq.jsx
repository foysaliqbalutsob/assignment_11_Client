import React, { useState } from 'react';
import FaqImg from '../../assets/banner/Faq.jpg'
import { FaPlus, FaTimes } from 'react-icons/fa';

const Faq = () => {
  
  const faqs = [
    {
      question: "What does AssetVerse do?",
      answer: "Easily link every asset (laptops, chairs, tools) to the specific employee currently using it."
    },
    {
      question: "Does  AssetVerse do payroll?",
      answer: "Yes. AssetVerse has its own add-on payroll solution that allows data to flow automatically, reducing the risk of double entry and making payroll runs quick and easy. In addition to seamless data flow, payroll customers also enjoy comprehensive payroll reporting, superior customer support, and full-service tax filing. Learn more by visiting the product page on the BambooHR website."
    },
    {
      question: "How much does  AssetVerse cost?",
      answer: " AssetVerse pricing varies depending on the number of employees at your organization and the features you select. To get a free price quote, call 1-866-387-9595 or visit our pricing page."
    },
    {
      question: "How many countries is  AssetVerse in?",
      answer: "BambooHR serves customers in over 150 countries."
    },
    {
      question: "Is your support team outsourced?",
      answer: "No, our support team is entirely in-house to ensure you receive the best service possible."
    },
  ]; // Using only the first 5 for brevity and to match the count in the image visually

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    // Toggles the active index: null if already active, index if closed.
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
 
    <div className="min-h-screen pt-20 pb-20 px-4 flex justify-center bg-gray-50">
      <div className="max-w-6xl w-full">
        
       
        <h2 className="text-4xl font-extrabold text-gray-800 mb-16 text-center">
          Frequently Ask Questions
        </h2>

        
        <div className="flex flex-col lg:flex-row gap-16">
          
          
          <div className="lg:w-1/2 space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                // Styling to match the white, rounded, subtle shadow cards in the image
                className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 transform hover:shadow-md"
                style={{
                    // Adding a subtle purple gradient border/shadow effect from the image
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.5) inset',
                    background: 'linear-gradient(to right, #ffffff, #f9f9ff) border-box',
                }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center py-4 px-6 text-left text-base font-semibold text-gray-800 focus:outline-none"
                >
                  {/* NOTE: We are using the BambooHR question text here, but the visual template is applied */}
                  {faq.question}
                  
                  {/* Icon on the right side */}
                  <span className={`p-1 rounded-full text-black transition-transform duration-300 ${activeIndex === index ? 'rotate-45' : 'rotate-0'}`}>
                    {/* The image uses a simple plus sign that rotates into a cross (or times sign) */}
                    <FaPlus className="text-sm text-gray-800" />
                  </span>
                </button>
                <div
                  className={`px-6 text-gray-600 transition-all duration-500 overflow-hidden ${
                    
                    activeIndex === index ? "max-h-96 pb-4 pt-2" : "max-h-0"
                  } whitespace-pre-line text-sm`}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>

        
          <div className="lg:w-1/2 flex flex-col items-center justify-start pt-8 lg:pt-0">
            
         
            <div className="mb-6 border rounded-full   justify-center">
                <img className='rounded-full h-50'  src={FaqImg} alt="" />
            </div>
            
            <h3 className="text-3xl font-bold text-gray-800 mt-4 mb-2 text-center">
              Any Question?
            </h3>
            <p className="text-sm text-gray-500 mb-6 text-center">
              You can ask anything you want to know Feedback
            </p>

            {/* Input Form Section */}
            <div className="w-full max-w-sm">
                <label htmlFor="feedback-input" className="block text-sm text-gray-700 mb-1">
                    Let me know
                </label>
                <div className="relative">
                    <input
                        type="text"
                        id="feedback-input"
                        placeholder="Enter Here"
                        
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-gray-300 focus:border-gray-300 text-sm pr-10 shadow-inner"
                    />
                  
                    <button 
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-50 hover:text-gray-800"
                        title="Clear input"
                    >
                        <FaTimes className="text-xs text-black" />
                    </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;