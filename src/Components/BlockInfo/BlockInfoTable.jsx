import React from 'react';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';


//const provider = ethers.getDefaultProvider('mainnet');

function BlockInfoTable({ blockHash }) {
  // Use state to store the list of transactions
  const [transactions, setTransactions] = useState([]);
  //const [block, setBlock] = useState(null);

  // Fetch and set the list of transactions when the block changes
  useEffect(() => {
    if(blockHash) {
        // use the default provider of ethersJS on the ethereum mainnet
      const provider = new ethers.AlchemyProvider("mainnet", process.env.REACT_APP_ALCHEMY_API_KEY);

      // get the block by its hash
      provider.getBlock(blockHash).then((block) => {
        // get the transactions of the block
        const txs = block.transactions;
        // map each transaction hash to its details
        Promise.all(txs.map((tx) => provider.getTransaction(tx))).then(
          (details) => {
            // set the state with the transaction details
            setTransactions(details);
          }
        );
      });
    }
  }, [blockHash]);

  return (
    <div className="table-container">
      <table>
        <caption>List of Transactions</caption>
        <thead>
          <tr>
            <th>Sender</th>
            <th>Recipient</th>
            <th>Value (ETH)</th>
            <th>Type</th>
            <th>Gas Limit</th>
            <th>Gas Price</th>
            <th>Nonce</th>
          </tr>
        </thead>
        {!blockHash ? (
          <tbody>
            <tr>
              <td colSpan="10">Click one block to see its transactions in detail</td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.from}>
                <td>{tx.from}</td>
                <td>{tx.to}</td>
                <td>{ethers.formatEther(tx.value)}</td>
                <td>{tx.type}</td>
                <td>{tx.gasLimit.toString()}</td>
                <td>{tx.gasPrice.toString()}</td>
                <td>{tx.nonce}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default BlockInfoTable;
