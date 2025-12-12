import React, { useEffect, useState } from "react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewCard from "./ReviewCard";

const Review = () => {
  const [review, setReview] = useState([]);

  useEffect(() => {
    fetch("../../../../public/reviews.json")
      .then((res) => res.json())
      .then((data) => setReview(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <div className="text-center">
        <h3 className="text-3xl text-[rgba(3,55,61,1)] font-extrabold ">What our customers are sayings</h3>
        <p>
          Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
        </p>
      </div>

      <div>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          loop={true}
          centeredSlides={true}
          slidesPerView={3}
          coverflowEffect={{
            rotate: 30,
            stretch: "50%",
            depth: 200,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow,Autoplay, Pagination]}
          className="mySwiper"
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
        >
          {review.map((data) => (
            <SwiperSlide>
              <ReviewCard data={data} key={data.map}></ReviewCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Review;
