'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'

interface NavbarProps {
  userRole?: 'user' | 'moderator' | 'admin'
  userName?: string
}

export default function Navbar({ userRole = 'user', userName = 'Utilisateur' }: NavbarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const isActive = (path: string) => pathname === path

  return (
    <header className="border-b border-border bg-card/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={userRole === 'admin' ? '/admin' : userRole === 'moderator' ? '/moderator' : '/forum'} className="flex items-center gap-3">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg overflow-hidden shrink-0">
            <img src="/chat_8708617.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Communauté</h1>
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {userRole === 'user' && (
            <>
              <Link href="/forum">
                <Button 
                  variant={isActive('/forum') ? 'default' : 'ghost'} 
                  className="font-medium"
                >
                  Forum
                </Button>
              </Link>
              <Link href="/forum/new-post">
                <Button 
                  variant={isActive('/forum/new-post') ? 'default' : 'ghost'} 
                  className="font-medium"
                >
                  Nouveau post
                </Button>
              </Link>
            </>
          )}
          {userRole === 'moderator' && (
            <>
              <Link href="/moderator">
                <Button 
                  variant={isActive('/moderator') ? 'default' : 'ghost'} 
                  className="font-medium"
                >
                  Dashboard
                </Button>
              </Link>
              <Link href="/forum">
                <Button 
                  variant={isActive('/forum') ? 'default' : 'ghost'} 
                  className="font-medium"
                >
                  Forum
                </Button>
              </Link>
            </>
          )}
          {userRole === 'admin' && (
            <>
              <Link href="/admin">
                <Button 
                  variant={isActive('/admin') ? 'default' : 'ghost'} 
                  className="font-medium"
                >
                  Gestion
                </Button>
              </Link>
              <Link href="/moderator">
                <Button 
                  variant={isActive('/moderator') ? 'default' : 'ghost'} 
                  className="font-medium"
                >
                  Modération
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <p className="text-sm font-medium text-foreground">{userName}</p>
            <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
          </div>
          <div className="relative group">
            <Button
              variant="outline"
              className="w-10 h-10 p-0 rounded-full"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </Button>
            <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg hidden group-hover:block py-2">
              <Link href="/profile">
                <button className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors">
                  Mon profil
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-secondary transition-colors border-t border-border"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
