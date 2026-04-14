'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/Navbar'

interface User {
  id: string
  username: string
  email: string
  firstName: string
  lastName: string
  role: 'user' | 'moderator' | 'admin'
  createdAt: string
}

interface AdminStats {
  totalUsers: number
  totalPosts: number
  pendingPosts: number
  moderators: number
  activeUsers: number
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([])
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalPosts: 0,
    pendingPosts: 0,
    moderators: 0,
    activeUsers: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const loadAdminData = async () => {
      try {
        // Mock data for demo
        const mockUsers: User[] = [
          {
            id: 'user_1',
            username: 'marie',
            email: 'marie@example.com',
            firstName: 'Marie',
            lastName: 'Dupont',
            role: 'user',
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: 'user_2',
            username: 'pierre',
            email: 'pierre@example.com',
            firstName: 'Pierre',
            lastName: 'Martin',
            role: 'moderator',
            createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: 'user_3',
            username: 'anne',
            email: 'anne@example.com',
            firstName: 'Anne',
            lastName: 'Bernard',
            role: 'user',
            createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
          },
        ]

        setUsers(mockUsers)
        setStats({
          totalUsers: 247,
          totalPosts: 512,
          pendingPosts: 2,
          moderators: 5,
          activeUsers: 89,
        })
      } catch (error) {
        console.error('Error loading admin data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadAdminData()
  }, [])

  const handlePromoteToModerator = (userId: string) => {
    setUsers(prev =>
      prev.map(u =>
        u.id === userId ? { ...u, role: 'moderator' } : u
      )
    )
  }

  const handleDemoteFromModerator = (userId: string) => {
    setUsers(prev =>
      prev.map(u =>
        u.id === userId ? { ...u, role: 'user' } : u
      )
    )
  }

  const handleRemoveUser = (userId: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId))
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <span className="text-xs font-semibold bg-red-100 text-red-800 px-3 py-1 rounded">Admin</span>
      case 'moderator':
        return <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-3 py-1 rounded">Modérateur</span>
      default:
        return <span className="text-xs font-semibold bg-gray-100 text-gray-800 px-3 py-1 rounded">Utilisateur</span>
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar userRole="admin" userName="Administrateur" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Administration</h2>
          <p className="text-muted-foreground text-lg">
            Gérez les utilisateurs, les modérateurs et le contenu de la plateforme
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-5 gap-4 mb-12">
          {[
            { label: 'Utilisateurs', value: stats.totalUsers, color: 'primary' },
            { label: 'Posts', value: stats.totalPosts, color: 'blue' },
            { label: 'En attente', value: stats.pendingPosts, color: 'yellow' },
            { label: 'Modérateurs', value: stats.moderators, color: 'green' },
            { label: 'Actifs aujourd&apos;hui', value: stats.activeUsers, color: 'purple' },
          ].map((stat, idx) => (
            <div key={idx} className="p-6 bg-card rounded-lg border border-border">
              <p className="text-muted-foreground text-sm font-medium mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Aperçu
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'users'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Utilisateurs
          </button>
          <button
            onClick={() => setActiveTab('moderators')}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'moderators'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Modérateurs
          </button>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Chargement des données...</p>
          </div>
        ) : activeTab === 'overview' ? (
          // Overview Tab
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-card rounded-lg border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-6">Activité récente</h3>
              <div className="space-y-4">
                {[
                  { action: 'Nouvel utilisateur inscrit', time: 'Il y a 2h', user: 'Sophie Martin' },
                  { action: 'Post approuvé', time: 'Il y a 5h', user: 'Discussion sur le bien-être' },
                  { action: 'Utilisateur promu modérateur', time: 'Il y a 1 jour', user: 'Pierre Dupont' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-foreground font-medium text-sm">{item.action}</p>
                      <p className="text-muted-foreground text-xs mt-1">{item.user}</p>
                      <p className="text-muted-foreground text-xs mt-1">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 bg-card rounded-lg border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-6">Statistiques</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Taux de modération</span>
                    <span className="text-sm font-semibold text-primary">92%</span>
                  </div>
                  <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[92%]" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Taux de satisfaction</span>
                    <span className="text-sm font-semibold text-accent">4.8/5</span>
                  </div>
                  <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-accent w-[96%]" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Croissance mensuelle</span>
                    <span className="text-sm font-semibold text-green-600">+12%</span>
                  </div>
                  <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-green-600 w-[45%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : activeTab === 'users' ? (
          // Users Tab
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/30 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Utilisateur</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Rôle</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Inscrit</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-foreground">{user.firstName} {user.lastName}</p>
                          <p className="text-sm text-muted-foreground">@{user.username}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">{user.email}</td>
                      <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {user.role === 'user' && (
                            <Button
                              onClick={() => handlePromoteToModerator(user.id)}
                              size="sm"
                              variant="outline"
                              className="text-xs font-medium"
                            >
                              Modérateur
                            </Button>
                          )}
                          {user.role === 'moderator' && (
                            <Button
                              onClick={() => handleDemoteFromModerator(user.id)}
                              size="sm"
                              variant="outline"
                              className="text-xs font-medium"
                            >
                              Utilisateur
                            </Button>
                          )}
                          <Button
                            onClick={() => handleRemoveUser(user.id)}
                            size="sm"
                            variant="outline"
                            className="text-xs font-medium text-destructive border-destructive hover:bg-destructive/10"
                          >
                            Supprimer
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          // Moderators Tab
          <div className="grid md:grid-cols-2 gap-6">
            {users.filter(u => u.role === 'moderator').map(moderator => (
              <div key={moderator.id} className="p-6 bg-card rounded-lg border border-border">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">{moderator.firstName} {moderator.lastName}</h4>
                    <p className="text-sm text-muted-foreground">@{moderator.username}</p>
                  </div>
                  <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-3 py-1 rounded">
                    Modérateur
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{moderator.email}</p>
                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Inscrit le {new Date(moderator.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                  <Button
                    onClick={() => handleDemoteFromModerator(moderator.id)}
                    size="sm"
                    variant="outline"
                    className="text-xs font-medium"
                  >
                    Retirer modération
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
