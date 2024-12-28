import React from "react";
import { motion } from "framer-motion";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Getdetails = () => {
  const message = useSelector((store) => store.asset.message);
  const txHash = useSelector((store) => store.asset.txHash);
  const navigate = useNavigate(); // Hook to navigate between routes

  const handleDoneClick = () => {
    navigate("/wallet"); // Navigate to the Wallet page
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-400">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="bg-white p-6 rounded-lg shadow-lg w-96"
        >
          <div className="flex justify-center mb-4">
            <AiOutlineCheckCircle className="text-green-500" size={50} />
          </div>
          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
            Transaction Details
          </h1>
          <div className="mb-4">
            <p className="text-gray-600 font-medium">Message:</p>
            <p className="text-lg text-gray-800 p-2 bg-gray-50 rounded-md">
              {message || "No message available"}
            </p>
          </div>
          <div className="mb-4">
            <p className="text-gray-600 font-medium">Transaction Hash:</p>
            <p
              className="text-lg text-gray-800 p-2 bg-gray-50 rounded-md overflow-hidden text-ellipsis"
              title={txHash}
            >
              {txHash || "No transaction hash available"}
            </p>
          </div>
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleDoneClick}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Getdetails;
