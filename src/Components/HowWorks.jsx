import React from "react";
import { FaUtensils, FaSearch, FaHandHoldingHeart } from "react-icons/fa";
import { PiBowlFoodFill } from "react-icons/pi";

const HowWorks = () => {
  return (
    <div className="my-16 px-6">
      <h2 className="text-3xl font-bold text-center mb-2  ">
         How It Works
      </h2>
      <p className="text-center  mb-10">
        Follow these 3 simple steps to share or receive food easily.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Step 1 */}
        <div className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300">
          <PiBowlFoodFill  className="text-[#BC1823] text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2"> Post Food</h3>
          <p className="text-gray-600 text-sm">
            Donators can easily share food by posting details like
            quantity, location, and expiry date.
          </p>
        </div>

        {/* Step 2 */}
        <div className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300">
          <FaSearch className="text-[#BC1823] text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2"> Find Food</h3>
          <p className="text-gray-600 text-sm">
            Visitors browse the available food list to find nearby meals that
            match their needs.
          </p>
        </div>

        {/* Step 3 */}
        <div className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300">
          <FaHandHoldingHeart className="text-[#BC1823] text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2"> Collect Food</h3>
          <p className="text-gray-600 text-sm">
            Once matched, the receiver collects the food from the pickup
            location before it expires.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowWorks;
