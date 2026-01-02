import React from "react";
import FoodImage from "../assets/food1.jpg";
import { FaHandHoldingHeart } from "react-icons/fa6";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { useNavigate } from "react-router";

const Banner = () => {
  const navigate = useNavigate();
  const handleViewFoods = () => {
    navigate("/available-foods");
  };

  return (
    <section className="w-full max-w-7xl mx-auto rounded-xl overflow-hidden shadow-2xl font-sans mt-3 ">
      <div className="flex flex-col md:flex-row h-auto md:h-[500px]">
        <div className="w-full md:w-3/5 p-8 sm:p-12 md:p-16 flex flex-col justify-center  bg-linear-to-b from-[#f6dada] to-[#ffeaea]">
          <div className="mb-4 animate-heartbeat text-[#BC1823] text-4xl flex items-center">
            <span role="img" aria-label="heart" className="mr-1 ">
              <FaHandHoldingHeart />
            </span>
            <span role="img" aria-label="fork and knife">
              <GiForkKnifeSpoon />
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight mb-3 fade-in-up">
            Food-Share
          </h1>

          <p className="text-lg text-gray-600 mb-8 max-w-md fade-in-up">
            Social Network Platform for sharing Foods
          </p>

          <button
            onClick={handleViewFoods}
            className="w-48 text-white font-semibold py-3 px-6 rounded uppercase tracking-wider shadow-xl focus:outline-none focus:ring-4 focus:ring-[#BC1823] focus:ring-opacity-50 btn-gradient fade-in-up cursor-pointer"
          >
            View All Foods
          </button>
        </div>

        {/*Right side Image */}
        <div className="w-full md:w-2/5 relative bg-[#BC1823] overflow-hidden">
          <img
            src={FoodImage}
            alt="Food"
            className="w-full h-full object-cover md:absolute md:inset-0 animate-subtle-zoom"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
