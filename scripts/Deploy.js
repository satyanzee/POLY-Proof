const hre = require("hardhat");


//deploy the contract
async function main() {
  console.log("Deploying the Contract . . .");
  // Get the contract factory
  const NFT = await hre.ethers.getContractFactory("DRB");
  console.log("Deploying Underway");
  // Deploy to the selected Blockchain
  const _NFT = await NFT.deploy();
  await _NFT.deployed();

  console.log("ERC721A _NFT contract deployed");
  console.log("Contract Address:",_NFT.address);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });