# Farm to Table Supply Chain using Ethereum Blockchain

## General Project Information

This is a supply chain project which checks the authenticity of organic vegetables from farm to table. It is developed as a blockchain project on the Ethereum blockchain.

A farmer records the information about his farm when the vegetable is first planted. This is the first stage of the supply chain. The farmer then records growing, harvesting, processing and packing stages. He then assigns a product price and puts up the product for Sale. A distributor then buys the project from the farmer and ships it to the retailer. The receiver receives the product, which the consumer can then process. The transaction history of each of the different transactions and stages is recorded.

### Version Information:
Truffle v4.1.14 (core: 4.1.14)
Solidity v0.4.24 (solc-js)
Web3 1.0.0-beta.48

### Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Installing Node and NPM is pretty straightforward using the installer package available from the (Node.js® web site)[https://nodejs.org/en/].

### Configuring your project

- Use NPM to initialize your project and create package.json to store project dependencies.
```
npm init
```
- Install crypto-js with --save flag to save dependency to our package.json file
```
npm install truffle-hdwallet-provider --save
```

To deploy and test on local ganache cli
- Run truffle develop
- Run compile to compile the project
- Run migrate --reset to migrate the project to local network. 
- Run test to run the test cases for the contract

To Deploy to Rinkeby:
- Update the wallet mnemonics in the truffle.js file
- Run migrate --reset network rinkeby in truffle develop.
- Check the deployed contract on Etherscan.

To test frontend using localhost and Metamask
- Make sure the Metamask is configured to custom RPC http://127.0.0.1:9545/ and the accounts are added
- Run npm run dev This opens the frontend in the browser
- Use the frontend options to interact and transact with the supply chain. The transaction history is displayed at the bottom of the page.
	



## Libraries Used

Truffle-hdwallet-provider : To set the provider to connect to the Rinkeby Network

https://unpkg.com/ipfs/dist/index.min.js : To reference to the IPFS Api.



## Rinkeby Deployment Information

Supplychain Tx Hash: 0xc5840331f0e9db1476b3ad47d6b0a1512f9c8b5188452ec5407606ab624dcb05

Supplychain Contract Hash: 
0xdd3eb13f2d2880fcec8675171f6153095e22ecb4

Supplychain Contract Address: 
0xdD3eb13F2D2880fCEc8675171F6153095e22eCb4


## IPFS for storing image files

Since storing large files on the Ethereum network can be very expensive, they can be stored in the IPFS and the hash created can be store on the blockchain.

1. Included "<script src="https://unpkg.com/ipfs/dist/index.min.js"></script>" to reference the IPFS Api

2. A new IPFS connection is created using { host: 'ipfs.infura.io', port: 5001, protocol: 'https' } as the parameters

3. The image file is added to IPFS

4. The file reference hash returned by IPFS is saved in the contract

