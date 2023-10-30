# Ethereum Block Explorer

This project is a Block Explorer for the Ethereum Mainnet. A Block Explorer is a web application that allows users to explore the Ethereum blockchain.

This Block Explorer shows a table with all the blocks, and the user can click on a specific block to see the transactions it contains.

## Getting Started

cd into the base directory of the project and run `npm install` to download all the project dependencies.

In this project I chose to use React for a front-end and the `ethers.js`  library to communicate with the Ethereum network. 

### 1. Create a unique Alchemy API key

If you have not already done so, create a unique Alchemy API Mainnet key
for your project as [described here](https://docs.alchemy.com/reference/api-overview?a=eth-bootcamp).

### 2. Add your API key to as an environment variable for the project

This project uses Alchemy as the Ethereum provider. To use Alchemy you need to add your API key as an environment variable.

Create an empty `.env` file in the base directory of this project.

Add the following line to the `.env` file replacing `YOUR_ALCHEMY_API_KEY` with your api key.

```sh
REACT_APP_ALCHEMY_API_KEY=YOUR_ALCHEMY_API_KEY
```

Note:
  - Do not remove the `REACT_APP_` prefix. React uses that to import env variables.
  - With the free Alchemy plan you have a limited amount of requests you can do. In some cases, if a block contains a lot of transactions, trying to retrieve them may exceed the request limits and the transactions will not be displayed. If this happens, you can either upgrade your Alchemy plan or click another block with less transactions. Feel free to change the provider to another one if you want to.

## 3. Start the webserver

`npm start`

Running the command above will run the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The webpage will automatically reload when you make code changes.

