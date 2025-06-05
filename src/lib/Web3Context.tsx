'use client';

import { createContext, useContext, ReactNode } from 'react';
import { 
  createConfig,
  http,
  useAccount,
  useConnect,
  useDisconnect,
  useSignMessage,
  WagmiProvider
} from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
  connectors: [
    injected(),
  ],
});

const queryClient = new QueryClient();

interface Web3ContextType {
  address: string | undefined;
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
  signMessage: (message: string) => Promise<string>;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

function Web3ContextProvider({ children }: { children: ReactNode }) {
  const { address, isConnected } = useAccount();
  const { connectAsync } = useConnect();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();

  const handleConnect = async () => {
    try {
      const result = await connectAsync({ connector: config.connectors[0] });
      if (result.accounts[0]) {
        const response = await fetch('/api/auth/wallet', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pubKey: result.accounts[0] }),
        });

        if (!response.ok) {
          throw new Error('Failed to register wallet');
        }
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('Failed to connect wallet');
    }
  };

  const handleSignMessage = async (message: string): Promise<string> => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }
    try {
      return await signMessageAsync({ message });
    } catch (error) {
      console.error('Error signing message:', error);
      throw error;
    }
  };

  return (
    <Web3Context.Provider 
      value={{ 
        address, 
        isConnected, 
        connect: handleConnect, 
        disconnect, 
        signMessage: handleSignMessage 
      }}
    >
      {children}
    </Web3Context.Provider>
  );
}

export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Web3ContextProvider>
          {children}
        </Web3ContextProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export function useWeb3() {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
} 