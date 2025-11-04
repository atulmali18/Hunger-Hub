import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Sign Up");
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false); // <-- loading state
  const { signup, login } = useAuth();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (currState === "Sign Up") {
        await signup(formData);
        toast.success("Signup successful!");
      } else {
        await login(formData);
        toast.success("Login successful!");
      }
      setShowLogin(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error, try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-96 p-6 relative animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-red-500">{currState}</h2>
          <img
            src={assets.cross_icon}
            alt="close"
            className="cursor-pointer"
            onClick={() => setShowLogin(false)}
          />
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {currState === "Sign Up" && (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Username"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          )}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-red-500 text-white font-semibold py-2 rounded-full hover:bg-red-600 transition flex justify-center items-center gap-2"
            disabled={loading} // disable button while loading
          >
            {loading ? (
              <span className="loader border-t-white border-t-2 w-4 h-4 rounded-full animate-spin"></span>
            ) : null}
            {loading ? "Processing..." : currState}
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
