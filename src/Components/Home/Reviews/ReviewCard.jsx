import React from "react";
import { Quote } from "lucide-react";

const ReviewCard = ({ data }) => {
  const { userName, user_photoURL, review, ratings, date } = data;

  return (
    <div className="card bg-base-100 shadow-md rounded-xl max-w-md p-6 border border-gray-100">

      {/* Quote Icon */}
      <Quote className="text-[#a8ced6] w-7 h-7 mb-3" />

      {/* Review Text */}
      <p className=" text-sm ">
        {review}
      </p>

      {/* Dotted divider */}
      <div className="border-t border-dotted border-gray-300 my-4"></div>

      {/* Profile Row */}
      <div className="flex items-center gap-3">

        {/* Avatar */}
        <div className="avatar">
          <div className="w-12 rounded-full ring ring-offset-1 ring-[#c2e3e8]">
            <img src={user_photoURL} alt={userName} />
          </div>
        </div>

        {/* User Info */}
        <div>
          <h3 className="font-semibold text-gray-900 text-sm">{userName}</h3>
          <p className="text-xs text-gray-500">
            ⭐ {ratings} • {new Date(date).toLocaleDateString()}
          </p>
        </div>
      </div>

    </div>
  );
};

export default ReviewCard;
