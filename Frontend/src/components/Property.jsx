import React, { useState, useEffect } from "react";
import locationsData from "../assets/column.json";
import { addProperty } from "../utils/propertySlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

function Property() {
  const [locationInput, setLocationInput] = useState("");
  const [bhk, setBhk] = useState("");
  const [total_sqft, setTotal_sqft] = useState("");
  const [bath, setBath] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (locationInput) {
      const filtered = locationsData.data_columns.filter((location) =>
        location.toLowerCase().includes(locationInput.toLowerCase())
      );
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations([]);
    }
  }, [locationInput]);

  const handleLocationSelect = (location) => {
    setLocationInput(location);
    setFilteredLocations([]);
  };

  const handleSubmitProperty = async (event) => {
    event.preventDefault();

    if (!locationInput || !total_sqft || !bath || !bhk) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://price-prediction-1-2s5w.onrender.com",
        { total_sqft, bath, bhk, location: locationInput },
        { withCredentials: true }
      );

      if (response) {
        dispatch(addProperty(response.data));
        navigate("/model");
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen flex items-center justify-center">
        <div className="max-w-6xl w-full bg-white rounded-lg shadow-lg flex overflow-hidden relative">
          {/* Left Section */}
          <div className="w-1/2 p-5 bg-gradient-to-br from-purple-600 to-pink-600 text-white flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-4">
              Welcome to Property Portal
            </h1>
            <p className="text-lg">
              Discover the perfect platform to list your property and know your
              estimated price!
            </p>
          </div>
          {/* Right Section */}
          <div className="w-1/2 p-10">
            <h2 className="mb-4 text-2xl font-bold text-gray-800 text-center">
              Add a New Property
            </h2>
            <form onSubmit={handleSubmitProperty}>
              <div className="space-y-4 text-black">
                <div>
                  <label
                    htmlFor="location"
                    className="block mb-1 text-sm font-medium text-gray-700"
                  >
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    className="w-full bg-gray-100 border border-gray-300 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 p-2"
                    placeholder="Start typing location..."
                    required
                  />
                  {filteredLocations.length > 0 && (
                    <ul className="bg-white border border-gray-300 rounded-lg shadow-lg mt-2 max-h-40 overflow-y-auto">
                      {filteredLocations.map((location, index) => (
                        <li
                          key={index}
                          onClick={() => handleLocationSelect(location)}
                          className="p-2 cursor-pointer hover:bg-purple-100"
                        >
                          {location}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="total_sqft"
                    className="block mb-1 text-sm font-medium text-gray-700"
                  >
                    Area (sq. ft.)
                  </label>
                  <input
                    type="text"
                    name="total_sqft"
                    id="total_sqft"
                    value={total_sqft}
                    onChange={(e) => setTotal_sqft(e.target.value)}
                    className="w-full bg-gray-100 border border-gray-300 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 p-2"
                    placeholder="Enter area in sq. ft."
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="bath"
                    className="block mb-1 text-sm font-medium text-gray-700"
                  >
                    Bathrooms
                  </label>
                  <input
                    type="text"
                    name="bath"
                    id="bath"
                    value={bath}
                    onChange={(e) => setBath(e.target.value)}
                    className="w-full bg-gray-100 border border-gray-300 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 p-2"
                    placeholder="Number of bathrooms"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="bhk"
                    className="block mb-1 text-sm font-medium text-gray-700"
                  >
                    BHK
                  </label>
                  <input
                    type="text"
                    name="bhk"
                    id="bhk"
                    value={bhk}
                    onChange={(e) => setBhk(e.target.value)}
                    className="w-full bg-gray-100 border border-gray-300 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 p-2"
                    placeholder="Number of BHK"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-6 py-2 text-white bg-purple-600 rounded-lg shadow-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-400 transition duration-300"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Add Property"}
              </button>
            </form>
          </div>
          {/* Loader */}
          {loading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="loader border-t-4 border-purple-600 rounded-full w-12 h-12 animate-spin"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Property;
