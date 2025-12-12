import React from "react";
import logo from '../../assets/banner/AssetIQ.jpg'
import { Link } from "react-router";

const Logo = () => {
  return (
    <div className="flex   ">
      
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} alt="AssetIQ" className="h-10" />
        <span className="text-3xl font-bold">AssetIQ</span>
      </Link>
    </div>
  );
};

export default Logo;
