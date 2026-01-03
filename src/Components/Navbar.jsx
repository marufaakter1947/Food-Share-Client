import { Link, NavLink } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

import { GoHomeFill } from "react-icons/go";
import { IoFastFoodSharp, IoLogIn, IoLogOut } from "react-icons/io5";
import { MdContactPhone, MdFoodBank } from "react-icons/md";
import { BiFoodMenu, BiSolidFoodMenu } from "react-icons/bi";
import { IoMdInformationCircle } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

import FoodShare from "../assets/Foodshare_Logo.png";
import logoImage from "../assets/Logo.png";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  return (
    <div className="navbar py-0 min-h-0 shadow-sm max-w-7xl rounded-xl sticky top-0 z-50 bg-[#F5F5F5]">
      
      {/* Navbar Start */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li><NavLink to={"/"}><GoHomeFill /> Home</NavLink></li>
            <li><NavLink to={"/available-foods"}><IoFastFoodSharp /> Available Foods</NavLink></li>
            <li><NavLink to={"/about-us"}><IoMdInformationCircle /> About Us</NavLink></li>
            <li><NavLink to={"/contact-us"}><MdContactPhone /> Contact Us</NavLink></li>
            <li><NavLink to={"/my-profile"}><CgProfile /> My Profile</NavLink></li>
          </ul>
        </div>
        <Link to={"/"} className="flex items-center justify-center gap-1">
          <img className="h-8 rounded-full" src={logoImage} alt="" />
          <img className="h-4" src={FoodShare} alt="" />
        </Link>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1 gap-3">
          <li><NavLink to={"/"}><GoHomeFill /> Home</NavLink></li>
          <li><NavLink to={"/available-foods"}><IoFastFoodSharp /> Available Foods</NavLink></li>
          <li><NavLink to={"/about-us"}><IoMdInformationCircle /> About Us</NavLink></li>
          <li><NavLink to={"/contact-us"}><MdContactPhone /> Contact Us</NavLink></li>
          <li><NavLink to={"/my-profile"}><CgProfile /> My Profile</NavLink></li>
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end gap-3">
        {user ? (
          <div className="dropdown dropdown-end z-50">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-9 border-2 border-gray-300 rounded-full">
                <img
                  alt="Avatar"
                  referrerPolicy="no-referrer"
                  src={user.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              <div className="pb-3 border-b border-b-gray-200">
                <li className="text-sm font-bold">{user.displayName}</li>
                <li className="text-xs">{user.email}</li>
              </div>
              <li className="mt-1"><Link to={"/add-food"}><MdFoodBank /> Add Food</Link></li>
              <li className="mt-1"><Link to={"/manage-my-foods"}><BiFoodMenu /> Manage My Foods</Link></li>
              <li className="mt-1"><Link to={"/my-food-request"}><BiSolidFoodMenu /> My Food Request</Link></li>
              <li>
                <button
                  onClick={signOutUser}
                  className="btn rounded mt-1 border-gray-300 btn-sm bg-linear-to-r from-[#BC1823] to-red-500 text-white"
                >
                  <IoLogOut /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to={"/login"}
            className="btn rounded border-gray-300 btn-sm bg-linear-to-r from-[#BC1823] to-red-500 text-white"
          >
            <IoLogIn /> Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
