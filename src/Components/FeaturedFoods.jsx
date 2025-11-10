import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import FoodCard from "../Components/FoodCard";
import Loading from "../Pages/Loading";

const FeaturedFoods = () => {
  const [foods, setFoods] = useState([]);
    // const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    fetch("http://localhost:3000/featured-foods")
      .then((res) => res.json())
      .then((data) => setFoods(data))
      .catch((err) => console.error(err));
  }, []);

  

  return (
    <div className="my-15">
      <h2 className="text-3xl font-bold text-center mb-2 ">Featured Foods</h2>
       <p className="text-center mb-10 ">
        Explore the most generous foods - freshly prepared and ready to
        share with those in need.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-5">
        {foods.map((food) => (
          <FoodCard key={food._id} food={food} />
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          to="/available-foods"
          className="bg-linear-to-r from-[#BC1823] to-red-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
        >
          Show All
        </Link>
      </div>
    </div>
  );
};

export default FeaturedFoods;
