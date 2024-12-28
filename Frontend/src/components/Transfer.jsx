import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEthereum } from "react-icons/fa";
import { MdAccountBalanceWallet } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import sendEth from "./sendEth";
import Navbar from "./Navbar";

const Transfer = () => {
  const [senderAddress, setSenderAddress] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [ethAmount, setEthAmount] = useState("");

  const handleTransfer = () => {
    if (senderAddress && receiverAddress && ethAmount) {
      sendEth(senderAddress, receiverAddress, ethAmount);
    } else {
      alert("Please fill all the fields");
    }
  };

  return (
    <div>
      <Navbar />
      <motion.section
        className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6 flex items-center justify-center">
            <FaEthereum className="text-blue-600 mr-2" />
            Transfer ETH
          </h2>

          <form className="space-y-6">
            {/* Sender Address */}
            <div>
              <label
                htmlFor="sender-address"
                className="block text-sm font-medium text-gray-700"
              >
                Sender's Wallet Address
              </label>
              <div className="relative mt-1">
                <MdAccountBalanceWallet className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="text"
                  id="sender-address"
                  value={senderAddress}
                  onChange={(e) => setSenderAddress(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter sender's address"
                  required
                />
              </div>
            </div>

            {/* Receiver Address */}
            <div>
              <label
                htmlFor="receiver-address"
                className="block text-sm font-medium text-gray-700"
              >
                Receiver's Wallet Address
              </label>
              <div className="relative mt-1">
                <MdAccountBalanceWallet className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="text"
                  id="receiver-address"
                  value={receiverAddress}
                  onChange={(e) => setReceiverAddress(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter receiver's address"
                  required
                />
              </div>
            </div>

            {/* ETH Amount */}
            <div>
              <label
                htmlFor="eth-amount"
                className="block text-sm font-medium text-gray-700"
              >
                ETH Amount
              </label>
              <div className="relative mt-1">
                <FaEthereum className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="text"
                  id="eth-amount"
                  value={ethAmount}
                  onChange={(e) => setEthAmount(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter ETH amount"
                  required
                />
              </div>
            </div>

            {/* Transfer Button */}
            <motion.button
              onClick={(e) => {
                e.preventDefault();
                handleTransfer();
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded-lg shadow-lg hover:bg-blue-700 transition"
            >
              <IoMdSend className="mr-2" />
              Transfer Now
            </motion.button>
          </form>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Transfer;
