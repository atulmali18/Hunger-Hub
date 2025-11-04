import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { admin, login, loading: authLoading } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (admin) navigate("/orders");
  }, [admin, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("Enter email and password");
      return;
    }

    setLoading(true);
    try {
      const res = await login(form.email, form.password);
      if (res.ok) {
        navigate("/orders");
      } else {
        // login already shows toast in context, but keep fallback
        toast.error(res.error?.message || "Login failed");
      }
    } catch (err) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const disabled = loading || authLoading;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Toaster position="top-right" />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Admin Sign in</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={disabled}
            className={`w-full py-2 rounded-lg text-white font-medium transition ${disabled ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
              }`}
          >
            {disabled ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-4 text-center">
          Back to <Link to="/" className="text-indigo-600 hover:underline">frontend</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;