import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = e.target;
      const food_name = form.food_name.value.trim();
      const foodImg = form.food_image.value.trim();
      const food_quantity = form.food_quantity.value.trim();
      const pickup_location = form.pickup_location.value.trim();
      const expire_date = form.expire_date.value;
      const additional_notes = form.additional_notes.value.trim();

      // console.log({form,food_name,foodImg,food_quantity,pickup_location,expire_date,additional_notes})
      const payload = {
        food_name,
        food_image: foodImg,
        food_quantity,
        pickup_location,
        expire_date,
        additional_notes,
        donator_name: user?.displayName,
        donator_email: user?.email,
        donator_image: user?.photoURL,
        food_status: "Available",
        createdAt: new Date().toISOString(),
      };

      const res = await fetch("http://localhost:3000/all-foods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Server error");

      toast.success("Food added successfully!");
      setTimeout(() => {
        navigate("/available-foods");
      }, 1000);
      form.reset();
    } catch (err) {
      toast.error(err.message);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl border border-gray-200 mt-10">
      <div className="card-body">
        <h1 className="text-3xl font-bold text-center">Add Food</h1>

        <form onSubmit={handleSubmit} className="space-y-3">
          <fieldset className="fieldset">
            <label className="label font-semibold">Food Name</label>
            <input
              name="food_name"
              type="text"
              className="input rounded focus:border-0 focus:outline-gray-200 w-full"
              placeholder="Food Name"
              required
            />

            <label className="label font font-semibold">Food Image URL </label>
            <input
              name="food_image"
              type="text"
              className="input rounded focus:border-0 focus:outline-gray-200 w-full"
              placeholder="Food image URL from  imgbb "
              required
            />

            <label className="label font-semibold">Food Quantity</label>
            <input
              name="food_quantity"
              type="text"
              className="input rounded focus:border-0 focus:outline-gray-200 w-full"
              placeholder="Serves 2 people"
              required
            />

            <label className="label font-semibold">Pickup Location</label>
            <input
              name="pickup_location"
              type="text"
              className="input rounded focus:border-0 focus:outline-gray-200 w-full"
              placeholder="Pickup Address"
              required
            />

            <label className="label font-semibold">Expire Date</label>
            <input
              name="expire_date"
              type="date"
              className="input rounded focus:border-0 focus:outline-gray-200 w-full py-2"
              required
            />

            <label className="label font-semibold">Additional Notes</label>
            <textarea
              name="additional_notes"
              rows="3"
              className="textarea rounded focus:border-0 focus:outline-gray-200 w-full"
              placeholder="Any Notes about this Food!"
            />

            <button
              type="submit"
              disabled={loading}
              className="btn rounded border-gray-300 btn-sm bg-linear-to-r from-[#BC1823] to-red-500 text-white w-full mt-4"
            >
              {loading ? "Adding..." : "Add Food"}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default AddFood;
