import { NavLink, Outlet, Link } from "react-router";
import { MdDashboard, MdFoodBank } from "react-icons/md";
import { BiFoodMenu, BiSolidFoodMenu } from "react-icons/bi";
import { IoLogOut } from "react-icons/io5";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import logoImage from "../assets/Logo.png";
import FoodShare from "../assets/Foodshare_Logo.png";

const DashboardLayout = () => {
  const { signOutUser } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex bg-gray-100 overflow-x-hidden">
      {/* ===== Sidebar ===== */}
      <aside className="w-64 bg-white shadow-lg flex flex-col justify-between">
        <div>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 p-4 border-b">
            <img src={logoImage} className="h-8 rounded-full" />
            <img src={FoodShare} className="h-4" />
          </Link>

          {/* Menu */}
          <ul className="menu p-4 gap-2">
            <li>
              <NavLink end to="/dashboard">
                <MdDashboard /> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/add-food">
                <MdFoodBank /> Add Food
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/manage-my-foods">
                <BiFoodMenu /> Manage My Foods
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/my-food-request">
                <BiSolidFoodMenu /> My Food Request
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Logout */}
        <div className="p-4 border-t">
          <button
            onClick={signOutUser}
            className="btn w-full bg-linear-to-r from-[#BC1823] to-red-500 text-white"
          >
            <IoLogOut /> Logout
          </button>
        </div>
      </aside>

      {/* ===== Main Content ===== */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
