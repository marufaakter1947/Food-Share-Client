import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const [foodCount, setFoodCount] = useState(0);
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`https://food-share-server-rust.vercel.app/my-foods?email=${user.email}`)
      .then(res => res.json())
      .then(data => setFoodCount(data.length));

    fetch(`https://food-share-server-rust.vercel.app/my-requests?email=${user.email}`)
      .then(res => res.json())
      .then(data => setRequestCount(data.length));
  }, [user?.email]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1">
        Welcome, {user?.displayName}
      </h2>
      <p className="text-gray-600 mb-6">
        Here is your activity overview
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-xl p-6 border-l-4 border-[#BC1823]">
          <h3 className="text-lg font-semibold">My Added Foods</h3>
          <p className="text-3xl font-bold mt-2 text-[#BC1823]">
            {foodCount}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6 border-l-4 border-teal-600">
          <h3 className="text-lg font-semibold">My Food Requests</h3>
          <p className="text-3xl font-bold mt-2 text-teal-600">
            {requestCount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
