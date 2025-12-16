import React from "react";
import { Quote } from "lucide-react";

const ReviewCard = ({ data }) => {
  if (!data) return null;

  const { userName, userPhotoURL, review, ratings, date } = data;

  return (
    <div className="card bg-base-100 shadow-md rounded-xl max-w-md p-6 border gap-4 border-gray-100 h-full">

      <Quote className="text-[#a8ced6] w-7 h-7 mb-3" />
      <p className="text-sm">{review}</p>
      <div className="border-t border-dotted border-gray-300 my-4"></div>

      <div className="flex items-center gap-3">
        <div className="avatar">
          <div className="w-12 rounded-full ring ring-offset-1 ring-[#c2e3e8]">
            <img src={userPhotoURL} alt={userName} />
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 text-sm">{userName}</h3>
          <p className="text-xs text-gray-500">
            ⭐ {ratings} • {new Date(date).toLocaleDateString()}
          </p>
        </div>
      </div>


      <div>
        <div className="flex justify-center gap-10 mb-8">
  <div className="text-center m-4">
    <h3 className="text-2xl font-bold">100+</h3>
    <p className="text-gray-500 text-sm">Companies Trust Us</p>
  </div>
  <div className="text-center">
    <h3 className="text-2xl font-bold">500+</h3>
    <p className="text-gray-500 text-sm">Assets Managed</p>
  </div>
  <div className="text-center">
    <h3 className="text-2xl font-bold">4.8/5</h3>
    <p className="text-gray-500 text-sm">Average Rating</p>
  </div>
</div>

      </div>












    </div>
  );
};

export default ReviewCard;
