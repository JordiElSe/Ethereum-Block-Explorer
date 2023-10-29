import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import moment from 'moment';
import './BlocksTable.css';

const provider = ethers.getDefaultProvider('mainnet');
const rowsPerPage = 8;

function BlocksTable() {
  // Define the initial state for the table
  const [blocks, setBlocks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [latestBlock, setLatestBlock] = useState(0);
  const [loading, setLoading] = useState(true);

  // Define a helper function for navigation
  const navigate = (pageNumber) => {
    // Set the current page state
    setCurrentPage(pageNumber);
  };

  const fetchBlocks = async () => {
    let fromBlock = latestBlock - rowsPerPage * (currentPage - 1);
    let toBlock = fromBlock - rowsPerPage;
    if (currentPage === 1) {
      const latestBlock = await provider.getBlockNumber();
      fromBlock = latestBlock-1;
      toBlock = latestBlock - rowsPerPage;
      setLatestBlock(latestBlock);
    }
    // Create an empty array to store the blocks
    let blocks = [];
    if (toBlock < 0) {
      toBlock = 0;
    }
    // Loop through the block numbers
    for (let i = fromBlock; i >= toBlock; i--) {
      console.log('block', i);
      // Get the block object with transactions
      const block = await provider.getBlock(i);
      // Push the block object to the array
      blocks.push(block);
    }
    // Set the state with the array of blocks
    setBlocks(blocks);

    // Set loading to false
    setLoading(false);
  };

  useEffect(() => {
    // Set loading to true
    setLoading(true);
    // Call the function with a range of block numbers based on the current page
    fetchBlocks();
  }, [currentPage]);

  // Render the table elements
  return (
    <>
      {/* Render a loading indicator if loading is true and the table and pagination otherwise */}
      {/* {loading ? (
        <div className="loading">Loading...</div>
      ) : ( */}
        <div className="table-container">
          {/* Render the table */}
          <table>
            <thead>
              <tr>
                <th>Block Number</th>
                <th>Age</th>
                <th>Txn Count</th>
                <th>Fee Recipient</th>
                <th>Gas Used</th>
                <th>Gas Limit</th>
                <th>Base Fee</th>
                {/* <th>Burnt Fees (ETH)</th> */}
              </tr>
            </thead>
            <tbody>
              {blocks.map((block) => (
                <tr key={block.number}>
                  <td>{block.number}</td>
                  <td>{moment(block.timestamp * 1000).fromNow()}</td>
                  <td>{block.length}</td>
                  <td>{block.miner}</td>
                  <td>{block.gasUsed.toString()}</td>
                  <td>{block.gasLimit.toString()}</td>
                  {<td>{block.baseFeePerGas.toString()}</td>}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Render the pagination controls */}
          <div className="pagination">
            <button
              onClick={() => navigate(1)}
              disabled={currentPage === 1}
            >
              {'First'}
            </button>
            <button
              onClick={() => navigate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              {'<'}
            </button>
            <span>
              Page {currentPage} of {Math.ceil(latestBlock / rowsPerPage)}
            </span>
            <button
              onClick={() => navigate(currentPage + 1)}
              disabled={currentPage === Math.ceil(latestBlock / rowsPerPage)}
            >
              {'>'}
            </button>
            <button
              onClick={() => navigate(Math.ceil(latestBlock / rowsPerPage))}
              disabled={currentPage === Math.ceil(latestBlock / rowsPerPage)}
            >
              {'Last'}
            </button>
          </div>
        </div>
      {/* )} */}
    </>
  );
}

export default BlocksTable;
