const HDWallet = require('truffle-hdwallet-provider');

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: function() {
              return new HDWallet("aisle grocery render robot monkey mask labor fantasy voice switch eager gentle", "https://rinkeby.infura.io/v3/5d0fc80a8dfc4e1c83ead7ed8b34a1d5")
         },
          network_id: '4',
          gas: 4500000,
          gasPrice: 10000000000,
    }
  }
};