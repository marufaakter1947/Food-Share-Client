import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router";
import Swal from "sweetalert2";
import Loading from "./Loading";

const ManageMyFoods = () => {
  const { user } = useContext(AuthContext);
  const [myFoods, setMyFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://food-share-server-rust.vercel.app/my-foods?email=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setMyFoods(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://food-share-server-rust.vercel.app/my-foods/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              setMyFoods(myFoods.filter((food) => food._id !== id));
              Swal.fire("Deleted!", "Your food has been deleted.", "success");
            }
          });
      }
    });
  };

  if (loading) return <Loading></Loading>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl text-center font-bold mt-2 mb-2">
        My Added Foods
      </h2>
      <p className="text-center mb-10">
        Manage and monitor all the food items that i have added to the system.
      </p>

      {myFoods.length === 0 ? (
        <p className="text-center text-gray-500">No foods added yet.</p>
      ) : (
        <div>
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full border">
              <thead className="bg-linear-to-r from-[#BC1823] to-red-500 text-white">
                <tr>
                  <th>Food Image</th>
                  <th>Food Name</th>
                  <th>Quantity</th>
                  <th>Pickup Location</th>
                  <th>Expire Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {myFoods.map((food) => (
                  <tr
                    key={food._id}
                    className="hover:bg-gray-50 border-3 border-gray-300"
                  >
                    <td>
                      <img
                        src={food.food_image}
                        alt={food.food_name}
                        className="w-16 h-16 rounded object-cover"
                      />
                    </td>
                    <td className="font-semibold">{food.food_name}</td>
                    <td>{food.food_quantity}</td>
                    <td>{food.pickup_location}</td>
                    <td>{food.expire_date}</td>
                    <td className="space-x-2">
                      <Link to={`/update-food/${food._id}`}>
                        <button className="px-3 py-1 bg-teal-600 text-white rounded">
                          Update
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(food._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* small device */}
          <div className="grid gap-4 md:hidden">
            {myFoods.map((food) => (
              <div key={food._id} className="border p-4 rounded shadow-sm">
                <div className="flex items-center gap-4">
                  <img
                    src={food.food_image}
                    alt={food.food_name}
                    className="w-16 h-16 rounded object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{food.food_name}</h3>
                    <p className="text-sm text-gray-600">
                      {food.pickup_location}
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-sm">
                  <span className="font-semibold">Quantity:</span>{" "}
                  {food.food_quantity}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Expire Date:</span>{" "}
                  {food.expire_date}
                </p>
                <div className="flex justify-end gap-2 mt-3">
                  <Link to={`/update-food/${food._id}`}>
                    <button className="px-3 py-1 bg-teal-600 text-white rounded text-sm">
                      Update
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(food._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMyFoods;
