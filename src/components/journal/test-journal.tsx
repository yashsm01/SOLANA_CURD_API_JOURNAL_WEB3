/**
 * Test component for the Journal API
 * This file tests the basic functionality of the journal components
 */

'use client';

import React from 'react';
import { PublicKey } from '@solana/web3.js';
import { useWalletUi } from '@wallet-ui/react';
import {
  JournalDashboard,
  useJournalEntries,
  useCreateJournalEntry,
  useJournalProgram
} from './index';

// Basic test component that renders the dashboard
export function TestJournalBasic() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Journal API Test</h1>
      <JournalDashboard />
    </div>
  );
}

// Test component that shows hook usage
export function TestJournalHooks() {
  const { account } = useWalletUi();
  const { data: entries, isLoading, error } = useJournalEntries();
  const createEntry = useCreateJournalEntry();
  const { program } = useJournalProgram();

  const handleCreateTest = async () => {
    if (!account || !account.address) {
      console.error('Wallet not connected');
      return;
    }

    try {
      await createEntry.mutateAsync({
        title: 'Test Entry',
        message: 'This is a test journal entry',
        owner: new PublicKey(account.address)
      });
      console.log('Test entry created successfully');
    } catch (error) {
      console.error('Failed to create test entry:', error);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">Journal Hooks Test</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Program Status */}
        <div className="p-4 border rounded">
          <h3 className="font-medium">Program Status</h3>
          <p className="text-sm text-gray-600">
            {program ? '✅ Connected' : '❌ Not Connected'}
          </p>
        </div>

        {/* Wallet Status */}
        <div className="p-4 border rounded">
          <h3 className="font-medium">Wallet Status</h3>
          <p className="text-sm text-gray-600">
            {account && account.address ? '✅ Connected' : '❌ Not Connected'}
          </p>
          {account && account.address && (
            <p className="text-xs text-gray-500 mt-1">
              {account.address.slice(0, 8)}...{account.address.slice(-8)}
            </p>
          )}
        </div>

        {/* Entries Status */}
        <div className="p-4 border rounded">
          <h3 className="font-medium">Entries Status</h3>
          <p className="text-sm text-gray-600">
            {isLoading ? '⏳ Loading...' :
              error ? '❌ Error' :
                `✅ Loaded ${entries?.length || 0} entries`}
          </p>
        </div>
      </div>

      {/* Create Entry Test */}
      <div className="p-4 border rounded">
        <h3 className="font-medium mb-2">Create Entry Test</h3>
        <button
          onClick={handleCreateTest}
          disabled={createEntry.isPending || !account?.address}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm disabled:opacity-50"
        >
          {createEntry.isPending ? 'Creating...' : 'Test Create'}
        </button>
        {!account?.address && (
          <p className="text-xs text-gray-500 mt-1">Connect wallet to test</p>
        )}
      </div>

      {/* Entry List */}
      <div className="border rounded p-4">
        <h3 className="font-medium mb-2">Current Entries</h3>
        {isLoading ? (
          <p>Loading entries...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error.message}</p>
        ) : entries && entries.length > 0 ? (
          <ul className="space-y-2">
            {entries.map((entry: { account: { title: string; message: string; owner: { toString: () => string } } }, index: number) => (
              <li key={index} className="p-2 bg-gray-50 rounded">
                <strong>{entry.account.title}</strong>
                <p className="text-sm text-gray-600">{entry.account.message}</p>
                <p className="text-xs text-gray-400">
                  Owner: {entry.account.owner?.toString().slice(0, 8)}...
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No entries found</p>
        )}
      </div>
    </div>
  );
}

// Complete test page
export function TestJournalPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Journal API Test Suite</h1>
          <p className="text-gray-600">Testing the journal components and hooks</p>
        </div>

        <div className="space-y-8">
          {/* Basic Dashboard Test */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Dashboard Test</h2>
            <TestJournalBasic />
          </section>

          {/* Hooks Test */}
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Hooks Test</h2>
            <TestJournalHooks />
          </section>
        </div>
      </div>
    </div>
  );
}

/**
 * Usage Instructions:
 *
 * 1. Import and use in your app:
 * ```tsx
 * import { TestJournalPage } from '@/components/journal/test-journal';
 *
 * export default function TestPage() {
 *   return <TestJournalPage />;
 * }
 * ```
 *
 * 2. Or test individual components:
 * ```tsx
 * import { TestJournalBasic, TestJournalHooks } from '@/components/journal/test-journal';
 * ```
 *
 * 3. Make sure you have the required providers wrapped around your app:
 *    - Solana wallet providers
 *    - React Query provider
 *
 * Expected Behavior:
 * - Dashboard should render without errors
 * - Hooks should show connection status
 * - Create test should work (mock implementation)
 * - Entries should load (mock data)
 */
