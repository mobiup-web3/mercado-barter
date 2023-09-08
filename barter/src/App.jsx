import { AppProvider } from './context/AppContext';
import { RoutesApp } from './routes';

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider
} from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { polygon, polygonMumbai } from 'wagmi/chains';

const chains = [polygon, polygonMumbai];
const projectId = 'bc2f3a3fddb8beecbc0c07287eb2b901';

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <AppProvider>
        <RoutesApp />
      </AppProvider>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </WagmiConfig>
  );
}

export default App;
