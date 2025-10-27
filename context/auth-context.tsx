"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  age?: number
  gender?: string
  prakriti?: string
  prakritiDetails?: {
    vata: number
    pitta: number
    kapha: number
  }
  isAdmin?: boolean
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("ayurlife_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // Get all registered users from localStorage
      const usersData = localStorage.getItem("ayurlife_users")
      const users = usersData ? JSON.parse(usersData) : []

      // Find user with matching email and password
      const foundUser = users.find((u: any) => u.email === email && u.password === password)

      if (!foundUser) {
        throw new Error("Invalid email or password")
      }

      // Remove password from user object before storing
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem("ayurlife_user", JSON.stringify(userWithoutPassword))
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      // Get existing users
      const usersData = localStorage.getItem("ayurlife_users")
      const users = usersData ? JSON.parse(usersData) : []

      // Check if email already exists
      if (users.some((u: any) => u.email === email)) {
        throw new Error("Email already registered")
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password, // Store password (in production, this should be hashed)
        isAdmin: false,
      }

      // Add user to users list
      users.push(newUser)
      localStorage.setItem("ayurlife_users", JSON.stringify(users))

      // Log in the user
      const { password: _, ...userWithoutPassword } = newUser
      setUser(userWithoutPassword)
      localStorage.setItem("ayurlife_user", JSON.stringify(userWithoutPassword))
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("ayurlife_user")
  }

  const updateProfile = async (data: Partial<User>) => {
    try {
      if (!user) throw new Error("No user logged in")

      // Update current user
      const updatedUser = { ...user, ...data }
      setUser(updatedUser)
      localStorage.setItem("ayurlife_user", JSON.stringify(updatedUser))

      // Update user in users list
      const usersData = localStorage.getItem("ayurlife_users")
      const users = usersData ? JSON.parse(usersData) : []
      const userIndex = users.findIndex((u: any) => u.id === user.id)
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...data }
        localStorage.setItem("ayurlife_users", JSON.stringify(users))
      }
    } catch (error) {
      console.error("Update error:", error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
