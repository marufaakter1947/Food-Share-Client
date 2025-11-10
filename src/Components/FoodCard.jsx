import React from "react";
import { Link } from "react-router";

const FoodCard = ({ food }) => {
  const {
    _id,
    food_image,
    food_name,
    donator_name,
    donator_image,
    food_quantity,
    pickup_location,
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
        <h2 className="card-title text-[#BC1823]">{food_name}</h2>
        <div className=" text-xs   flex justify-between items-center border-gray-300  border-b pb-1 font-semibold">Quantity:
          <span>{food_quantity}</span>
        </div>
        <div className=" text-xs   flex justify-between items-center border-gray-300  border-b pb-1 font-semibold">Pickup Location:
          <span className="font-normal">{pickup_location}</span>
        </div>
        <div className=" text-xs   flex justify-between items-center border-gray-300  border-b pb-1 font-semibold">Expires:
          <span className="text-[#BC1823] font-medium">{expire_date}</span>
        </div>
        <div className="text-[13px] font-medium flex gap-2 items-center">
            <img src={donator_image} alt="" className="w-10 h-10 rounded-full   object-contain object-center shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400 " />
            Donator:<span className="mr-1" >{donator_name}</span></div>
        
       
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
