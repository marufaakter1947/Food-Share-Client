import React from "react";
import { Link, useRouteError } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import errorImage from "../assets/error404.avif";

const ErrorPage = () => {
  const error = useRouteError();
  const isNotFound = error?.status === 404;
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1 flex flex-col items-center justify-center text-center bg-gray-50 px-4">
        <img className="w-[400px] h-[345px] mt-5" src={errorImage} alt="" />
        <h2 className="text-2xl font-semibold mb-2">Oops! Page not found!</h2>
        <p className="text-gray-500 mb-4">
          {isNotFound
            ? "The page you are looking for is not available"
            : error?.message || "An unexpected error occurred"}
        </p>
        <Link
          to="/"
          className="btn  bg-[linear-gradient(125.07deg,#C5ADC5,#B2B5E0)] text-white font-semibold mb-4"
        >
          Go Back Home
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default ErrorPage;
