import { useState, useEffect } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  MetaMaskButton,
  useAccount,
  useSDK,
  useSignMessage,
} from "@metamask/sdk-react-ui";

function AppReady() {
  const [accounts, setAccounts] = useState([]); // State to store accounts
  const [chainId, setChainId] = useState(""); // Initialize as empty string
  const [error, setError] = useState(""); // State to store errors
  const [products, setProducts] = useState([]); // State for storing products
  const [loading, setLoading] = useState(false); // Loading state for API call
  const navigate = useNavigate();

  const {
    data: signData,
    isError: isSignError,
    isLoading: isSignLoading,
    isSuccess: isSignSuccess,
    signMessage,
  } = useSignMessage({
    message: "send eth", // Message to be signed
  });

  const { isConnected } = useAccount(); // Check if the wallet is connected

  // Function to fetch and display account details
  async function showDetails() {
    try {
      // Request the list of accounts from the user's MetaMask wallet
      const fetchedAccounts = await window.ethereum.request({
        method: "eth_accounts",
      });

      setAccounts(fetchedAccounts); // Update the accounts state
      setError(""); // Clear any previous errors
    } catch (err) {
      console.error("Error fetching accounts:", err);
      setError(
        "Failed to fetch account details. Check your MetaMask connection."
      );
    }

    try {
      const fetchedChainId = await window.ethereum.request({
        method: "eth_chainId",
      });

      setChainId(fetchedChainId); // Update the chainId state
      setError(""); // Clear any previous errors
    } catch (err) {
      console.error("Error fetching chainId:", err);
      setError("Failed to fetch ChainId. Check your MetaMask connection.");
    }
  }

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Set loading state to true
      try {
        const response = await axios.get(
          "http://localhost:8000/api/properties"
        );
        console.log("API Response:", response); // Log the full response to check the structure
        setProducts(response.data.data); // Assuming response.data is the array of products
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false); // Set loading state to false
      }
    };

    fetchProducts();
  }, []);

  // Log products when they change
  useEffect(() => {
    console.log("Products updated:", products); // Log products when they change
  }, [products]);

  // Handle the Buy button click
  const handleBuy = async (productId) => {
    console.log("productId", productId);
    try {
      // Make an API call to handle the purchase
      const response = await axios.post("http://localhost:8000/api/payment", {
        id: productId,
      });

      console.log("Purchase successful:", response.data);

      navigate("/transfer");

      // Navigate to the transfer page after successful purchase
    } catch (err) {
      console.error("Error during purchase:", err);
      setError("Failed to process purchase. Please try again.");
    }
  };

  const handleListPage = () => {
    navigate("/property");
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gradient-to-r from-blue-300 to-pink-500 pt-2">
      <header className="text-center">
        <MetaMaskButton theme={"light"} color="white" />
      </header>
      <div className="mt-3">
        <button
          className="bg-orange-600 text-white py-2 px-6 rounded-lg hover:bg-orange-800 transition duration-200 transform hover:scale-105"
          onClick={showDetails}
        >
          Show Account Details
        </button>
        {isConnected && (
          <div className="bg-white shadow-lg rounded-lg p-5 mt-5 w-full max-w-md">
            {accounts.length > 0 ? (
              accounts.map((account, index) => (
                <div key={index} className="mb-3">
                  <p className="font-medium">Account Address: {account}</p>
                  {chainId && (
                    <p className="text-sm text-gray-600">Chain ID: {chainId}</p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No accounts connected.</p>
            )}
            {error && <p className="text-red-500 mt-2">Error: {error}</p>}
          </div>
        )}
      </div>
      <div className="bg-white mt-4 mb-5">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          {loading ? (
            <div className="text-center text-lg">Loading products...</div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="group bg-gray-50 rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReztOW5GIRQWQGDXTODACup-bSCtAKxrYVMQ&s"
                    className="h-56 w-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded">
                        For Sale
                      </span>
                      <span className="text-lg font-bold text-green-800">
                        ₹
                        {product.price >= 100
                          ? (product.price / 100).toFixed(2) + " crores"
                          : parseFloat(product.price).toFixed(2) + " lakhs"}
                      </span>
                    </div>
                    <h3 className="mt-2 text-base font-semibold text-gray-900">
                      {product.propertyName}
                    </h3>
                    <p className="text-sm text-gray-600">{product.location}</p>
                    <div className="mt-4 flex items-center text-sm text-gray-700 space-x-4">
                      <span>
                        <i className="fas fa-bed"></i> {product.bhk} Beds
                      </span>
                      <span>
                        <i className="fas fa-bath"></i> {product.bath} Bath
                      </span>
                      <button
                        className="bg-green-600 px-4 w-20 h-10 text-white rounded-md"
                        onClick={() => handleBuy(product._id)} // Pass product ID to the handleBuy function
                      >
                        Buy
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No products available.</p>
          )}

          <div className="flex justify-center mt-7">
            <button className="btn btn-primary flex" onClick={handleListPage}>
              List Your Property
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function Wallet() {
  const { ready } = useSDK(); // Check if MetaMask SDK is ready

  if (!ready) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-medium">
        Loading...
      </div>
    ); // Show loading state until SDK is ready
  }

  return (
    <div>
      <Navbar />
      <AppReady />
    </div>
  );
}

export default Wallet;
