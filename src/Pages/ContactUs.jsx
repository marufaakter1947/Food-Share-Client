import React from 'react';
import { FaLocationDot, FaPhoneVolume } from 'react-icons/fa6';
import { MdEmail, MdOutlineConnectWithoutContact } from 'react-icons/md';

const ContactUs = () => {
  return (
    <section className=" min-h-screen bg-linear-to-b from-[#f6dada] to-[#ffeaea] flex items-center justify-center px-4 py-4 mt-3 rounded-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full">
        {/* Left Content */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold  mb-4 flex  items-center gap-3">
           <MdOutlineConnectWithoutContact /> <span>Contact Us</span> 
          </h1>
          <p className="text-gray-600 mb-6 text-lg">
            Have surplus food or need help? FoodShare connects communities to reduce food waste and spread kindness.
          </p>

          <div className="space-y-4">
            <p className="text-gray-700 flex items-center gap-1"><FaLocationDot /> Dhaka, Bangladesh</p>
            <p className="text-gray-700 flex items-center gap-1"><MdEmail /> foodshare@gmail.com</p>
            <p className="text-gray-700 flex items-center gap-1"> <FaPhoneVolume /> +880 1234 567 890</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-[#7d161d] mb-6">Send a Message</h2>
          <form className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7d161d]"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7d161d]"
            />

            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#7d161d]"
            />

            <button
              type="submit"
              className="w-full bg-linear-to-r from-[#BC1823] to-red-500 text-white font-semibold py-3 rounded-xl transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
