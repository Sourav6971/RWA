async function sendEth(sender, recipient, amountInEther) {
  if (typeof window.ethereum === "undefined") {
    console.error(
      "MetaMask is not installed. Please install MetaMask and try again."
    );
    return;
  }

  try {
    // Request MetaMask to connect to the account
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const connectedAccount = accounts[0];

    // Ensure the connected account matches the sender
    if (connectedAccount.toLowerCase() !== sender.toLowerCase()) {
      console.error(
        "The connected MetaMask account does not match the sender address."
      );
      return;
    }

    // Get the current chain ID to verify the network
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (chainId !== "0xaa36a7") {
      // Sepolia chain ID in hexadecimal
      console.error("Please switch to the Sepolia testnet in MetaMask.");
      return;
    }

    // Convert amount to Wei (1 Ether = 10^18 Wei)
    const amountInWei = BigInt(amountInEther * 1e18).toString();

    // Create a transaction object
    const transactionParams = {
      from: sender, // Sender's address
      to: recipient, // Recipient's address
      value: amountInWei, // Amount to send in Wei
      gas: "21000", // Standard gas limit for ETH transfer
    };

    // Send the transaction
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParams],
    });

    console.log(`Transaction successful! Hash: ${txHash}`);
  } catch (error) {
    console.error("Error sending ETH:", error.message || error);
  }
}

export default sendEth;
