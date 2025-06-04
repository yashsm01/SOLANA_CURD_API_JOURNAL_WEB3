'use client'

import { useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { BookOpen, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Safe wallet hook that handles context errors
function useSafeWallet() {
  try {
    return useWallet();
  } catch (error) {
    console.warn('Wallet context not available:', error);
    return {
      publicKey: null,
      connected: false,
      connecting: false,
      disconnecting: false,
      wallet: null,
      wallets: [],
      select: () => { },
      connect: async () => { },
      disconnect: async () => { },
      sendTransaction: async () => { throw new Error('Wallet not available'); }
    };
  }
}

export function JournalHeaderWidget() {
  const { connected } = useSafeWallet()
  const [showQuickAdd, setShowQuickAdd] = useState(false)

  if (!connected) {
    return null
  }

  return (
    <div className="flex items-center gap-2">
      {/* Journal Stats */}
      <div className="hidden sm:flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
        <BookOpen className="h-3 w-3" />
        <span>Journal</span>
      </div>

      {/* Quick Add Button */}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => setShowQuickAdd(true)}
        title="Quick add journal entry"
      >
        <Plus className="h-4 w-4" />
      </Button>

      {/* Quick Add Dialog */}
      {showQuickAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Quick Journal Entry</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowQuickAdd(false)}
              >
                ✕
              </Button>
            </div>
            <p className="text-sm text-gray-600">
              Please navigate to the Journal page to create entries.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

// Simplified badge that doesn't use reactive hooks
export function JournalHeaderBadge() {
  const { connected } = useSafeWallet()

  // Only show badge when connected, but don't fetch data in header
  // This prevents context errors during initial render
  if (!connected) {
    return null
  }

  return (
    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
      📖
    </span>
  )
}

// Alternative version that shows static content
export function JournalHeaderBadgeStatic() {
  return (
    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
      ��
    </span>
  )
}
