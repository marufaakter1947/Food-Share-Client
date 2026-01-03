import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import Loading from "./Loading";

const UpdateFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState(null);

  // Fetch existing data
  useEffect(() => {
    fetch(`https://food-share-server-rust.vercel.app/all-foods/${id}`)
      .then((res) => res.json())
      .then((data) => setFood(data));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedFood = {
      food_name: form.food_name.value,
      food_image: form.food_image.value,
      food_quantity: form.food_quantity.value,
      pickup_location: form.pickup_location.value,
      expire_date: form.expire_date.value,
    };

    fetch(`https://food-share-server-rust.vercel.app/my-foods/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFood),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Food updated successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/dashboard/manage-my-foods");
      });
  };

  if (!food) return <Loading></Loading>;

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg p-6 rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center text-[#BC1823] mb-6">
        Update Food
      </h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="font-semibold">Food Name:</label>
          <input
            name="food_name"
            defaultValue={food.food_name}
            required
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="font-semibold">Food Image URL:</label>
          <input
            name="food_image"
            defaultValue={food.food_image}
            required
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="font-semibold">Quantity:</label>
          <input
            name="food_quantity"
            defaultValue={food.food_quantity}
            required
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="font-semibold">Pickup Location:</label>
          <input
            name="pickup_location"
            defaultValue={food.pickup_location}
            required
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="font-semibold">Expire Date:</label>
          <input
            type="date"
            name="expire_date"
            defaultValue={food.expire_date}
            required
            className="w-full border rounded p-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-linear-to-r from-[#BC1823] to-red-500 text-white py-2 rounded hover:bg-red-700"
        >
          Update Food
        </button>
      </form>
    </div>
  );
};

export default UpdateFood;
