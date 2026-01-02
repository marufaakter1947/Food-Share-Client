import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import FoodCard from "../Components/FoodCard";
import Loading from "./Loading";

const AvailableFoods = () => {
  const data = useLoaderData();
  // console.log(data);
  const [foods, setFoods] = useState(data);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (data) {
      const availableFoods = data.filter(
        (food) => food.food_status === "Available"
      );
      setFoods(availableFoods);

      setLoading(false);
    }
  }, [data]);
  return (
    <div>
      <div className="text-4xl md:text-5xl font-bold mb-4 text-[#7d161d] mt-10 text-center">
        {" "}
        All Foods
      </div>
      <p className=" text-lg text-gray-600 text-center mb-10 ">Explore all available Foods</p>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {foods.map((food) => (
            <FoodCard key={food._id} food={food} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableFoods;
