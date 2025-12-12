import React from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import img1 from "../../assets/brands/amazon.png";
import img2 from "../../assets/brands/amazon_vector.png";
import img3 from "../../assets/brands/casio.png";
import img4 from "../../assets/brands/moonstar.png";
import img5 from "../../assets/brands/randstad.png";
import img6 from "../../assets/brands/star.png";
import img7 from "../../assets/brands/start_people.png";

const brandLogo = [img1, img2, img3, img4, img5, img6, img6, img7];

const Band = () => {
  return (
    <Swiper
      slidesPerView={4}
      centeredSlides={true}
      spaceBetween={30}
      grabCursor={true}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
        modules={[Autoplay ]}
        className="mySwiper"
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      
    >
      {brandLogo.map((logo) => (
        <SwiperSlide>
          <img src={logo} alt="" className=" w-auto object-contain" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Band;
