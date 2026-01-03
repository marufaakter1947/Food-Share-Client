// import { createBrowserRouter } from "react-router";
// import MainLayout from "../Layout/MainLayout";
// import ErrorPage from "../Pages/ErrorPage";
// import Home from "../Pages/Home";
// // import Login from "../Pages/Login";
// import Signup from "../Pages/Signup";
// import AvailableFoods from "../Pages/AvailableFoods";
// import Login from "../Pages/Login";
// import AddFood from "../Pages/AddFood";
// import ManageMyFoods from "../Pages/ManageMyFoods";
// import MyFoodRequest from "../Pages/MyFoodRequest";
// import PrivateRoute from "./PrivateRoute";
// import FoodDetails from "../Pages/FoodDetails";
// import UpdateFood from "../Pages/UpdateFood";
// import FeaturedFoods from "../Components/FeaturedFoods";
// import Loading from "../Pages/Loading";
// import AboutUs from "../Pages/AboutUs";
// import ContactUs from "../Pages/ContactUs";
// import MyProfile from "../Pages/MyProfile";
// import DashboardLayout from "../Pages/DashboardLayout";
// import DashboardHome from "../Pages/DashboardHome";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <MainLayout></MainLayout>,
//     errorElement: <ErrorPage></ErrorPage>,
//     hydrateFallbackElement: <Loading></Loading>,
//     children: [
//       {
//         index: true,
//         element: <Home></Home>,
//       },
//       {
//         path: "/login",
//         element: <Login></Login>,
//       },
//       {
//         path: "/signup",
//         element: <Signup></Signup>,
//       },
//       {
//         path: "/available-foods",
//         element: <AvailableFoods></AvailableFoods>,
//         loader: () =>
//           fetch(`https://food-share-server-rust.vercel.app/all-foods`),
//       },
//        {
//         path: "/about-us",
//         element: <AboutUs></AboutUs>,
//       },
//        {
//         path: "/contact-us",
//         element: <ContactUs></ContactUs>
//       },
//       {
//         path: "/my-profile",
//         element: (
//           <PrivateRoute>
//             <MyProfile />
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "/featured-foods",
//         element: <FeaturedFoods></FeaturedFoods>,
//       },
//       {
//         path: "/food-details/:id",
//         element: (
//             <FoodDetails />
//         ),
//       },
//       {
//         path: "/add-food",
//         element: (
//           <PrivateRoute>
//             <AddFood />
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "/manage-my-foods",
//         element: (
//           <PrivateRoute>
//             <ManageMyFoods />
//           </PrivateRoute>
//         ),
//       },
//       {
//   path: "/dashboard",
//   element: (
//     <PrivateRoute>
//       <DashboardLayout />
//     </PrivateRoute>
//   ),
//   children: [
//     { index: true, element: <DashboardHome /> },
//     { path: "add-food", element: <AddFood /> },
//     { path: "manage-my-foods", element: <ManageMyFoods /> },
//     { path: "my-food-request", element: <MyFoodRequest /> },
//   ],
// }

// ,
//       {
//         path: "/update-food/:id",
//         element: (
//           <PrivateRoute>
//             <UpdateFood />
//           </PrivateRoute>
//         ),
//       },
//       {
//         path: "/my-food-request",
//         element: (
//           <PrivateRoute>
//             <MyFoodRequest />
//           </PrivateRoute>
//         ),
//       },
//     ],
//   },
// ]);

// export default router;
import { createBrowserRouter } from "react-router";

import MainLayout from "../Layout/MainLayout";
import DashboardLayout from "../Pages/DashboardLayout";

import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import AvailableFoods from "../Pages/AvailableFoods";
import AboutUs from "../Pages/AboutUs";
import ContactUs from "../Pages/ContactUs";
import FeaturedFoods from "../Components/FeaturedFoods";
import FoodDetails from "../Pages/FoodDetails";
import MyProfile from "../Pages/MyProfile";

import AddFood from "../Pages/AddFood";
import ManageMyFoods from "../Pages/ManageMyFoods";
import MyFoodRequest from "../Pages/MyFoodRequest";
import UpdateFood from "../Pages/UpdateFood";
import DashboardHome from "../Pages/DashboardHome";

import PrivateRoute from "./PrivateRoute";
import Loading from "../Pages/Loading";

const router = createBrowserRouter([
  // ================= MAIN SITE =================
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <Loading />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },

      {
        path: "available-foods",
        element: <AvailableFoods />,
        loader: () =>
          fetch("https://food-share-server-rust.vercel.app/all-foods"),
      },

      { path: "about-us", element: <AboutUs /> },
      { path: "contact-us", element: <ContactUs /> },
      { path: "featured-foods", element: <FeaturedFoods /> },
      { path: "food-details/:id", element: <FoodDetails /> },

      {
        path: "my-profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
    ],
  },

  // ================= DASHBOARD =================
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "add-food", element: <AddFood /> },
      { path: "manage-my-foods", element: <ManageMyFoods /> },
      { path: "my-food-request", element: <MyFoodRequest /> },
      { path: "update-food/:id", element: <UpdateFood /> },
    ],
  },
]);

export default router;
