// In-memory storage (for demo purposes)
// In production, use a real database like Supabase, MongoDB, etc.

export type UserRole = 'user' | 'moderator' | 'admin'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  username: string
  password: string // In production, store hashed passwords
  topics: string[]
  role: UserRole
  avatar: string
  bio: string
  createdAt: string
  updatedAt: string
}

export interface Post {
  id: string
  authorId: string
  topicId: string
  title: string
  content: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
  updatedAt: string
  comments: Comment[]
}

export interface Comment {
  id: string
  authorId: string
  postId: string
  content: string
  createdAt: string
}

export interface Category {
  id: string
  name: string
  description: string
  icon: string
  color: string
  postsCount: number
}

// Global stores
let usersStore: User[] = []
let postsStore: Post[] = []
let categoriesStore: Category[] = []

export function getAllUsers(): User[] {
  return usersStore
}

export function getUserByEmail(email: string): User | undefined {
  return usersStore.find(user => user.email === email)
}

export function getUserByUsername(username: string): User | undefined {
  return usersStore.find(user => user.username === username)
}

export function createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'avatar' | 'bio' | 'role'>): User {
  const now = new Date().toISOString()
  const newUser: User = {
    ...userData,
    id: `user_${Date.now()}`,
    role: 'user',
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.username}`,
    bio: '',
    createdAt: now,
    updatedAt: now,
  }
  usersStore.push(newUser)
  return newUser
}

export function getUserById(id: string): User | undefined {
  return usersStore.find(user => user.id === id)
}

export function updateUserRole(userId: string, role: UserRole): User | undefined {
  const user = usersStore.find(u => u.id === userId)
  if (user) {
    user.role = role
    user.updatedAt = new Date().toISOString()
  }
  return user
}

// Posts functions
export function createPost(postData: Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'comments' | 'status'>): Post {
  const now = new Date().toISOString()
  const newPost: Post = {
    ...postData,
    id: `post_${Date.now()}`,
    status: 'pending',
    comments: [],
    createdAt: now,
    updatedAt: now,
  }
  postsStore.push(newPost)
  return newPost
}

export function getPostsByTopic(topicId: string): Post[] {
  return postsStore.filter(post => post.topicId === topicId && post.status === 'approved')
}

export function getPostById(id: string): Post | undefined {
  return postsStore.find(post => post.id === id)
}

export function getAllPosts(): Post[] {
  return postsStore.filter(p => p.status === 'approved')
}

export function getPendingPosts(): Post[] {
  return postsStore.filter(p => p.status === 'pending')
}

export function approvePost(postId: string): Post | undefined {
  const post = postsStore.find(p => p.id === postId)
  if (post) {
    post.status = 'approved'
    post.updatedAt = new Date().toISOString()
  }
  return post
}

export function rejectPost(postId: string): Post | undefined {
  const post = postsStore.find(p => p.id === postId)
  if (post) {
    post.status = 'rejected'
    post.updatedAt = new Date().toISOString()
  }
  return post
}

export function addCommentToPost(postId: string, commentData: Omit<Comment, 'id' | 'createdAt'>): Comment | undefined {
  const post = postsStore.find(p => p.id === postId)
  if (post) {
    const newComment: Comment = {
      ...commentData,
      id: `comment_${Date.now()}`,
      createdAt: new Date().toISOString(),
    }
    post.comments.push(newComment)
    return newComment
  }
  return undefined
}

export function getUserPosts(userId: string): Post[] {
  return postsStore.filter(p => p.authorId === userId && p.status === 'approved')
}

// Categories
export function getCategories(): Category[] {
  return categoriesStore
}

export function initializeCategories(): void {
  if (categoriesStore.length === 0) {
    categoriesStore = [
      {
        id: 'psychology',
        name: 'Psychologique',
        description: 'Bien-être & développement personnel',
        icon: '',
        color: 'bg-blue-100',
        postsCount: 0,
      },
      {
        id: 'legal',
        name: 'Juridique',
        description: 'Droits & conseils légaux',
        icon: '',
        color: 'bg-purple-100',
        postsCount: 0,
      },
      {
        id: 'health',
        name: 'Santé',
        description: 'Médical & prévention',
        icon: '',
        color: 'bg-red-100',
        postsCount: 0,
      },
      {
        id: 'education',
        name: 'Éducatif',
        description: 'Ressources & apprentissage',
        icon: '',
        color: 'bg-green-100',
        postsCount: 0,
      },
      {
        id: 'social',
        name: 'Social',
        description: 'Intégration & vie en communauté',
        icon: '',
        color: 'bg-yellow-100',
        postsCount: 0,
      },
    ]
  }
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePassword(password: string): boolean {
  return password.length >= 8
}

export function emailExists(email: string): boolean {
  return usersStore.some(user => user.email === email)
}

export function usernameExists(username: string): boolean {
  return usersStore.some(user => user.username === username)
}
