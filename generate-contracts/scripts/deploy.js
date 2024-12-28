// scripts/deploy.js
const hre = require("hardhat");

async function deployContract(propertyName, totalShares) {
  try {
    // Get the contract factory
    const PropertyTemplate = await hre.ethers.getContractFactory(
      "PropertyTemplate"
    );

    // Deploy the contract with constructor parameters
    const propertyContract = await PropertyTemplate.deploy(
      propertyName,
      totalShares
    );

    console.log("Deploying contract...");

    // Ensure the deployTransaction object is available
    if (!propertyContract.deploymentTransaction()) {
      throw new Error("Deployment transaction object is not available.");
    }

    // Wait for the transaction to be mined
    const deployReceipt = await propertyContract.deploymentTransaction().wait();

   console.log("Deployment Receipt:", deployReceipt); // Log the receipt for debugging

    // Return deployment details
    return {
      address: propertyContract.address,
      txHash: propertyContract.deploymentTransaction().hash,
      contractAddress: deployReceipt.contractAddress
    };
  } catch (error) {
    console.error("Deployment failed:", error);
    throw new Error(`Deployment failed: ${error.message}`);
  }
}

module.exports = { deployContract };
