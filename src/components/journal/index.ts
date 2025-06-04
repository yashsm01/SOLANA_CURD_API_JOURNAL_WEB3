/**
 * Journal Component Library
 *
 * This library provides a complete solution for integrating a Solana-based journal
 * into your React application. It includes data access hooks, UI components,
 * and utility functions for managing journal entries on the blockchain.
 *
 * Key Features:
 * - CRUD operations for journal entries
 * - React Query integration for efficient data fetching
 * - TypeScript support with proper type definitions
 * - Responsive UI components with Tailwind CSS
 * - Wallet integration for Solana transactions
 * - Cluster-aware functionality (devnet, testnet, mainnet)
 *
 * Usage:
 * ```tsx
 * import { JournalDashboard, useJournalEntries } from '@/components/journal'
 *
 * function MyApp() {
 *   return <JournalDashboard />
 * }
 * ```
 */

// Export all journal components and hooks
export * from './journal-data-access';
export * from './journal-ui';
export * from './journal-header-widget';
export * from './types';
export * from './cluster-data-access';

export {
  JournalErrorType,
  JournalError,
  DEFAULT_JOURNAL_CONFIG,
} from './types';

// Export specific components that might be needed individually
export {
  JournalCreate,
  JournalList,
  JournalFeature,
  JournalDashboard
} from './journal-ui';

// Export specific hooks that are commonly used
export {
  useJournalProgram,
  useJournalProgramAccount,
  useJournalEntries,
  useCreateJournalEntry,
} from './journal-data-access';
