import React, { useState } from "react";
import { assets } from "../../assets/assets";

const LoginPopup = ({setShowLogin}) => {
  const [currState, setCurrState] = useState("Sign Up");
  console.log(currState);
  

  return (
    <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-96 p-6 relative animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-red-500">{currState}</h2>
          <img
            src={assets.cross_icon}
            className="text-gray-500 hover:text-red-500 text-xl font-bold"
            onClick={() => setShowLogin(false)}
            />            
        </div>

        {/* Form */}
        <form className="space-y-4">
          {currState === "Sign Up" && (
            <div>
              <input
                type="text"
                placeholder="Username"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
          )}

          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white font-semibold py-2 rounded-full hover:bg-red-600 transition"
          >
            {currState}
          </button>
        </form>

      {/* Toggle Auth State */}
<div className="mt-4 text-center text-sm text-gray-600">
  {currState === "Sign Up" ? (
    <p>
      Already have an account?{" "}
      <span
        onClick={() => setCurrState("Log In")}
        className="text-red-500 font-medium cursor-pointer hover:underline"
      >
        Log In
      </span>
    </p>
  ) : (
    <p>
      Don't have an account?{" "}
      <span
        onClick={() => setCurrState("Sign Up")}
        className="text-red-500 font-medium cursor-pointer hover:underline"
      >
        Sign Up
      </span>
    </p>
  )}
</div>

      </div>
    </div>
  );
};

export default LoginPopup;
