'use client';

import { useWeb3 } from '@/lib/Web3Context';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { address, isConnected, connect, disconnect } = useWeb3();
  const [profileUrl, setProfileUrl] = useState<string | null>(null);

  const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  useEffect(() => {
    if (isConnected && !profileUrl) {
      const randomId = Math.floor(Math.random() * 1000);
      fetch(`https://picsum.photos/id/${randomId}/info`)
        .then(res => res.json())
        .then(data => {
          setProfileUrl(data.download_url);
        })
        .catch(err => console.error("Failed to fetch profile image:", err));
    }
  }, [isConnected, profileUrl]);

  return (
    <nav className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-primary-foreground font-bold text-lg">T</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent tracking-tight">
              TaskBoard
            </span>
          </div>

          {/* Wallet Connect / Disconnect */}
          <div className="flex items-center space-x-4">
            {isConnected && address ? (
              <div className="flex items-center space-x-4 bg-card/50 px-4 py-2 rounded-full border border-border shadow-sm">
                {profileUrl && (
                  <div className="relative group">
                    <img
                      src={profileUrl}
                      alt="Profile"
                      className="h-9 w-9 rounded-full object-cover border-2 border-primary shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:border-primary/80"
                    />
                    <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}
                <span className="text-sm font-medium text-card-foreground">
                  {formatAddress(address)}
                </span>
                <button
                  onClick={() => {
                    disconnect();
                    setProfileUrl(null);
                  }}
                  className="px-4 py-1.5 bg-destructive/10 hover:bg-destructive/20 text-destructive text-sm rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-destructive/50"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={() => connect()}
                className="group relative px-6 py-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground text-sm rounded-full font-medium shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Connect Wallet</span>
                </span>
                <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
