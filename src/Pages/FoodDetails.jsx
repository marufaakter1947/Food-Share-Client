import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { FaUsers, FaStar, FaCalendarAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { toast } from "react-hot-toast";
import Loading from "./Loading";

const FoodDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/all-foods/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFood(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loading></Loading> ;

  const {
    food_image,
    food_name,
    donator_name,
    donator_email,
    donator_image,
    food_quantity,
    pickup_location,
    expire_date,
    additional_notes,
    food_status
  } = food;

  const handleRequestFood = () => {
    toast.success("Food request sent successfully!");
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-sm rounded-lg p-6 md:flex gap-8 mt-8">
      <div className="md:w-1/3 flex justify-center items-center">
        <img
          src={food_image}
          alt={food_name}
          className="rounded-xl w-full h-72 object-cover"
        />
      </div>

      <div className="md:w-2/3 space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">{food_name}</h2>
        <p className="font-medium text-green-800">Food Status: <span className="ml-1">{food_status}</span></p>
        <div className="flex items-center gap-3 mb-2">
          <img
            src={donator_image}
            alt={donator_name}
            className="w-14 h-14 rounded-full   object-contain object-center shadow-none transition-shadow duration-300 cursor-pointer hover:shadow-lg hover:shadow-gray-400"
          />
          <div>
            <p className="text-lg text-gray-600 font-semibold">{donator_name}</p>
            <p className="text-sm text-gray-600 font-semibold">{donator_email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mt-4">
          <div>
            <FaUsers className=" text-2xl mx-auto" />
            <h4 className="text-gray-500 mt-1">Quantity</h4>
            <p className="text-xl font-bold">{food_quantity}</p>
          </div>

          <div>
            <IoLocationSharp className="text-blue-500 text-2xl mx-auto" />
            <h4 className="text-gray-500 mt-1">Pickup Location</h4>
            <p className="text-lg font-semibold">{pickup_location}</p>
          </div>

          <div>
            <FaCalendarAlt className="text-[#BC1823] text-2xl mx-auto" />
            <h4 className="text-gray-500 mt-1">Expire Date</h4>
            <p className="text-lg font-semibold">{expire_date}</p>
          </div>
        </div>

        <hr />

        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Additional Notes
          </h3>
          <p className="text-gray-600 leading-relaxed">{additional_notes}</p>
        </div>

        <button
          onClick={handleRequestFood}
          className="w-full bg-linear-to-r from-[#BC1823] to-red-500 text-white font-medium py-2 rounded  mt-4"
        >
          Request Food
        </button>
      </div>
    </div>
  );
};

export default FoodDetails;
