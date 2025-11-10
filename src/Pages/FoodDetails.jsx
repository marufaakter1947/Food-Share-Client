import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { FaUsers, FaCalendarAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { toast } from "react-hot-toast";
import Loading from "./Loading";
import RequestTable from "../Components/RequestTable";

const FoodDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({
    location: "",
    reason: "",
    contact: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/all-foods/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Food not found");
        return res.json();
      })
      .then((data) => {
        if (!data || data.food_status === "donated") {
          toast.error("This food has already been donated!");
          navigate("/available-foods");
        } else {
          setFood(data);

          // Fetch requests **for this food** (donator only)
          if (user?.email === data.donator_email) {
            fetch(
              `http://localhost:3000/food-requests?donator_email=${user.email}`
            )
              .then((res) => res.json())
              .then((reqs) => {
                // Ensure each request has `food_id` matching your backend
                const formatted = reqs.map((r) => ({
                  ...r,
                  food_id: r.food_id || data._id,
                }));
                setRequests(formatted);
              })
              .catch((err) => console.error(err));
          }
        }
      })
      .catch((err) => {
        toast.error(err.message);
        navigate("/available-foods");
      })
      .finally(() => setLoading(false));
  }, [id, navigate, user?.email]);

  useEffect(() => {
    if (food && user?.email === food.donator_email) {
      fetch(
        `http://localhost:3000/food-requests?donator_email=${user.email}&food_id=${food._id}`
      )
        .then((res) => res.json())
        .then((data) => setRequests(data))
        .catch((err) => console.error(err));
    }
  }, [food, user?.email]);

  if (loading) return <Loading />;
  if (!food)
    return <p className="text-center mt-10">This food has been donated.</p>;

  const {
    _id,
    food_image,
    food_name,
    donator_name,
    donator_email,
    donator_image,
    food_quantity,
    pickup_location,
    expire_date,
    additional_notes,
    food_status,
  } = food;

  // new request
  const handleSubmitRequest = (e) => {
    e.preventDefault();
    const requestData = {
      food_id: _id,
      food_name,
      food_image,
      donator_name,
      donator_email,
      donator_image,
      food_quantity,
      expire_date,
      requested_by: user.email,
      requester_name: user.displayName,
      requester_image: user.photoURL,
      pickup_location,
      requester_location: formData.location,
      reason: formData.reason,
      contact: formData.contact,
      status: "pending",
      request_date: new Date().toISOString(),
    };

    fetch(`http://localhost:3000/my-food-request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    })
      .then((res) => res.json())
      .then((newRequest) => {
        toast.success("Food request submitted successfully!");
        setRequests((prev) => [...prev, newRequest]); // <-- Add new request to local state
        setShowModal(false);
        setFormData({ location: "", reason: "", contact: "" });
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 p-4">
      <div className="md:flex gap-8 bg-white shadow-sm rounded-lg p-6">
        <div className="md:w-1/3 flex justify-center items-center">
          <img
            src={food_image}
            alt={food_name}
            className="rounded-xl w-full h-72 object-cover"
          />
        </div>
        <div className="md:w-2/3 space-y-4">
          <h2 className="text-3xl font-bold">{food_name}</h2>
          <p className="font-medium text-green-800">
            Food Status: <span>{food_status}</span>
          </p>

          <div className="flex items-center gap-3 mb-2">
            <img
              src={donator_image}
              alt={donator_name}
              className="w-14 h-14 rounded-full object-contain"
            />
            <div>
              <p className="text-lg font-semibold">{donator_name}</p>
              <p className="text-sm font-semibold">{donator_email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mt-4">
            <div>
              <FaUsers className="text-2xl mx-auto" />
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
            <h3 className="text-xl font-semibold mb-2">Additional Notes</h3>
            <p className="text-gray-600">{additional_notes}</p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="w-full bg-linear-to-r from-[#BC1823] to-red-500 text-white py-2 rounded mt-4 cursor-pointer"
          >
            Request Food
          </button>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-96 relative">
              <h2 className="text-xl font-semibold text-center text-[#BC1823] mb-4">
                Food Request Form
              </h2>
              <form onSubmit={handleSubmitRequest} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Write Location</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full border rounded p-2 mt-1"
                    placeholder="Enter your location"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Why Need Food</label>
                  <textarea
                    required
                    value={formData.reason}
                    onChange={(e) =>
                      setFormData({ ...formData, reason: e.target.value })
                    }
                    className="w-full border rounded p-2 mt-1"
                    rows="3"
                    placeholder="Explain your reason"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Contact No.</label>
                  <input
                    type="text"
                    required
                    value={formData.contact}
                    onChange={(e) =>
                      setFormData({ ...formData, contact: e.target.value })
                    }
                    className="w-full border rounded p-2 mt-1"
                    placeholder="Enter your contact number"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-linear-to-r from-[#BC1823] to-red-500 text-white py-2 rounded mt-2"
                >
                  Submit Request
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-full border border-gray-400 text-gray-600 py-2 rounded mt-2 cursor-pointer"
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Requests Table */}
      {user?.email === donator_email && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-[#BC1823] mb-4 text-center">
            Food Requests
          </h2>
          <RequestTable
            requests={requests}
            setRequests={setRequests}
            onFoodDonated={() => setFood(null)}
          />
        </div>
      )}
    </div>
  );
};

export default FoodDetails;
