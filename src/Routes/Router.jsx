import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
// import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import AvailableFoods from "../Pages/AvailableFoods";
import Login from "../Pages/Login";
import AddFood from "../Pages/AddFood";
import ManageMyFoods from "../Pages/ManageMyFoods";
import MyFoodRequest from "../Pages/MyFoodRequest";
import PrivateRoute from "./PrivateRoute";
import FoodDetails from "../Pages/FoodDetails";
import UpdateFood from "../Pages/UpdateFood";
import FeaturedFoods from "../Components/FeaturedFoods";
import Loading from "../Pages/Loading";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    hydrateFallbackElement: <Loading></Loading>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
      {
        path: "/available-foods",
        element: <AvailableFoods></AvailableFoods>,
        loader: () => fetch(`http://localhost:3000/all-foods`),
      },
      {
        path: "/featured-foods",
        element: <FeaturedFoods></FeaturedFoods>,
      },
      {
        path: "/food-details/:id",
        element: (
          <PrivateRoute>
            <FoodDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-food",
        element: (
          <PrivateRoute>
            <AddFood />
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-my-foods",
        element: (
          <PrivateRoute>
            <ManageMyFoods />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-food/:id",
        element: (
          <PrivateRoute>
            <UpdateFood />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-food-request",
        element: (
          <PrivateRoute>
            <MyFoodRequest />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
