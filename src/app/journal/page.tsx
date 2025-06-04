'use client'

import { JournalDashboard } from '@/components/journal'

export default function JournalPage() {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Blockchain Journal</h1>
        <p className="text-muted-foreground">
          Your personal journal powered by the Solana blockchain
        </p>
      </div>

      <JournalDashboard />
    </div>
  )
}
