import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import { addAsset } from "../utils/assetSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Model = () => {
  const price = useSelector((store) => store.property?.predicted_price);
  const location = useSelector((store) => store.property?.input_data?.location);
  const bhk = useSelector((store) => store.property.input_data.bhk);
  const bath = useSelector((store) => store.property.input_data.bath);
  const formattedPrice = price ? price.toFixed(3) : null;

  const [propertyName, setPropertyName] = useState("");
  const [totalShares, setTotalShares] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleclose = () => {
    navigate("/wallet");
  };

  const handleFormSubmit = async () => {
    if (!propertyName || !totalShares) {
      alert("Please enter both name and share.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/deploy",
        { propertyName, totalShares, price, location, bhk, bath },
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert("Contract deployed successfully.");
        dispatch(addAsset(response.data));
        navigate("/userDetails");
      } else {
        alert("Deploy failed. Please check your credentials.");
      }
    } catch (error) {
      alert(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div>
      <Navbar />
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-500">
        <motion.div
          className="modal modal-open"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <div className="modal-box relative max-w-lg w-full p-8 bg-white rounded-lg shadow-2xl">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800">
                Let's tokenize !
              </h1>
              <p className="text-gray-500 mt-2">
                {price && (
                  <>
                    Predicted price for your asset is{" "}
                    <span className="text-lg font-bold text-green-800">
                      ₹
                      {formattedPrice >= 100
                        ? (formattedPrice / 100).toFixed(2) + " crores"
                        : parseFloat(formattedPrice).toFixed(2) + " lakhs"}
                    </span>
                    .
                  </>
                )}
              </p>
            </div>

            <div className="mt-6">
              <div className="mb-4">
                <input
                  type="text"
                  id="name"
                  value={propertyName}
                  onChange={(e) => setPropertyName(e.target.value)}
                  className="w-full p-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 text-gray-900 placeholder-gray-500"
                  placeholder="Enter Nick Name for your property"
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  id="share"
                  value={totalShares}
                  onChange={(e) => setTotalShares(e.target.value)}
                  className="w-full p-4 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 text-gray-900 placeholder-gray-500"
                  placeholder="Number of shares"
                />
              </div>

              <motion.button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg rounded-lg hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-purple-400 shadow-md"
                onClick={handleFormSubmit}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Submit
              </motion.button>

              <div className="flex justify-center mt-4">
                <motion.button
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-md"
                  onClick={handleclose}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Model;
