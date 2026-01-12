// import React from "react";
// import Loading from "../Loading/Loading";
// import Package from "../../Pages/HR/Package";
// import HeroBanner from "./HeroBanner";
// import Faq from "./Faq";
// import SearchBanner from "./SearchBanner";
// import AboutSection from "./AboutSection";

// import Review from "./Reviews/Review";
// import Band from "../Swiper/Band";
// import HrRechart from "../../Pages/HR/HrRechart";
// import HowItWork from "./HowItWorks";
// import CallInAction from "./CallInAction";

// const Home = () => {
//   return (
//     <div>
//       <HeroBanner></HeroBanner>
//       <AboutSection></AboutSection>
//       <Package></Package>

//       {/* features showcase */}
//       <SearchBanner></SearchBanner>

//       <div>
       
//         <Review></Review>

//       </div>
//       <HowItWork></HowItWork>
//       <Faq></Faq>
//       <CallInAction></CallInAction>
//       <div className="bg-#F9FAFB" >
       
       
//         <h2 className="text-4xl bg-#F9FAFB font-extrabold text-gray-800 mb-16 text-center">
//           Meet Our Sponsor
//         </h2>
//       </div>
//       <Band></Band>
      
//     </div>
//   );
// };

// export default Home;
import React, { useEffect } from "react";
// AOS ইম্পোর্ট করুন স্ক্রল অ্যানিমেশনের জন্য
import AOS from 'aos';
import 'aos/dist/aos.css'; 

import Loading from "../Loading/Loading";
import Package from "../../Pages/HR/Package"; // নিশ্চিত করুন এই পাথটি সঠিক
import HeroBanner from "./HeroBanner";
import Faq from "./Faq";
import SearchBanner from "./SearchBanner";
import AboutSection from "./AboutSection";
import Review from "./Reviews/Review";
import Band from "../Swiper/Band";
import HowItWork from "./HowItWorks";
import CallInAction from "./CallInAction";
import Articles from "../Article/Articles";

const Home = () => {
  // স্ক্রল অ্যানিমেশন চালু করার জন্য useEffect
useEffect(() => {
    AOS.init({
      duration: 2000, // অ্যানিমেশন ১ সেকেন্ড ধরে চলবে
      once: false,
      mirror: true,    // স্ক্রল করলে বারবার নিচ থেকে আসবে
      offset: 200,    // স্ক্রিন থেকে কতটুকু দূরত্বে থাকতে অ্যানিমেশন শুরু হবে
    });
  }, []);

  return (
    <div className="overflow-x-hidden  w-full min-h-screen "> {/* সাইড স্ক্রল আটকানোর জন্য */}
      
      <div data-aos="fade-down">
        <HeroBanner />
      </div>

      <div data-aos="fade-up">
        <AboutSection />
      </div>

      {/* এরর এড়াতে চেক করে নিচ্ছি Package কম্পোনেন্ট আছে কি না */}
      <div data-aos="fade-right">
        {Package ? <Package /> : <Loading />}
      </div>

      <div data-aos="zoom-in">
        <SearchBanner />
      </div>

      <div data-aos="fade-up">
        <Review />
      </div>

      <div data-aos="flip-up">
        <HowItWork />
      </div>

      <div data-aos="fade-up">
        <Faq />
      </div>

      
      <div data-aos="fade-up">
        <Articles></Articles>
      </div>
      



      <div data-aos="zoom-out">
        <CallInAction />
      </div>

      {/* bg-#F9FAFB কে বদলে bg-[#F9FAFB] করা হয়েছে */}
      <div className="bg-[#F9FAFB] py-10" data-aos="fade-up">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-16 text-center">
          Meet Our Sponsor
        </h2>
      </div>

      <div data-aos="fade-in">
        <Band />
      </div>
      
    </div>
  );
};

export default Home;

