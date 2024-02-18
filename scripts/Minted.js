const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const privateKey = process.env.P_KEY;

  // The URL of the network provider from ChainList
  const networkAddress =
    "https://goerli.blockpi.network/v1/rpc/public";

  const provider = new ethers.providers.JsonRpcProvider(networkAddress);
  const signer = new ethers.Wallet(privateKey, provider);

  // The Deployed contract Address 
  const contractAddress = "0xD4Fd78f2C74564457bdC1a6376d51a1f78620f54";

  const OneNFT = await ethers.getContractFactory("DRB", signer);
  const contract = await OneNFT.attach(contractAddress);
  await contract.mint(5);
  console.log("Minted '5' NFTs.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 