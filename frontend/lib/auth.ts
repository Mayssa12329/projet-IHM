// Auth utilities for session management
import { cookies } from 'next/headers'
import { User } from './users-store'

const SESSION_COOKIE = 'community_session'

interface SessionData {
  userId: string
  username: string
  role: 'user' | 'moderator' | 'admin'
}

export async function setSession(user: User): Promise<void> {
  const cookieStore = await cookies()
  const sessionData: SessionData = {
    userId: user.id,
    username: user.username,
    role: user.role,
  }
  
  cookieStore.set(SESSION_COOKIE, JSON.stringify(sessionData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE)
  
  if (!session?.value) {
    return null
  }
  
  try {
    return JSON.parse(session.value) as SessionData
  } catch {
    return null
  }
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

export async function requireAuth() {
  const session = await getSession()
  if (!session) {
    throw new Error('Authentication required')
  }
  return session
}

export async function requireRole(allowedRoles: ('user' | 'moderator' | 'admin')[]): Promise<SessionData> {
  const session = await requireAuth()
  if (!allowedRoles.includes(session.role)) {
    throw new Error('Insufficient permissions')
  }
  return session
}
