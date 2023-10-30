//import { Alchemy, Network } from 'alchemy-sdk';
import BlockTable from './Components/BlocksList/BlocksListTable';

import './App.css';

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
//const alchemy = new Alchemy(settings);

function App() {
    return (
    <>
      <div className="title">
        Ethereum Mainnet Block Explorer
      </div>
      <div className="App">
        <BlockTable />
      </div>
    </>
  );
}

export default App;
