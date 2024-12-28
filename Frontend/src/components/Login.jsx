import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlesignin = () => {
    navigate("/signup");
  };

  const handleLogin = async () => {
    if (!email || !password) {
      console.error("Email and password are required.");
      alert("Please enter both email and password.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log("Login successful:", response.data);
        dispatch(addUser(response.data));

        navigate("/wallet");
      } else {
        console.error("Unexpected response:", response);
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error(
        "An error occurred:",
        error.response?.data || error.message
      );
      alert(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3,
        duration: 0.5,
      },
    }),
  };

  const textLines = [
    "Welcome to Propertize",
    "we designed to transform the way sensitive data is managed and shared.",
    "Experience the perfect blend of innovation and practicality as we empower businesses.",
  ];

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 flex flex-col justify-center items-center text-white p-8">
        {textLines.map((line, index) => (
          <motion.p
            key={index}
            custom={index}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className={`text-${
              index === 0 ? "5xl font-bold mb-4" : "lg text-center max-w-md"
            }`}
          >
            {line}
          </motion.p>
        ))}
      </div>

      {/* Right Section */}
      <div className="flex-1 bg-gradient-to-r from-purple-200 to-pink-400 flex flex-col justify-center items-center p-8">
        <div className="w-96 h-5/6  bg-gradient-to-r from-purple-500 to-pink-500 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            User Login
          </h2>

          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
            />
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 text-purple-500 border-gray-300 rounded focus:ring-0"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-white">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-white hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <motion.button
            onClick={handleLogin}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-white text-purple-500 py-2 rounded-lg font-semibold"
          >
            Login
          </motion.button>
          <div
            className="text-md text-center mt-3 font-semibold  text-white hover:underline"
            onClick={handlesignin}
          >
            Don't have account! SignUp
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

<div className="text-md text-center mt-3 font-semibold  text-white hover:underline">
  Don't have account! SignUp
</div>;
