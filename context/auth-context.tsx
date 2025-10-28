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
  role?: "user" | "admin"
  phone?: string
  address?: string
  joinDate?: string
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

const initializeDefaultAdmin = () => {
  try {
    const usersData = localStorage.getItem("ayurlife_users")
    const users = usersData ? JSON.parse(usersData) : []

    const adminIndex = users.findIndex((u: any) => u.email === "narayanpandey1326@gmail.com")
    const ADMIN_PASSWORD = "@Narayan_1326!"

    if (adminIndex === -1) {
      const defaultAdmin = {
        id: "admin_001",
        name: "Admin",
        email: "narayanpandey1326@gmail.com",
        password: ADMIN_PASSWORD,
        role: "admin",
        joinDate: new Date().toISOString(),
      }
      users.push(defaultAdmin)
      localStorage.setItem("ayurlife_users", JSON.stringify(users))
      console.log("[v0] Default admin initialized")
    } else {
      if (users[adminIndex].password !== ADMIN_PASSWORD) {
        users[adminIndex].password = ADMIN_PASSWORD
        localStorage.setItem("ayurlife_users", JSON.stringify(users))
        console.log("[v0] Admin password updated")
      } else {
        console.log("[v0] Admin already exists with correct password")
      }
    }
  } catch (error) {
    console.error("[v0] Error initializing admin:", error)
  }
}

// Initialize admin immediately when module loads
if (typeof window !== "undefined") {
  initializeDefaultAdmin()
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Ensure admin is initialized
    initializeDefaultAdmin()

    // Check if user is logged in
    const storedUser = localStorage.getItem("ayurlife_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("[v0] Error parsing stored user:", error)
        localStorage.removeItem("ayurlife_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const trimmedEmail = email.trim()
      const trimmedPassword = password.trim()

      // Get all registered users from localStorage
      const usersData = localStorage.getItem("ayurlife_users")
      const users = usersData ? JSON.parse(usersData) : []

      console.log("[v0] Login attempt with email:", trimmedEmail)
      console.log("[v0] Available users:", users.length)

      // Find user with matching email and password
      const foundUser = users.find((u: any) => {
        const emailMatch = u.email === trimmedEmail
        const passwordMatch = u.password === trimmedPassword
        return emailMatch && passwordMatch
      })

      if (!foundUser) {
        console.log("[v0] User not found or password mismatch")
        throw new Error("Invalid email or password")
      }

      console.log("[v0] Login successful for:", trimmedEmail)

      // Remove password from user object before storing
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem("ayurlife_user", JSON.stringify(userWithoutPassword))
    } catch (error) {
      console.error("[v0] Login error:", error)
      throw error
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      const trimmedEmail = email.trim()
      const trimmedPassword = password.trim()

      // Get existing users
      const usersData = localStorage.getItem("ayurlife_users")
      const users = usersData ? JSON.parse(usersData) : []

      // Check if email already exists
      if (users.some((u: any) => u.email === trimmedEmail)) {
        throw new Error("Email already registered")
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name,
        email: trimmedEmail,
        password: trimmedPassword,
        role: "user",
        joinDate: new Date().toISOString(),
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
