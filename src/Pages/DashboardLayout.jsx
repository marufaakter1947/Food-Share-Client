import { NavLink, Outlet, Link } from "react-router";
import { MdDashboard, MdFoodBank, MdMenu } from "react-icons/md";
import { BiFoodMenu, BiSolidFoodMenu } from "react-icons/bi";
import { IoLogOut, IoClose } from "react-icons/io5";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import logoImage from "../assets/Logo.png";
import FoodShare from "../assets/Foodshare_Logo.png";

const DashboardLayout = () => {
  const { signOutUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen flex bg-gray-100 overflow-hidden">
      {/* Mobile overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
  className={`fixed lg:static z-50 top-0 left-0 h-screen w-64 bg-white shadow-lg
  flex flex-col justify-between overflow-hidden
  transform transition-transform duration-300
  ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
>

  <div className="flex flex-col h-full">
    
    {/* Logo */}
    <Link
      to="/"
      className="flex items-center gap-2 p-4 border-b shrink-0"
      onClick={() => setOpen(false)}
    >
      <img src={logoImage} className="h-8 rounded-full" />
      <img src={FoodShare} className="h-4" />
    </Link>

    {/* Menu*/}
    <ul className="menu p-4 gap-2 flex-1 overflow-y-auto">
      <li>
        <NavLink end to="/dashboard" onClick={() => setOpen(false)}>
          <MdDashboard /> Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/add-food" onClick={() => setOpen(false)}>
          <MdFoodBank /> Add Food
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manage-my-foods" onClick={() => setOpen(false)}>
          <BiFoodMenu /> Manage My Foods
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/my-food-request" onClick={() => setOpen(false)}>
          <BiSolidFoodMenu /> My Food Request
        </NavLink>
      </li>
    </ul>

    {/* Logout */}
    <div className="p-4 border-t shrink-0">
      <button
        onClick={signOutUser}
        className="btn w-full bg-gradient-to-r from-[#BC1823] to-red-500 text-white"
      >
        <IoLogOut /> Logout
      </button>
    </div>

  </div>
</aside>


    
      <div className="flex-1 flex flex-col">
        {/* Mobile Top Bar */}
        <div className="lg:hidden bg-white shadow px-4 py-3 flex items-center justify-between">
          <button onClick={() => setOpen(!open)}>
            {open ? <IoClose size={22} /> : <MdMenu size={22} />}
          </button>
          <span className="font-semibold">Dashboard</span>
        </div>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
