import React from "react";
import { motion } from "framer-motion";
import { FaHeart, FaLeaf, FaHandsHelping } from "react-icons/fa";

const OurMission = () => {
  return (
    <div className="my-20 bg-linear-to-b from-[#d38888] to-[#ffeaea] py-14 px-6 text-center rounded-2xl shadow-md">
      <motion.h2
        className="text-3xl font-bold text-center mb-2"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Our Mission
      </motion.h2>

      <motion.p
        className="text-center  mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        We strive to make a meaningful impact by reducing food waste and hunger.
        Our mission is to connect generous donors with people in need — building
        a circle of kindness, care, and sustainability.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 max-w-4xl mx-auto">
        <motion.div
          className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-xl transition-all duration-300"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <FaHeart className="text-5xl text-[#BC1823] mx-auto mb-3" />
          <h3 className="font-semibold text-gray-800">Share with Love</h3>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-xl transition-all duration-300"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <FaLeaf className="text-5xl text-[#BC1823] mx-auto mb-3" />
          <h3 className="font-semibold text-gray-800">Reduce Food Waste</h3>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-xl transition-all duration-300"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <FaHandsHelping className="text-5xl text-[#BC1823] mx-auto mb-3" />
          <h3 className="font-semibold text-gray-800">Support Communities</h3>
        </motion.div>
      </div>
    </div>
  );
};

export default OurMission;
