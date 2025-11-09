
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
      fetch(`http://localhost:3000/my-foods?email=${user.email}`)
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
      fetch(`http://localhost:3000/my-foods/${id}`, {
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
      <h2 className="text-3xl font-bold text-center text-[#BC1823] mb-6">
        My Added Foods
      </h2>

      {myFoods.length === 0 ? (
        <p className="text-center text-gray-500">No foods added yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
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
                <tr key={food._id} className="hover:bg-gray-50">
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
                      <button className="px-3 py-1 bg-blue-500 text-white rounded">
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
      )}
    </div>
  );
};

export default ManageMyFoods;
