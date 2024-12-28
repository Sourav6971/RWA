const { ethers, waffle } = require("hardhat");

async function getSharesBalance(contractAddress, userAddress) {
  // Replace with the actual RPC URL (e.g., Infura, Alchemy, or a local Ethereum node)
  const provider = new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/-BaHorlJqL0goKpm5_KVfM4XGibSBKZq");

  try {
    // Validate the addresses
    if (!ethers.isAddress(contractAddress)) {
      throw new Error("Invalid contract address");
    }
    if (!ethers.isAddress(userAddress)) {
      throw new Error("Invalid user address");
    }

    console.log(`Contract Address: ${contractAddress}`);
    console.log(`User Address: ${userAddress}`);

    // Define the ABI for the contract, only including the getBalance function
    const propertyContract = new ethers.Contract(
      contractAddress,
      [
        "function getBalance(address) public view returns (uint256)"
      ],
      provider
    );

    // Call the getBalance function to fetch the balance for the user
    const balance = await provider.getBalance(userAddress);

    // Log the raw balance response (in Wei, the smallest unit of Ether)
    console.log("Raw balance response:", balance.toString());

    // If you want to convert to a human-readable format, like Ether (using 18 decimals for example)
    const formattedBalance = ethers.formatUnits(balance, 18); // Adjust decimals if needed
    console.log(`Shares balance for ${userAddress}: ${formattedBalance}`);

    return formattedBalance;
  } catch (err) {
    console.error("Error fetching shares balance:", err.message);
    throw new Error("Failed to fetch shares balance. Check user address or contract address.");
  }
}

module.exports= getSharesBalance;