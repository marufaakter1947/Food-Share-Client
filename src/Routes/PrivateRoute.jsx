import { use } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { CircleLoader } from "react-spinners";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);

  if (loading) {
    return <div><CircleLoader /></div>;
  }

  if (!user) {
    return <Navigate state={location?.pathname} to="/login"></Navigate>;
  }

  return children;
};

export default PrivateRoute;
