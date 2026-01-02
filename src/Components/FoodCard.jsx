import React from "react";
import { Link } from "react-router";

const FoodCard = ({ food }) => {
  const {
    _id,
    food_image,
    food_name,
    food_quantity,
    expire_date,
  } = food;
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <figure className="h-48 overflow-hidden">
        <img
          src={food_image}
          alt={food_name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-[#BC1823] w-100 truncate">{food_name}</h2>
        <div className=" text-xs   flex justify-between items-center border-gray-300  border-b pb-1 font-semibold">
          Quantity:
          <span>{food_quantity}</span>
        </div>
        
        <div className=" text-xs   flex justify-between items-center border-gray-300  border-b pb-1 font-semibold">
          Expires:
          <span className="text-[#BC1823] font-medium">{expire_date}</span>
        </div>
        

        <Link
          to={`/food-details/${_id}`}
          className="btn rounded bg-linear-to-r from-[#BC1823] to-red-500 text-white w-full btn-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default FoodCard;
