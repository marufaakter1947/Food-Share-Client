import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-hot-toast";
import Loading from "../Pages/Loading";
import { useNavigate } from "react-router";

const RequestTable = ({ onFoodDonated }) => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch all requests
  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://food-share-server-rust.vercel.app/food-requests?donator_email=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setRequests(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user?.email]);

  const handleUpdateStatus = (id, newStatus, foodId = null) => {
    fetch(`https://food-share-server-rust.vercel.app/update-request/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus, foodId }),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success(`Request ${newStatus}`);
        setRequests((prev) =>
          prev.map((r) => (r._id === id ? { ...r, status: newStatus } : r))
        );

        if (newStatus === "accepted" && foodId) {
          if (onFoodDonated) onFoodDonated(foodId);

          setTimeout(() => {
            navigate("/available-foods");
          }, 1000);
        }
      })
      .catch((err) => toast.error(err.message));
  };

  if (loading) return <Loading></Loading>;

  if (!requests.length)
    return <p className="text-center mt-4">No requests found.</p>;

  return (
    <div className="mt-6">
      <div className="overflow-x-auto hidden md:block">
        <table className="table-auto w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Food Name</th>
              <th className="px-4 py-2 border">Requester</th>
              <th className="px-4 py-2 border">Requester Location</th>
              <th className="px-4 py-2 border">Contact</th>
              <th className="px-4 py-2 border">Reason</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req._id} className="text-center border-b">
                <td className="px-4 py-2 border">{req.food_name}</td>
                <td className="px-4 py-2 border">{req.requester_name}</td>
                <td className="px-4 py-2 border">{req.requester_location}</td>
                <td className="px-4 py-2 border">{req.contact}</td>
                <td className="px-4 py-2 border">{req.reason}</td>
                <td className="px-4 py-2 border font-semibold">{req.status}</td>
                <td className="px-4 py-2 border flex justify-center gap-2">
                  <button
                    onClick={() =>
                      handleUpdateStatus(req._id, "accepted", req.food_id)
                    }
                    className="bg-teal-600 text-white px-2 py-1 rounded hover:bg-teal-700 cursor-pointer"
                    disabled={req.status !== "pending"}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(req._id, "rejected")}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 cursor-pointer"
                    disabled={req.status !== "pending"}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card for small device  */}
      <div className="block md:hidden space-y-4">
        {requests.map((req) => (
          <div
            key={req._id}
            className="border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            <p className="font-bold text-[#BC1823]">{req.food_name}</p>
            <p>
              <span className="font-semibold">Requester:</span>{" "}
              {req.requester_name}
            </p>
            <p>
              <span className="font-semibold">Location:</span>{" "}
              {req.requester_location}
            </p>
            <p>
              <span className="font-semibold">Contact:</span> {req.contact}
            </p>
            <p>
              <span className="font-semibold">Reason:</span> {req.reason}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`${
                  req.status === "pending"
                    ? "text-yellow-600"
                    : req.status === "accepted"
                    ? "text-green-600"
                    : "text-red-600"
                } font-semibold`}
              >
                {req.status}
              </span>
            </p>

            <div className="flex flex-wrap justify-center gap-2 mt-3">
              <button
                onClick={() =>
                  handleUpdateStatus(req._id, "accepted", req.food_id)
                }
                className="bg-teal-600 text-white px-3 py-1 rounded hover:bg-teal-700 cursor-pointer"
                disabled={req.status !== "pending"}
              >
                Accept
              </button>
              <button
                onClick={() => handleUpdateStatus(req._id, "rejected")}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                disabled={req.status !== "pending"}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestTable;
