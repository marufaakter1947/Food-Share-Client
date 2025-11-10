
import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import Loading from "../Pages/Loading";

const RequestTable = ({ requests, setRequests, onFoodDonated, loading }) => {
  const navigate = useNavigate();

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
          setTimeout(() => navigate("/available-foods"), 1000);
        }
      })
      .catch((err) => toast.error(err.message));
  };

  if (loading) return <Loading />;
  if (!requests || requests.length === 0)
    return <p className="text-center mt-4">No requests found.</p>;

  return (
    <div className="mt-6">
      {/* Desktop table */}
      <div className="overflow-x-auto hidden md:block">
        <table className="table-auto w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Food Name</th>
              <th className="px-4 py-2 border">Requester</th>
              <th className="px-4 py-2 border">Location</th>
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
                    className="bg-teal-600 text-white px-2 py-1 rounded"
                    disabled={req.status !== "pending"}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(req._id, "rejected")}
                    className="bg-red-500 text-white px-2 py-1 rounded"
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

      {/* Mobile cards */}
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
              <span className="font-semibold">Status:</span>
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
                className="bg-teal-600 text-white px-3 py-1 rounded"
                disabled={req.status !== "pending"}
              >
                Accept
              </button>
              <button
                onClick={() => handleUpdateStatus(req._id, "rejected")}
                className="bg-red-500 text-white px-3 py-1 rounded"
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
