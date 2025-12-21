import React from "react";
import Loading from "../Loading/Loading";
import Package from "../../Pages/HR/Package";
import HeroBanner from "./HeroBanner";
import Faq from "./Faq";
import SearchBanner from "./SearchBanner";
import AboutSection from "./AboutSection";

import Review from "./Reviews/Review";
import Band from "../Swiper/Band";
import HrRechart from "../../Pages/HR/HrRechart";
import HowItWork from "./HowItWorks";
import CallInAction from "./CallInAction";

const Home = () => {
  return (
    <div>
      <HeroBanner></HeroBanner>
      <AboutSection></AboutSection>
      <Package></Package>

      {/* features showcase */}
      <SearchBanner></SearchBanner>

      <div>
       
        <Review></Review>

      </div>
      <HowItWork></HowItWork>
      <Faq></Faq>
      <CallInAction></CallInAction>
      <div className="bg-#F9FAFB" >
       
       
        <h2 className="text-4xl bg-#F9FAFB font-extrabold text-gray-800 mb-16 text-center">
          Meet Our Sponsor
        </h2>
      </div>
      <Band></Band>
      
    </div>
  );
};

export default Home;
