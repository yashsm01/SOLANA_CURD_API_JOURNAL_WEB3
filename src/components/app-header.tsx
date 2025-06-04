'use client'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, BookOpen, Wallet } from 'lucide-react'
import { ThemeSelect } from '@/components/theme-select'
import { ClusterButton, WalletButton } from '@/components/solana/solana-provider'
import { JournalHeaderBadge } from '@/components/journal'

export function AppHeader({ links = [] }: { links: { label: string; path: string }[] }) {
  const pathname = usePathname()
  const [showMenu, setShowMenu] = useState(false)

  function isActive(path: string) {
    return path === '/' ? pathname === '/' : pathname.startsWith(path)
  }

  function getLinkIcon(label: string) {
    switch (label.toLowerCase()) {
      case 'journal':
        return <BookOpen className="h-4 w-4" />
      case 'account':
        return <Wallet className="h-4 w-4" />
      default:
        return null
    }
  }

  function getLinkClassName(path: string, label: string) {
    const baseClass = 'hover:text-neutral-500 dark:hover:text-white flex items-center gap-2'
    const activeClass = isActive(path) ? 'text-neutral-500 dark:text-white' : ''
    const journalClass = label.toLowerCase() === 'journal' ? 'font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300' : ''

    return `${baseClass} ${activeClass} ${journalClass}`.trim()
  }

  return (
    <header className="relative z-50 px-4 py-2 bg-neutral-100 dark:bg-neutral-900 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto flex justify-between items-center">
        <div className="flex items-baseline gap-4">
          <Link className="text-xl hover:text-neutral-500 dark:hover:text-white font-bold" href="/">
            <span className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              Solana Journal
            </span>
          </Link>
          <div className="hidden md:flex items-center">
            <ul className="flex gap-6 flex-nowrap items-center">
              {links.map(({ label, path }) => (
                <li key={path} className="flex items-center gap-2">
                  <Link
                    className={getLinkClassName(path, label)}
                    href={path}
                  >
                    {getLinkIcon(label)}
                    {label}
                  </Link>
                  {label.toLowerCase() === 'journal' && <JournalHeaderBadge />}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setShowMenu(!showMenu)}>
          {showMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        <div className="hidden md:flex items-center gap-4">
          <WalletButton size="sm" />
          <ClusterButton size="sm" />
          <ThemeSelect />
        </div>

        {showMenu && (
          <div className="md:hidden fixed inset-x-0 top-[60px] bottom-0 bg-neutral-100/95 dark:bg-neutral-900/95 backdrop-blur-sm">
            <div className="flex flex-col p-4 gap-4 border-t dark:border-neutral-800">
              <ul className="flex flex-col gap-4">
                {links.map(({ label, path }) => (
                  <li key={path} className="flex items-center justify-between">
                    <Link
                      className={`${getLinkClassName(path, label)} text-lg py-2`}
                      href={path}
                      onClick={() => setShowMenu(false)}
                    >
                      {getLinkIcon(label)}
                      {label}
                    </Link>
                    {label.toLowerCase() === 'journal' && <JournalHeaderBadge />}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-4 mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                <WalletButton />
                <ClusterButton />
                <ThemeSelect />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
