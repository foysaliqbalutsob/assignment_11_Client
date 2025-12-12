import React from "react";
import { Outlet } from "react-router";
import Footer from "../Pages/Shared/Footer/Footer";
import Header from "../Pages/Shared/Header/Header";


const RootLayout = () => {
  return (
    <div className="max-w-7xl mx-auto " >

      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>

      
      
    </div>
  );
};

export default RootLayout;
