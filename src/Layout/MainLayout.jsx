import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const MainLayout = () => {
  return (
    <div className="bg-[#F5F5F5] px-5">
      <div className="max-w-7xl mx-auto">
        <Navbar />
        <div className="">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
