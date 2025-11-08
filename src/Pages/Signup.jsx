import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const Signup = () => {
  const { createUser, updateUserProfile, signInWithGoogle } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();
    const displayName = event.target.displayName.value;
    const photoURL = event.target.photoURL.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    toast.loading("Creating user...", { id: "create-user" });

    createUser(email, password)
      .then(() => {
        updateUserProfile(displayName, photoURL);
        toast.success("User created successfully!", { id: "create-user" });
        // console.log(result.user);
        
        event.target.reset();
        navigate("/"); 
      })
      .catch((error) => {
        toast.error(error.message, { id: "create-user" });
      });
  };

  const handleGoogleSignIn = () => {
    toast.loading("Creating user...", { id: "create-user" });
    signInWithGoogle()
      .then(() => {
        toast.success("User created successfully!", { id: "create-user" });
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message, { id: "create-user" });
      });
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-3xl font-bold text-center">Register</h1>
        <form onSubmit={handleRegister}>
          <fieldset className="fieldset">
            <label className="label">Name</label>
            <input
              type="text"
              name="displayName"
              className="input rounded focus:border-0 focus:outline-gray-200"
              placeholder="Name"
              required
            />

            <label className="label">Photo URL</label>
            <input
              type="text"
              name="photoURL"
              className="input rounded focus:border-0 focus:outline-gray-200"
              placeholder="Photo URL"
              required
            />

            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              className="input rounded focus:border-0 focus:outline-gray-200"
              placeholder="Email"
              required
            />

            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              className="input rounded focus:border-0 focus:outline-gray-200"
              placeholder="Password"
              required
            />

            <button className="btn text-white mt-4 rounded bg-linear-to-r from-[#BC1823] to-red-500">
              Register
            </button>
          </fieldset>
        </form>

        <button
          onClick={handleGoogleSignIn}
          className="btn rounded border-gray-300 mt-3"
        >
          <FcGoogle size={20} />
          Continue with Google
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
  );
};

export default Signup;
