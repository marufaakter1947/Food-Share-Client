


import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { CircleLoader } from "react-spinners";
import { auth } from "../Firebase/Firebase.config";

const Signup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { createUser, updateUserProfile, signInWithGoogle, setUser, setLoading } =
    useContext(AuthContext);

  const location = useLocation();
  const from = location.state || "/";

  const handleRegister = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const displayName = e.target.displayName.value;
    const photoURL = e.target.photoURL.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    // console.log(displayName,photoURL,email,password);
    
    if (password.length < 6) {
      toast.error("Length must be at least 6 characters.");
      return setIsSubmitting(false);
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      toast.error("Must have an Uppercase letter.");
      return setIsSubmitting(false);
    }
    if (!/(?=.*[a-z])/.test(password)) {
      toast.error("Must have a Lowercase letter.");
      return setIsSubmitting(false);
    }

    createUser(email, password)
      .then(() => {
        updateUserProfile(displayName, photoURL)
          .then(() => {
            setUser({ ...auth.currentUser });
            setLoading(false);
            toast.dismiss();
            toast.success("Signup Successful ");
            navigate("/");
          })
          .catch((error) => toast.error(error.message));
      })
      .catch((error) => toast.error(error.message))
      .finally(() => setIsSubmitting(false));
  };

  const handleGoogleSignIn = () => {
    setIsSubmitting(true);
    signInWithGoogle()
      .then((res) => {
        setUser(res.user);
        setLoading(false);
        toast.dismiss();
        toast.success("Signin Successful ");
        navigate(from);
      })
      .catch((error) => toast.error(error.message))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div>
      {isSubmitting ? (
        <div className="flex justify-center items-center h-[80vh]">
          <CircleLoader />
        </div>
      ) : (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shadow-2xl mt-10">
          <div className="card-body">
            <h1 className="text-3xl font-bold text-center">Register</h1>
            <form onSubmit={handleRegister}>
              <fieldset className="fieldset">
                <label className="label">Name</label>
                <input
                  type="text"
                  name="displayName"
                  className="input rounded focus:outline-gray-200"
                  placeholder="Name"
                  required
                />

                <label className="label">Photo URL</label>
                <input
                  type="text"
                  name="photoURL"
                  className="input rounded focus:outline-gray-200"
                  placeholder="Photo URL"
                  required
                />

                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input rounded focus:outline-gray-200"
                  placeholder="Email"
                  required
                />

                <label className="label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="input rounded focus:outline-gray-200"
                  placeholder="Password"
                  required
                />

                <button
                  type="submit"
                  className="btn text-white mt-4 rounded bg-linear-to-r from-[#BC1823] to-red-500"
                >
                  Register
                </button>
              </fieldset>
            </form>

            <button
              onClick={handleGoogleSignIn}
              className="btn rounded border-gray-300 mt-3"
            >
              <FcGoogle size={20} />
              Login with Google
            </button>

            <p className="text-center mt-2">
              Already have an account?{" "}
              <Link
                className="text-[#BC1823] hover:text-blue-800 hover:underline"
                to="/login"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
