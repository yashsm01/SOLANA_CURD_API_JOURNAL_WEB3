import { AppHero } from '@/components/app-hero'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { BookOpen, ArrowRight } from 'lucide-react'

const links: { label: string; href: string }[] = [
  { label: 'Solana Docs', href: 'https://docs.solana.com/' },
  { label: 'Solana Faucet', href: 'https://faucet.solana.com/' },
  { label: 'Solana Cookbook', href: 'https://solana.com/developers/cookbook/' },
  { label: 'Solana Stack Overflow', href: 'https://solana.stackexchange.com/' },
  { label: 'Solana Developers GitHub', href: 'https://github.com/solana-developers/' },
]

export function DashboardFeature() {
  return (
    <div>
      <AppHero title="Welcome to Solana Journal" subtitle="Your personal blockchain-powered journal." />

      {/* Journal Feature Showcase */}
      <div className="max-w-4xl mx-auto py-8 px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg p-6 mb-8 border border-blue-200 dark:border-blue-800">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <BookOpen className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-grow">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Blockchain Journal
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Create, update, and manage your personal journal entries on the Solana blockchain.
                Your thoughts and memories, secured by decentralized technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/journal">
                  <Button className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Open Journal
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/journal/test">
                  <Button variant="outline" className="flex items-center gap-2">
                    Test Journal API
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-4 border rounded-lg">
            <div className="text-blue-600 dark:text-blue-400 mb-2">✍️</div>
            <h4 className="font-medium mb-1">Create Entries</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Write new journal entries directly to the blockchain
            </p>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <div className="text-blue-600 dark:text-blue-400 mb-2">🔄</div>
            <h4 className="font-medium mb-1">Update & Edit</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Modify your entries while maintaining blockchain integrity
            </p>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <div className="text-blue-600 dark:text-blue-400 mb-2">🔒</div>
            <h4 className="font-medium mb-1">Secure & Permanent</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your entries are stored securely on the Solana blockchain
            </p>
          </div>
        </div>
      </div>

      {/* Helpful Links */}
      <div className="max-w-xl mx-auto py-6 sm:px-6 lg:px-8 text-center border-t border-gray-200 dark:border-gray-700">
        <div className="space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Helpful Solana development resources:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-sm hover:text-blue-600 dark:hover:text-blue-400 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
