const express = require("express");
const router = express.Router();
const { deployContract } = require("../../scripts/deploy");
const { run } = require("hardhat"); // To ensure Hardhat runtime is available
const { transferShares } = require("../../scripts/transaction");
const getSharesBalance = require("../../scripts/shares");
const Property = require("./../../BackEnd/models/propertyModel");

router.post("/", async (req, res) => {
  try {
    const { propertyName, totalShares, price, location, bhk, bath } = req.body;

    // Validate input
    if (!propertyName || !totalShares) {
      return res
        .status(400)
        .json({ error: "Property name and total shares are required" });
    }

    // Ensure Hardhat runtime is initialized
    await run("compile");

    // Deploy the contract
    const deploymentDetails = await deployContract(propertyName, totalShares);

    const { contractAddress, txHash } = deploymentDetails;

    const data = await Property.create({
      propertyName,
      totalShares,
      contractAddress,
      price,
      bath,
      bhk,
      location,
    });
    console.log("data saved");
    // Return success response
    res.status(200).json({
      message: "Contract deployed successfully",
      //address: deploymentDetails.address,
      txHash: deploymentDetails.txHash,
      contractAddress: deploymentDetails.contractAddress,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to deploy contract", details: error.message });
  }
});
router.post("/transfer", async (req, res) => {
  try {
    console.log(process.env.ALCHEMY_API_URL);
    const { contractAddress, fromPrivateKey, toAddress, shares } = req.body;

    // Ensure all fields are provided
    if (!contractAddress || !fromPrivateKey || !toAddress || !shares) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // Convert shares to number (make sure it's a valid number)
    const numShares = Number(shares);
    if (isNaN(numShares) || numShares <= 0) {
      return res.status(400).json({ error: "Invalid number of shares" });
    }
    // Perform the transfer
    const receipt = await transferShares(
      contractAddress,
      fromPrivateKey,
      toAddress,
      numShares
    );
    res.json({
      message: "Shares transferred successfully",
      transactionHash: receipt.hash,
      blockNumber: receipt.blockNumber,
    });
  } catch (error) {
    console.error("Transaction failed:", error);
    res
      .status(500)
      .json({ error: "Failed to transfer shares", details: error.message });
  }
});

router.get("/balance", async (req, res) => {
  try {
    const { contractAddress, userAddress } = req.body;

    // Validate inputs
    if (!contractAddress || !userAddress) {
      return res
        .status(400)
        .json({ error: "Contract address and user address are required!" });
    }

    // Fetch the balance
    const balance = await getSharesBalance(contractAddress, userAddress);

    // Return the balance as response
    res.status(200).json({
      message: "Shares balance fetched successfully",
      balance: balance.toString(),
    });
  } catch (error) {
    console.error("Error fetching shares balance:", error);
    res.status(500).json({
      error: "Failed to fetch shares balance",
      details: error.message,
    });
  }
});

module.exports = router;
