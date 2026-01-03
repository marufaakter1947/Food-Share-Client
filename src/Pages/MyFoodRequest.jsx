import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Loading from "./Loading";
import { Link } from "react-router";

const MyFoodRequest = () => {
  const { user } = useContext(AuthContext);
  const [myFoods, setMyFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://food-share-server-rust.vercel.app/my-requests?email=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          const normalizedData = data.map((item) => ({
            ...item,
            status: item.status?.toLowerCase() || "unknown",
          }));
          setMyFoods(normalizedData);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user?.email]);

  if (loading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto py-10 px-3">
      <h2 className="text-2xl text-center font-bold mb-2">
        My Food Request Collection
      </h2>
      <p className="text-center mb-10">
        A list of all the foods that I have requested.
      </p>

      {myFoods.length === 0 ? (
        <p className="text-center text-gray-500">No requested foods found.</p>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto">
            <table className="table w-full border">
              <thead className="bg-linear-to-r from-[#BC1823] to-red-500 text-white">
                <tr>
                  <th>Image</th>
                  <th>Food Name</th>
                  <th>Quantity</th>
                  <th>Expire Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {myFoods.map((food) => (
                  <tr key={food._id} className="hover:bg-gray-50">
                    <td>
                      <img
                        src={food.food_image}
                        alt={food.food_name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="font-semibold">{food.food_name}</td>
                    <td>{food.food_quantity}</td>
                    <td className="text-[#BC1823]">{food.expire_date}</td>
                    <td>
                      {food.food_status?.toLowerCase().trim() === "donated" ? (
                        <button
                          className="text-xs text-red-500 font-semibold w-full mt-3 cursor-not-allowed"
                          disabled
                        >
                          Donated
                        </button>
                      ) : (
                        <Link
                          to={`/dashboard/food-details/${food.food_id}`}
                          className="btn btn-sm w-full mt-3 bg-linear-to-r from-[#BC1823] to-red-500 text-white"
                        >
                          View Details
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Small device view  */}
          <div className="grid gap-4 md:hidden">
            {myFoods.map((food) => (
              <div key={food._id} className="bg-white rounded-lg shadow p-4">
                <div className="flex gap-4 items-center">
                  <img
                    src={food.food_image}
                    alt={food.food_name}
                    className="w-20 h-20 rounded object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-[#BC1823]">
                      {food.food_name}
                    </h3>
                    <p className="text-sm">Quantity: {food.food_quantity}</p>
                    <p className="text-sm text-red-500">
                      Expire: {food.expire_date}
                    </p>
                  </div>
                </div>

                {food.food_status?.toLowerCase().trim() === "donated" ? (
                  <button
                    className="text-xs text-red-500 font-semibold w-full mt-3 cursor-not-allowed"
                    disabled
                  >
                    Donated
                  </button>
                ) : (
                  <Link
                    to={`/dashboard/food-details/${food.food_id}`}
                    className="btn btn-sm w-full mt-3 bg-linear-to-r from-[#BC1823] to-red-500 text-white"
                  >
                    View Details
                  </Link>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyFoodRequest;
