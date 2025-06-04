/**
 * Example usage of the Journal API
 *
 * This file demonstrates how to integrate the journal API into your application
 * with proper provider setup and usage patterns.
 */

'use client';

import React from 'react';
import { JournalDashboard, useJournalEntries, useCreateJournalEntry } from './index';

// Example 1: Using the complete dashboard component
export function JournalApp() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Blockchain Journal</h1>
        <p className="text-muted-foreground">
          A decentralized journal built on Solana blockchain
        </p>
      </div>

      <JournalDashboard />
    </div>
  );
}

// Example 2: Custom component using journal hooks
export function CustomJournalComponent() {
  const { data: entries, isLoading, error } = useJournalEntries();
  const createEntry = useCreateJournalEntry();

  const handleQuickEntry = async () => {
    try {
      await createEntry.mutateAsync({
        title: `Quick Entry ${Date.now()}`,
        message: 'This is a quick journal entry created programmatically!'
      });
    } catch (error) {
      console.error('Failed to create quick entry:', error);
    }
  };

  if (isLoading) return <div>Loading journal entries...</div>;
  if (error) return <div>Error loading entries</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Entries ({entries?.length || 0})</h2>
        <button
          onClick={handleQuickEntry}
          disabled={createEntry.isPending}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {createEntry.isPending ? 'Creating...' : 'Quick Entry'}
        </button>
      </div>

      <div className="grid gap-4">
        {entries?.map((entry, index) => (
          <div key={`${entry.title}-${index}`} className="p-4 border rounded-lg">
            <h3 className="font-semibold">{entry.title}</h3>
            <p className="text-gray-600 mt-2">{entry.message}</p>
            <p className="text-xs text-gray-400 mt-2">
              Owner: {entry.owner?.toString?.()?.slice(0, 8)}...
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Example 3: Required provider setup (for reference)
export function AppWithProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/*
        Make sure your app is wrapped with these providers:

        1. Solana Wallet Providers:
        <ConnectionProvider endpoint="https://api.devnet.solana.com">
          <WalletProvider wallets={[]} autoConnect>

        2. React Query Provider:
        <QueryClientProvider client={queryClient}>

        3. Your cluster provider (if using)
        <ClusterProvider>

        4. Anchor provider
        <AnchorProvider>

        Then your journal components:
        {children}

        </AnchorProvider>
        </ClusterProvider>
        </QueryClientProvider>
          </WalletProvider>
        </ConnectionProvider>
      */}
      {children}
    </>
  );
}

// Example 4: Integration with wallet connection
export function JournalWithWalletCheck() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Solana Journal</h1>
          {/* Add your wallet connection button here */}
          <div className="text-sm text-gray-500">
            Connect your wallet to get started
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <JournalDashboard />
      </main>
    </div>
  );
}

/**
 * Installation and Setup Instructions:
 *
 * 1. Install required dependencies:
 * ```bash
 * npm install @solana/wallet-adapter-react @solana/web3.js @coral-xyz/anchor
 * npm install @tanstack/react-query react-hot-toast lucide-react
 * ```
 *
 * 2. Set up your @journal/anchor module with:
 *    - getJournalProgram() function
 *    - getJournalProgramId() function
 *    - JournalIDL export
 *
 * 3. Set up cluster and provider components:
 *    - @/components/cluster/cluster-data-access
 *    - @/components/solana/solana-provider
 *    - @/components/ui/ui-layout
 *
 * 4. Ensure your Solana program is deployed and the program ID matches
 *
 * 5. Configure your UI components (shadcn/ui or similar):
 *    - Button, Input, Textarea
 *    - Card, Dialog, Badge
 *
 * 6. Import and use the journal components in your app
 */
