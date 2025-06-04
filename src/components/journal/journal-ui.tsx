'use client'

import { useState } from 'react'
import { useWalletUi } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useJournalProgram } from './journal-data-access'
import { PublicKey } from '@solana/web3.js'

export function JournalCreate() {
  const { account } = useWalletUi()
  const { createEntry } = useJournalProgram()
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Check if wallet account is connected and has an address
    if (!account || !account.address) {
      console.error('Wallet not connected or no account address available')
      return
    }

    if (!title || !message) {
      console.error('Title and message are required')
      return
    }

    try {
      await createEntry.mutateAsync({
        title,
        message,
        owner: new PublicKey(account.address)
      })
      setTitle('')
      setMessage('')
    } catch (error) {
      console.error('Error creating journal entry:', error)
    }
  }

  // Check if wallet is connected
  const isWalletConnected = account && account.address

  if (!isWalletConnected) {
    return (
      <div className="p-6 border rounded-lg">
        <p className="text-center text-gray-500">
          Please connect your wallet to create journal entries
        </p>
      </div>
    )
  }

  return (
    <div className="p-6 border rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter journal entry title"
            maxLength={280}
          />
        </div>
        <div>
          <Label htmlFor="message">Message</Label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your journal entry..."
            className="w-full min-h-[100px] p-3 border rounded-md"
            rows={4}
          />
        </div>
        <Button
          type="submit"
          disabled={!title || !message || createEntry.isPending}
          className="w-full"
        >
          {createEntry.isPending ? 'Creating...' : 'Create Journal Entry'}
        </Button>
      </form>
    </div>
  )
}

export function JournalList() {
  const { accounts } = useJournalProgram()

  if (accounts.isLoading) {
    return (
      <div className="p-6 border rounded-lg">
        <p className="text-center">Loading journal entries...</p>
      </div>
    )
  }

  if (accounts.error) {
    return (
      <div className="p-6 border rounded-lg">
        <p className="text-center text-red-500">
          Error loading journal entries: {accounts.error.message}
        </p>
      </div>
    )
  }

  const entries = accounts.data || []

  if (entries.length === 0) {
    return (
      <div className="p-6 border rounded-lg">
        <p className="text-center text-gray-500">
          No journal entries found. Create your first entry above!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {entries.map((entry: unknown, index: number) => {
        const entryData = entry as { account: { title: string; message: string; owner: { toString: () => string } } };
        return (
          <div key={index} className="p-6 border rounded-lg">
            <h3 className="text-lg font-semibold mb-2">{entryData.account.title}</h3>
            <p className="text-gray-600 mb-4">{entryData.account.message}</p>
            <p className="text-xs text-gray-400">
              Owner: {entryData.account.owner.toString()}
            </p>
          </div>
        );
      })}
    </div>
  )
}

export function JournalFeature() {
  const { account } = useWalletUi()

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Journal on Solana</h1>
        <p className="text-gray-600">
          Create and manage your personal journal entries on the Solana blockchain
        </p>
        {account && account.address && (
          <p className="text-sm text-gray-500 mt-2">
            Connected: {account.address.slice(0, 8)}...{account.address.slice(-8)}
          </p>
        )}
      </div>

      <JournalCreate />
      <JournalList />
    </div>
  )
}

// Add the missing JournalDashboard component that was being imported
export function JournalDashboard() {
  return <JournalFeature />
}
