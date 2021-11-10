require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/7pLMT-KkA1jLVr_VRfMtk5wCSiNYI39P",
      accounts: ["630d0799eb839a3b6ea728202b7a26b137f621bcd4d797e9da4150be22ba7ae1"]
    }
  }
};
