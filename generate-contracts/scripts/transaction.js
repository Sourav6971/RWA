const { ethers } = require("ethers");

async function transferShares(contractAddress, fromPrivateKey, toAddress, shares) {
  console.log("Starting transfer...");

  const provider = new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/-BaHorlJqL0goKpm5_KVfM4XGibSBKZq");
  const wallet = new ethers.Wallet(fromPrivateKey, provider);

  try {
    const network = await provider.getNetwork();
    console.log("Connected to network:", network.chainId, network.name);

    const walletEthBalance = await provider.getBalance(wallet.address);
    console.log("Wallet ETH Balance:", ethers.formatEther(walletEthBalance));

    const propertyContract = new ethers.Contract(
      contractAddress,
      [
        // Ensure this ABI matches the contract
        "function transferShares(address to, uint256 shares) public"
      ],
      wallet
    );

    console.log("Initiating transfer...");
    const tx = await propertyContract.transferShares(toAddress, shares);
    console.log("Transaction sent:", tx.hash);

    const receipt = await tx.wait();
    console.log("Transaction confirmed in block:", receipt.blockNumber);
    console.log("Transaction hash:", receipt.hash);
    

    return receipt;
  } catch (err) {
    console.error("Error during transfer:", err);
    throw new Error("Transfer failed. See error log for details.");
  }
}

module.exports = { transferShares };
