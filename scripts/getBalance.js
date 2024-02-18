const hre = require("hardhat");
const tokenContractJSON = require("../artifacts/contracts/DRB.sol/DRB.json");

const tokenAddress = "0xD4Fd78f2C74564457bdC1a6376d51a1f78620f54"; // Ethereum address of the deployed contract
const tokenABI = tokenContractJSON.abi;
const walletAddress = "0x8787733eA95970749aA2D1052336f1427a17909E"; // Ethereum public address for the wallet

async function main() {
    const token = await hre.ethers.getContractAt(tokenABI, tokenAddress);
    console.log("You now have a total number of: " + await token.balanceOf(walletAddress) + " tokens in the wallet.");
  }
  

  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
