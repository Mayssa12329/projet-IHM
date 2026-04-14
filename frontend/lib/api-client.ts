/**
 * Configuration centralisée des appels API vers le backend Express
 * Utilisée par les routes Next.js API (/app/api/**)
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export interface ApiResponse<T = any> {
  success?: boolean
  data?: T
  message?: string
  error?: string
  user?: T
}

/**
 * Effectue une requête HTTP vers le backend
 */
export async function apiCall<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`
  
  const headers = new Headers(options.headers || {})
  headers.set('Content-Type', 'application/json')

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || `Erreur API: ${response.status}`)
    }

    return data
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error)
    throw error
  }
}

/**
 * Endpoints API disponibles
 */
export const API_ENDPOINTS = {
  // Auth
  AUTH_LOGIN: '/api/auth/login',
  AUTH_REGISTER: '/api/auth/register',
  AUTH_LOGOUT: '/api/auth/logout',

  // Publications
  PUBLICATIONS_LIST: '/api/publications',
  PUBLICATIONS_CREATE: '/api/publications',
  PUBLICATIONS_GET: (id: string) => `/api/publications/${id}`,
  PUBLICATIONS_UPDATE: (id: string) => `/api/publications/${id}`,
  PUBLICATIONS_DELETE: (id: string) => `/api/publications/${id}`,

  // Catégories
  CATEGORIES_LIST: '/api/categories',
  CATEGORIES_CREATE: '/api/categories',
  CATEGORIES_GET: (id: string) => `/api/categories/${id}`,

  // Utilisateurs
  USERS_LIST: '/api/users',
  USERS_GET: (id: string) => `/api/users/${id}`,
  USERS_UPDATE: (id: string) => `/api/users/${id}`,

  // Admin
  ADMIN_STATS: '/api/admin/stats',
  ADMIN_USERS: '/api/admin/users',

  // Modération
  MODERATOR_STATS: '/api/moderateur/stats',
  MODERATOR_REPORTED: '/api/moderateur/reports',

  // Signalements
  REPORTS_LIST: '/api/reports',
  REPORTS_CREATE: '/api/reports',
}
