const { ethers } = require("hardhat");
const fxRootContractABI = require("../fxRootContractABI.json");
const tokenContractJSON = require("../artifacts/contracts/DRB.sol/DRB.json");
require("dotenv").config();
const tokenABI = tokenContractJSON.abi;

// Transfer ERC721A tokens to the Ethereum FxChain network
async function main() {
  const networkAddress =
    "https://goerli.blockpi.network/v1/rpc/public";
  const privateKey = process.env.P_KEY;
  const provider = new ethers.providers.JsonRpcProvider(networkAddress);
  const wallet = new ethers.Wallet(privateKey, provider);
  const [signer] = await ethers.getSigners();

  // Getting contract instance
  const NFT = await ethers.getContractFactory("DRB");
  const nft = await NFT.attach("0xD4Fd78f2C74564457bdC1a6376d51a1f78620f54");

  // Get the FXRoot contract instance 
  const fxRootAddress = "0xF9bc4a80464E48369303196645e876c8C7D972de";
  const fxRoot = await ethers.getContractAt(fxRootContractABI, fxRootAddress);
  const tokenIds = [1, 2, 3, 4, 5];

  // Approve for transfer
  const approveTx = await nft
    .connect(signer)
    .setApprovalForAll(fxRootAddress, true);
  await approveTx.wait();
  console.log("Approval confirmed");

  // Deposit the NFTs to the FXRoot contract on the Ethereum FxChain network
  for (let i = 0; i < tokenIds; i++) {
    const depositTx = await fxRoot
      .connect(signer)
      .deposit(nft.address, wallet.address, tokenIds[i], "0x6566");

    await depositTx.wait();
  }

  console.log("Approved and deposited to the address");

  const balance = await nft.balanceOf(wallet.address);
  console.log("Current wallet balance", wallet.address,"is: ", balance.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });