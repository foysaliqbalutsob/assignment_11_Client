import React from "react";
import logo from '../../assets/banner/Logo.png'
import { Link } from "react-router";

const Logo = () => {
  return (
    <div className="flex   ">
      
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} alt="" className="h-20 " />
        <span className="text-3xl hidden lg:block font-bold">AssetVerse</span>
      </Link>
    </div>
  );
};

export default Logo;
