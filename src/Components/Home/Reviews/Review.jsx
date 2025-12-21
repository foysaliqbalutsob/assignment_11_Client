import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import ReviewCard from "./ReviewCard";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const Review = () => {
  const data =[
  {
    "id": "av001",
    "userEmail": "john.doe@company.com",
    "userName": "John Doe",
    "department": "IT",
    "assetName": "Dell Latitude 7420",
    "assetType": "Laptop",
    "ratings": 4.5,
    "review": "Smooth asset allocation process and quick approval.",
    "userPhotoURL": "https://randomuser.me/api/portraits/men/10.jpg",
    "date": "2024-05-08T14:30:00.000Z"
  },
  {
    "id": "av002",
    "userEmail": "jane.smith@company.com",
    "userName": "Jane Smith",
    "department": "Finance",
    "assetName": "HP LaserJet Pro",
    "assetType": "Printer",
    "ratings": 3.8,
    "review": "Asset was delivered properly but took longer than expected.",
    "userPhotoURL": "https://randomuser.me/api/portraits/women/25.jpg",
    "date": "2024-06-10T10:15:00.000Z"
  },
  {
    "id": "av003",
    "userEmail": "alex.brown@company.com",
    "userName": "Alex Brown",
    "department": "Operations",
    "assetName": "Cisco Network Switch",
    "assetType": "Networking Equipment",
    "ratings": 5.0,
    "review": "Excellent tracking and documentation through AssetVerse.",
    "userPhotoURL": "https://randomuser.me/api/portraits/men/34.jpg",
    "date": "2024-07-01T08:50:00.000Z"
  },
  {
    "id": "av004",
    "userEmail": "lisa.white@company.com",
    "userName": "Lisa White",
    "department": "HR",
    "assetName": "Office Desktop PC",
    "assetType": "Hardware",
    "ratings": 4.2,
    "review": "Very professional handling and clear asset history.",
    "userPhotoURL": "https://randomuser.me/api/portraits/women/12.jpg",
    "date": "2024-07-15T09:10:00.000Z"
  },
  {
    "id": "av005",
    "userEmail": "david.lee@company.com",
    "userName": "David Lee",
    "department": "Logistics",
    "assetName": "Warehouse Barcode Scanner",
    "assetType": "Device",
    "ratings": 2.9,
    "review": "Asset assignment was delayed and status updates were unclear.",
    "userPhotoURL": "https://randomuser.me/api/portraits/men/19.jpg",
    "date": "2024-08-02T16:45:00.000Z"
  },
  {
    "id": "av006",
    "userEmail": "nina.khan@company.com",
    "userName": "Nina Khan",
    "department": "Marketing",
    "assetName": "MacBook Pro 14”",
    "assetType": "Laptop",
    "ratings": 4.9,
    "review": "Seamless experience with fast approval and delivery.",
    "userPhotoURL": "https://randomuser.me/api/portraits/women/8.jpg",
    "date": "2024-08-10T12:00:00.000Z"
  },
  {
    "id": "av007",
    "userEmail": "michael.jordan@company.com",
    "userName": "Michael Jordan",
    "department": "Design",
    "assetName": "Wacom Graphic Tablet",
    "assetType": "Creative Tool",
    "ratings": 3.3,
    "review": "Good system overall, but asset condition details could be improved.",
    "userPhotoURL": "https://randomuser.me/api/portraits/men/22.jpg",
    "date": "2024-08-14T18:20:00.000Z"
  },
  {
    "id": "av008",
    "userEmail": "emma.watson@company.com",
    "userName": "Emma Watson",
    "department": "Administration",
    "assetName": "Office Chair (Ergonomic)",
    "assetType": "Furniture",
    "ratings": 4.7,
    "review": "Well-organized asset records and transparent workflow.",
    "userPhotoURL": "https://randomuser.me/api/portraits/women/5.jpg",
    "date": "2024-08-20T07:30:00.000Z"
  }
]


  return (
    <section className="py-16 bg-gray-50">
      {/* Section Header */}
      <div className="text-center mb-12 px-4">
        <h3 className="text-3xl font-extrabold text-gray-900">
          What Our Customers Are Saying
        </h3>
        <p className="text-gray-600 max-w-xl mx-auto mt-3">
          Real feedback from teams using AssetVerse to manage, track, and optimize company assets efficiently.
        </p>
      </div>

      {/* Swiper */}
      <div className=" mx-auto px-4 ">
        <Swiper
          // effect="coverflow"
          grabCursor={true}
          centeredSlides={false} 
           spaceBetween={30} 
          // centeredSlides={true}
          loop={true}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          // coverflowEffect={{
          //   rotate: 20,
          //   stretch: 0,
          //   depth: 100,
          //   modifier: 2,
          //   slideShadows: true,
          // }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Autoplay, Pagination]}
        >
          {data.map((item) => (
            <SwiperSlide key={item.id} className="flex justify-center items-center">
              <ReviewCard data={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Review;
