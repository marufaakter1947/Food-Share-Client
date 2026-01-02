import React from 'react';
import { FaHandsHelping, FaLeaf, FaUsers } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <section className="min-h-screen bg-linear-to-b from-[#fff5f5] to-[#ffecec] px-6 py-12 rounded-xl mt-3">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-[#7d161d] mb-4">
            About FoodShare
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            FoodShare is a community-driven platform dedicated to reducing food waste
            and helping those in need by connecting donors with people who need food.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Mission */}
          <div className="bg-white rounded-3xl shadow-lg p-8 text-center hover:shadow-xl transition">
            <FaHandsHelping className="text-4xl text-[#BC1823] mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
            <p className="text-gray-600">
              To minimize food waste by making food sharing easy, transparent,
              and accessible for everyone.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-3xl shadow-lg p-8 text-center hover:shadow-xl transition">
            <FaLeaf className="text-4xl text-[#BC1823] mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Our Vision</h3>
            <p className="text-gray-600">
              A world where no food is wasted and no one goes hungry due to lack
              of access.
            </p>
          </div>

          {/* Community */}
          <div className="bg-white rounded-3xl shadow-lg p-8 text-center hover:shadow-xl transition">
            <FaUsers className="text-4xl text-[#BC1823] mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-3">Our Community</h3>
            <p className="text-gray-600">
              We connect individuals, restaurants, and organizations to build
              a stronger, kinder community.
            </p>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-16 bg-white rounded-3xl shadow-xl p-10 text-center">
          <h2 className="text-2xl font-semibold text-[#7d161d] mb-4">
            Why FoodShare?
          </h2>
          <p className="text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Every day, large amounts of food are wasted while many people struggle
            to get a proper meal. FoodShare bridges this gap by creating a simple
            platform where surplus food can reach the right hands at the right time.
          </p>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;
