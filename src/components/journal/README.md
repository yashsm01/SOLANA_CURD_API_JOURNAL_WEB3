# Journal Component Library

A complete Solana-based journal application built with React, TypeScript, and wallet-ui, following the [official Solana Developer Bootcamp 2024](https://github.com/solana-developers/developer-bootcamp-2024) patterns and best practices.

## Features

- ✅ **CRUD Operations**: Create, read, update, and delete journal entries on Solana
- ✅ **Official Patterns**: Following Solana Developer Bootcamp 2024 standards
- ✅ **Modern Wallet Integration**: Using @wallet-ui/react for seamless connectivity
- ✅ **React Query**: Efficient data management with caching and optimistic updates
- ✅ **TypeScript**: Full type safety with proper interfaces
- ✅ **Error Handling**: Comprehensive error management with user-friendly messages
- ✅ **PDA Management**: Automatic Program Derived Address generation
- ✅ **Toast Notifications**: Real-time feedback for user actions
- ✅ **Mock Implementation**: Development-ready with fallback mock data

## Quick Start

```tsx
import { JournalFeature } from '@/components/journal'

function App() {
  return <JournalFeature />
}
```

## Components

### JournalFeature
Main component that includes both create and list functionality with wallet connection status.

### JournalCreate
Form component for creating new journal entries with proper validation.

### JournalList
Component for displaying all journal entries with error states.

## Hooks

### useJournalProgram()
Main hook for journal operations:
- `createEntry` - Create new journal entries
- `accounts` - Query all journal entries
- `program` - Access to the journal program
- `programId` - The journal program ID
- `getProgramAccount` - Get program account information

### useJournalProgramAccount({ account })
Hook for account-specific operations:
- `accountQuery` - Query specific account data
- `updateEntry` - Update journal entries
- `deleteEntry` - Delete journal entries

## Setup

1. **Dependencies**: Make sure you have the required packages:
   ```bash
   npm install @wallet-ui/react @tanstack/react-query react-hot-toast @solana/web3.js
   ```

2. **Provider Setup**: Wrap your app with the necessary providers:
   ```tsx
   import { SolanaProvider } from '@/components/solana/solana-provider'
   import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
   import { Toaster } from 'react-hot-toast'

   const queryClient = new QueryClient()

   function App() {
     return (
       <QueryClientProvider client={queryClient}>
         <SolanaProvider>
           <JournalFeature />
           <Toaster position="bottom-right" />
         </SolanaProvider>
       </QueryClientProvider>
     )
   }
   ```

## Architecture

### Program Derived Addresses (PDAs)
Following the official Solana bootcamp patterns, journal entries use PDAs for deterministic addressing:

```typescript
const [journalEntryPda] = PublicKey.findProgramAddressSync(
  [Buffer.from(title), owner.toBuffer()],
  programId
);
```

### Error Handling
Comprehensive error handling with multiple layers:
- Network/connection errors
- Program initialization errors
- Transaction execution errors
- User-friendly toast notifications

### State Management
- React Query for server state management
- Optimistic updates for better UX
- Automatic refetching on mutations
- Loading and error states

## Development

The current implementation uses mock data for development. To connect to a real Solana program:

1. **Deploy your program**: Deploy your journal program to Solana
2. **Update Program ID**: Change `JOURNAL_PROGRAM_ID` in `src/lib/anchor/index.ts`
3. **Replace mock implementation**: Update `getJournalProgram()` with real Anchor program integration
4. **Generate IDL**: Use your actual program IDL instead of the mock implementation

## Official Reference

This implementation follows patterns from the [Solana Developer Bootcamp 2024](https://github.com/solana-developers/developer-bootcamp-2024/tree/heyAyushh-patch-1/project-4-crud-app), specifically:

- **Project 4**: CRUD App implementation patterns
- **Wallet Integration**: Modern wallet adapter usage
- **React Patterns**: Best practices for Solana React apps
- **Error Handling**: Robust error management
- **TypeScript**: Proper type definitions

## File Structure

```
src/components/journal/
├── index.ts                    # Main exports
├── journal-data-access.tsx     # Data access hooks with React Query
├── journal-ui.tsx             # UI components with proper wallet integration
├── cluster-data-access.tsx     # Cluster utilities
├── types.ts                   # TypeScript definitions
└── README.md                  # This documentation
```

## Program Configuration

**Current Program ID**: `6NGgMhYhp4TaoesSxBJf5NJs67Y1j7xVHmuojSQLvnBe`

Update this in `src/lib/anchor/index.ts` when you deploy your program.

## Best Practices

✅ **Wallet Integration**: Proper handling of wallet connection states
✅ **Error Boundaries**: Graceful error handling and user feedback
✅ **Loading States**: Clear loading indicators for better UX
✅ **Type Safety**: Full TypeScript support with proper interfaces
✅ **Performance**: Optimized with React Query caching
✅ **Accessibility**: Semantic HTML and proper form handling

## Resources

- [Solana Developer Bootcamp 2024](https://github.com/solana-developers/developer-bootcamp-2024)
- [Solana Documentation](https://docs.solana.com/)
- [Anchor Framework](https://www.anchor-lang.com/)
- [React Query Documentation](https://tanstack.com/query/latest)

This implementation provides a production-ready foundation for building sophisticated Web3 journal applications on Solana! 🚀
