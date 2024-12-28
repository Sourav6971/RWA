// hardhat.config.js
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // to load .env file

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_API_URL, // Alchemy API URL for Sepolia
      accounts: [`0x${process.env.PRIVATE_KEY}`], // Your wallet private key (make sure it's correct)
    },
  },
};
