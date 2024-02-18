/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers");
module.exports = {
  solidity: "0.8.18",
};
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    goerli: {
      url: "https://polygon-mumbai-bor.publicnode.com",
      accounts: [process.env.P_KEY],
    },
    mumbai: {
      url: "https://goerli.blockpi.network/v1/rpc/public",
      accounts: [process.env.P_KEY],
    },
  },
};
