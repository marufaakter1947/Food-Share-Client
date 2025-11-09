import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import FoodCard from '../Components/FoodCard';

const AvailableFoods = () => {
    const data = useLoaderData();
  // console.log(data);
  const [foods, setFoods] = useState(data);
//   const [loading, setLoading] = useState(false);
    return (
        <div>
      <div className="text-2xl text-center font-bold"> All Foods</div>
      <p className=" text-center  ">Explore all available Foods</p>

      {/* <form
        onSubmit={handleSearch}
        className="text-center mt-5 mb-10 flex gap-2 justify-center"
      >
        <label className="input rounded-full ">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input name="search" type="search" placeholder="Search" />
        </label>
        <button className="btn btn-secondary rounded-full">
          {loading ? "Searching..." : "Search"}
        </button>
      </form> */}

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {Array.isArray(data) &&
          foods.map((food) => <FoodCard key={food._id} food={food} />)}
      </div>
    </div>
    );
};

export default AvailableFoods;