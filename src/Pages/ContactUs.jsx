import React, { useState } from 'react';
import { FaLocationDot, FaPhoneVolume } from 'react-icons/fa6';
import { MdEmail, MdOutlineConnectWithoutContact } from 'react-icons/md';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, text: "", type: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showToast = (text, type = "success") => {
    setToast({ show: true, text, type });
    setTimeout(() => {
      setToast({ show: false, text: "", type: "" });
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      return showToast("Please fill all fields", "error");
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        showToast("Message sent successfully ", "success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        showToast("Failed to send message ", "error");
      }
    } catch (error) {
      showToast("Something went wrong ", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-linear-to-b from-[#f6dada] to-[#ffeaea] flex items-center justify-center px-4 py-4 mt-3 rounded-xl relative">

      {/* Toast */}
      {toast.show && (
        <div
          className={`absolute top-5 right-5 px-5 py-3 rounded-xl  shadow-lg
          ${toast.type === "success" ? "bg-green-100" : "bg-red-200"}`}
        >
          {toast.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full">

        {/* Left Content */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center gap-3">
            <MdOutlineConnectWithoutContact /> <span>Contact Us</span>
          </h1>

          <p className="text-gray-600 mb-6 text-lg">
            Have surplus food or need help? FoodShare connects communities to reduce food waste and spread kindness.
          </p>

          <div className="space-y-4">
            <p className="text-gray-700 flex items-center gap-1">
              <FaLocationDot /> Dhaka, Bangladesh
            </p>
            <p className="text-gray-700 flex items-center gap-1">
              <MdEmail /> foodshare@gmail.com
            </p>
            <p className="text-gray-700 flex items-center gap-1">
              <FaPhoneVolume /> +880 1609656133
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8 ">
          <h2 className="text-2xl font-semibold text-[#7d161d] mb-6 cursor-pointer">
            Send a Message
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Your Name"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7d161d]"
            />

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Your Email"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7d161d]"
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Your Message"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7d161d]"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-[#BC1823] to-red-500 text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default ContactUs;
