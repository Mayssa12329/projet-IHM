'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  FileText, 
  Clock, 
  ShieldCheck, 
  Activity, 
  UserPlus, 
  Trash2, 
  MoreHorizontal,
  ChevronRight,
  LayoutDashboard
} from 'lucide-react'

// Interfaces restructurées pour la clarté
interface User {
  id: string
  username: string
  email: string
  firstName: string
  lastName: string
  role: 'user' | 'moderator' | 'admin'
  createdAt: string
  status: 'active' | 'inactive'
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
        // Simulation de données avec statut
        const mockUsers: User[] = [
          {
            id: 'user_1',
            username: 'marie_d',
            email: 'marie@example.com',
            firstName: 'Marie',
            lastName: 'Dupont',
            role: 'user',
            status: 'active',
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: 'user_2',
            username: 'pierre_m',
            email: 'pierre@example.com',
            firstName: 'Pierre',
            lastName: 'Martin',
            role: 'moderator',
            status: 'active',
            createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
          },
          {
            id: 'user_3',
            username: 'anne_b',
            email: 'anne@example.com',
            firstName: 'Anne',
            lastName: 'Bernard',
            role: 'user',
            status: 'inactive',
            createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
          },
        ]

        setUsers(mockUsers)
        setStats({
          totalUsers: 1248,
          totalPosts: 3542,
          pendingPosts: 14,
          moderators: 12,
          activeUsers: 456,
        })
      } finally {
        setIsLoading(false)
      }
    }
    loadAdminData()
  }, [])

  const getRoleStyle = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-rose-50 text-rose-600 border-rose-100'
      case 'moderator': return 'bg-blue-50 text-blue-600 border-blue-100'
      default: return 'bg-slate-50 text-slate-600 border-slate-100'
    }
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Sidebar Simulée ou Top Nav */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <LayoutDashboard size={18} />
            </div>
            <h1 className="font-bold text-slate-900 tracking-tight">Console Admin</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-900">Admin ReLife</p>
              <p className="text-xs text-slate-500">Super Utilisateur</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
               <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop" alt="Profile" width={40} height={40}/>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header avec Image Background Soft */}
        <div className="relative p-8 rounded-3xl bg-slate-900 overflow-hidden mb-10 shadow-2xl">
          <div className="absolute inset-0 opacity-20">
             <Image src="https://images.unsplash.com/photo-1551288049-bbda48658a7d?q=80&w=2070&auto=format&fit=crop" alt="Stats background" fill className="object-cover"/>
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-2">Tableau de Bord</h2>
            <p className="text-slate-400">Suivi en temps réel de votre écosystème communautaire.</p>
          </div>
        </div>

        {/* Stats Grid - IHM: Cartes de score avec icônes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
          {[
            { label: 'Utilisateurs', value: stats.totalUsers, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Publications', value: stats.totalPosts, icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'En attente', value: stats.pendingPosts, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Modérateurs', value: stats.moderators, icon: ShieldCheck, color: 'text-purple-600', bg: 'bg-purple-50' },
            { label: 'Actifs', value: stats.activeUsers, icon: Activity, color: 'text-rose-600', bg: 'bg-rose-50' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon size={24} />
              </div>
              <p className="text-3xl font-black text-slate-900">{stat.value}</p>
              <p className="text-xs font-bold text-slate-400 uppercase mt-1 tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs - Navigation simplifiée */}
        <div className="flex items-center gap-1 bg-white p-1.5 rounded-2xl border border-slate-200 w-fit mb-8">
          {['overview', 'users', 'moderators'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="transition-all duration-300">
          {activeTab === 'users' ? (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                  <tr>
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase">Membre</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase">Rôle</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase">Statut</th>
                    <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-blue-50/30 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                            {user.firstName[0]}{user.lastName[0]}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{user.firstName} {user.lastName}</p>
                            <p className="text-xs text-slate-500 tracking-tight">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${getRoleStyle(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                          <span className="text-sm font-medium text-slate-600">{user.status}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-lg">
                            <MoreHorizontal size={14} />
                          </Button>
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-lg text-rose-500 hover:bg-rose-50 border-rose-100">
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* Placeholder pour les autres onglets avec design de cartes */
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-bold text-slate-900">Activité Système</h3>
                  <Activity className="text-blue-600" size={20} />
                </div>
                <div className="space-y-6">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-1 bg-blue-100 rounded-full" />
                      <div>
                        <p className="text-sm font-bold text-slate-900 italic">Mise à jour du serveur réussie</p>
                        <p className="text-xs text-slate-500 mt-1">Il y a 14 minutes • Système</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-center items-center text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                  <UserPlus className="text-slate-400" size={32} />
                </div>
                <h4 className="font-bold text-slate-900">Nouveaux Modérateurs ?</h4>
                <p className="text-sm text-slate-500 mt-2 mb-6">Promouvez des membres de confiance pour <br/>aider à la gestion quotidienne.</p>
                <Button className="bg-slate-900 hover:bg-black text-white rounded-full px-8">
                  Inviter un modérateur
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}