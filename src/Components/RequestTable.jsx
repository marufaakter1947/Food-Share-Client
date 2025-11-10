import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { toast } from "react-hot-toast";
import Loading from "../Pages/Loading";
import { useNavigate } from "react-router";

const RequestTable = ({onFoodDonated}) => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch all requests
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/food-requests?donator_email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setRequests(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user?.email]);

  

const handleUpdateStatus = (id, newStatus, foodId = null) => {
  fetch(`http://localhost:3000/update-request/${id}`, {
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
    <div className="overflow-x-auto mt-6">
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
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  disabled={req.status !== "pending"}
                >
                  Accept
                </button>
                <button
                  onClick={() => handleUpdateStatus(req._id, "rejected")}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
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
  );
};

export default RequestTable;
