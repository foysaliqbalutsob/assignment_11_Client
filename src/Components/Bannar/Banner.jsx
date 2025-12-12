import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import banner1 from "../../assets/banner/banner1.png";
import banner2 from "../../assets/banner/banner2.png";
import banner3 from "../../assets/banner/banner3.png";
import { Link } from "react-router";

const Banner = () => {
  return (
    <Carousel
      infiniteLoop
      autoPlay
      showThumbs={false}
      showStatus={false}
    >
      {/* Slide 1 */}
      <div className="relative w-full">
        <img src={banner2} className="w-full object-cover" />

        {/* Buttons over image */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-5">
          <button className="btn btn-primary rounded border px-4 py-2 text-white">
            Track Your Parcel
          </button>
          <button className="btn btn-secondary rounded border px-4 py-2 text-white">
            Be a Rider
          </button>
        </div>
      </div>

      {/* Slide 2 */}
      <div className="relative w-full">
        <img src={banner1} className="w-full object-cover" />

        {/* Buttons over image */}
        <div className="absolute bottom-10 left-1/2 rounded -translate-x-1/2 flex gap-5">
          <button className="btn btn-primary rounded border px-4 py-2 text-white">
            Track Your Parcel
          </button>
          <Link to={'/rider'} className="btn btn-secondary rounded border px-4 py-2 text-white">
            Be a Rider
          </Link>
        </div>
      </div>

      {/* Slide 3 */}
      <div className="relative w-full">
        <img src={banner3} className="w-full object-cover" />

        {/* Buttons over image */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-5">
          <button className="btn btn-primary rounded border px-4 py-2 text-white">
            Track Your Parcel
          </button>
          <button className="btn btn-secondary rounded border px-4 py-2 text-white">
            Be a Rider
          </button>
        </div>
      </div>
    </Carousel>
  );
};

export default Banner;
