import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/signup",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (response.status === 201) {
        const data = response.data;
        console.log("Signup successful:", data);
        alert("Signup successful!");
        navigate("/login");
      } else {
        console.error("Signup failed:", response.data);
        alert("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred. Please try again later.");
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
    "Create Your Account",
    "Join us and explore amazing features.",
    "Sign up now to get started!",
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
              index === 0 ? "4xl font-bold mb-4" : "lg text-center max-w-md"
            }`}
          >
            {line}
          </motion.p>
        ))}
      </div>

      {/* Right Section */}
      <div className="flex-1 bg-gradient-to-r from-purple-200 to-pink-300  flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-sm bg-gradient-to-r from-purple-500 to-pink-500 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Signup
          </h2>

          <form onSubmit={handleSignup}>
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

            {/* Signup Button */}
            <motion.button
              type="submit"
              className="w-full bg-white text-purple-500 py-2 rounded-lg font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Signup
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center justify-center my-4">
            <hr className="w-full border-gray-400" />
            <span className="px-2 text-white text-sm">or</span>
            <hr className="w-full border-gray-400" />
          </div>

          {/* Social Signup Buttons */}
          <div className="space-y-3">
            <button className="flex items-center justify-center w-full py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition">
              <img
                src="https://img.icons8.com/color/20/000000/google-logo.png"
                alt="Google"
                className="mr-2"
              />
              Signup with Google
            </button>
            <button className="flex items-center justify-center w-full py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition">
              <img
                src="https://img.icons8.com/color/20/000000/facebook-new.png"
                alt="Facebook"
                className="mr-2"
              />
              Signup with Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
