require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider')
const mnemonic = process.env.MNEMONIC.toString().trim()

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*', // Match any network id
    },
    matic: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://matic-mumbai.chainstacklabs.com`,
        ),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },

    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://eth-rinkeby.gateway.pokt.network/v1/lb/6160934725e5100036210c11`,
        ),
      network_id: 4,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: '^0.6.0',
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
}
