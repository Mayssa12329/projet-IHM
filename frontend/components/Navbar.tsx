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
  const [profileOpen, setProfileOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      localStorage.removeItem('user')
      router.push('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const isActive = (path: string) => pathname === path

  return (
    <header className="border-b border-border bg-card/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href={userRole === 'admin' ? '/admin' : userRole === 'moderator' ? '/moderator' : '/forum'} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-gradient-to-br from-primary to-accent shadow-md">
            <img src="/chat_8708617.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold text-foreground">Communauté</h1>
            <p className="text-xs text-muted-foreground">Forum de discussion</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {userRole === 'user' && (
            <>
              <Link href="/forum">
                <Button 
                  variant={isActive('/forum') ? 'default' : 'ghost'} 
                  className="font-medium rounded-lg"
                >
                  📰 Forum
                </Button>
              </Link>
              <Link href="/forum/new-post">
                <Button 
                  variant={isActive('/forum/new-post') ? 'default' : 'ghost'} 
                  className="font-medium rounded-lg"
                >
                  ✍️ Nouveau post
                </Button>
              </Link>
              <Link href="/profile">
                <Button 
                  variant={isActive('/profile') ? 'default' : 'ghost'} 
                  className="font-medium rounded-lg"
                >
                  👤 Mon profil
                </Button>
              </Link>
            </>
          )}
          {userRole === 'moderator' && (
            <>
              <Link href="/moderator">
                <Button 
                  variant={isActive('/moderator') ? 'default' : 'ghost'} 
                  className="font-medium rounded-lg"
                >
                  📊 Dashboard
                </Button>
              </Link>
              <Link href="/forum">
                <Button 
                  variant={isActive('/forum') ? 'default' : 'ghost'} 
                  className="font-medium rounded-lg"
                >
                  📰 Forum
                </Button>
              </Link>
            </>
          )}
          {userRole === 'admin' && (
            <>
              <Link href="/admin">
                <Button 
                  variant={isActive('/admin') ? 'default' : 'ghost'} 
                  className="font-medium rounded-lg"
                >
                  ⚙️ Admin
                </Button>
              </Link>
              <Link href="/forum">
                <Button 
                  variant={isActive('/forum') ? 'default' : 'ghost'} 
                  className="font-medium rounded-lg"
                >
                  📰 Forum
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* User Profile & Logout */}
        <div className="flex items-center gap-4">
          {/* User Info (Desktop) */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/5 border border-primary/10">
            <span className="text-sm font-medium text-foreground">{userName}</span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold">
              {userName.charAt(0)}
            </div>
          </div>

          {/* Desktop Logout */}
          <Button
            onClick={handleLogout}
            variant="outline"
            className="hidden sm:inline-flex font-medium rounded-lg hover:bg-destructive/10 hover:text-destructive hover:border-destructive transition-colors"
          >
            Déconnexion
          </Button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-card/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
            {userRole === 'user' && (
              <>
                <Link href="/forum" onClick={() => setMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start rounded-lg">
                    📰 Forum
                  </Button>
                </Link>
                <Link href="/forum/new-post" onClick={() => setMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start rounded-lg">
                    ✍️ Nouveau post
                  </Button>
                </Link>
                <Link href="/profile" onClick={() => setMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start rounded-lg">
                    👤 Mon profil
                  </Button>
                </Link>
              </>
            )}
            <Button
              onClick={() => {
                handleLogout()
                setMenuOpen(false)
              }}
              variant="outline"
              className="w-full justify-start rounded-lg hover:bg-destructive/10"
            >
              Déconnexion
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
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
