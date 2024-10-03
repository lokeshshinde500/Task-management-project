// SignUp.js
import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "../Redux/features/AuthSlice";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/login",
        {
          ...formData,
        }
      );

      toast.success(response.data.message, {
        position: "bottom-right",
      });

      // Use dispatch to set the token
      dispatch(setToken(response.data.token));
      localStorage.setItem('token', response.data.token);

      if (response.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred", {
        position: "bottom-right",
      });
    } finally {
      setFormData({
        email: "",
        password: "",
        role: "",
      });

      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <h2 className="text-2xl text-green-600 mb-4 text-center">Login</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <div className="flex items-center border border-gray-300 rounded-md p-2">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full focus:outline-none"
              required
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Password</label>
          <div className="flex items-center border border-gray-300 rounded-md p-2">
            <FaLock className="text-gray-500 mr-2" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full focus:outline-none"
              required
              placeholder="Enter your password"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
          >
            <option value="">--select-role--</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
        >
          {loading ? "Loading..." : "Login"}
        </button>
        <div className="mt-3 text-center flex justify-between items-center">
          <p className="text-sm text-gray-500">New User?</p>
          <Link to={"/signup"} className="text-sm text-green-500">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
