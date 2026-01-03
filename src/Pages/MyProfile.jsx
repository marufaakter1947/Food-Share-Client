import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { ImCross } from "react-icons/im";
import { updateProfile } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";
import profileBg from "../assets/profile-bg.png"

// import { div } from "framer-motion/client";


const MyProfile = () => {
  const { user, setUser, loading } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
    photo: "",
    _id: "",
  });
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Fetch profile from backend when user is logged in
  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/users?email=${user.email}`
        );
        console.log("Backend user:", res.data);
        if (res.data && res.data.length > 0) {
          setProfile(res.data[0]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);

    setProfile((prev) => ({
      ...prev,
      photoPreview: preview,
      photoFile: file,
    }));
  };
  const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await axios.post(
    `https://api.imgbb.com/1/upload?key=3e9a821948ab927717a3b1825cd7f54a`,
    formData
  );

  return res.data.data.url;
};

const handleSave = async () => {
  try {
    setSaving(true);

    let photoURL = profile.photo;

    if (profile.photoFile) {
      photoURL = await uploadImage(profile.photoFile);
    }

    const res = await axios.put(
      `http://localhost:3000/users/${profile._id}`,
      {
        name: profile.name,
        bio: profile.bio,
        photo: photoURL,
      }
    );

    // Update Firebase profile
    await updateProfile(auth.currentUser, {
      displayName: res.data.name,
      photoURL: res.data.photo,
    });

    // Update AuthContext user instantly
    setUser({
      ...auth.currentUser,
      displayName: res.data.name,
      photoURL: res.data.photo,
    });

    toast.success("Profile updated");
    setShowModal(false);
  } catch (err) {
    console.error(err);
    toast.error("Update failed");
  } finally {
    setSaving(false);
  }
};


  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please login to see your profile</p>;

  return (
    <div className="px-6 py-12 rounded-xl mt-3 bg-cover bg-center relative"
  style={{ backgroundImage: `url(${profileBg})` }} >
       
         <div className="max-w-3xl mx-auto p-6 bg-opacity-90 bg-white shadow-md rounded-xl mt-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#BC1823]">My Profile</h2>
        <button
          className=" btn rounded bg-linear-to-r from-[#BC1823] to-red-500 text-white btn-sm"
          onClick={() => setShowModal(true)}
        >
          Update Profile
        </button>
      </div>

      {/* Display profile info */}
      <div className="flex items-center mb-4">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300">
          <img
            src={
              profile.photo ||
              user.photoURL ||
              "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            }
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-4">
          <p className="font-bold">Name : {profile.name || user.displayName}</p>
          <p className="text-gray-600 text-sm">Email Address : {profile.email || user.email}</p>
          <p className="text-gray-500 text-sm">{profile.bio}</p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <h3 className="text-lg font-bold mb-4 text-[#BC1823]">
              Update Profile
            </h3>

            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 cursor-pointer"
              onClick={() => setShowModal(false)}
            >
              <ImCross />
            </button>

            {/* Photo */}
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300">
                <img
                  src={profile.photoPreview || profile.photo || user.photoURL}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="ml-3 text-sm cursor-pointer"
              />
            </div>

            {/* Name */}
            <div className="mb-3">
              <label className="block text-gray-700 text-sm mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#BC1823]"
              />
            </div>

            {/* Bio */}
            <div className="mb-3">
              <label className="block text-gray-700 text-sm mb-1">Bio</label>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                rows="2"
                className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#BC1823]"
              />
            </div>

            <button
              className="bg-[#BC1823] text-white px-4 py-1 rounded hover:bg-red-700 text-sm cursor-pointer"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      )}
    </div>
       
    </div>
  );
};

export default MyProfile;
