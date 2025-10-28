"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "./auth-context"

interface RoutineCompletion {
  id: string
  date: string
  completed: boolean
}

interface RoutineContextType {
  completions: Record<string, RoutineCompletion[]>
  toggleRoutineCompletion: (routineId: string, date: string) => void
  getRoutineCompletionPercentage: (date: string) => number
  getStreak: () => number
  getWellnessScore: () => number
  getTodayCompletions: () => number
  getTodayTotal: () => number
}

const RoutineContext = createContext<RoutineContextType | undefined>(undefined)

export function RoutineProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [completions, setCompletions] = useState<Record<string, RoutineCompletion[]>>({})

  useEffect(() => {
    if (user?.id) {
      const stored = localStorage.getItem(`ayurlife_routines_${user.id}`)
      if (stored) {
        setCompletions(JSON.parse(stored))
      }
    }
  }, [user?.id])

  useEffect(() => {
    if (user?.id && Object.keys(completions).length > 0) {
      localStorage.setItem(`ayurlife_routines_${user.id}`, JSON.stringify(completions))
    }
  }, [completions, user?.id])

  const toggleRoutineCompletion = (routineId: string, date: string) => {
    setCompletions((prev) => {
      const routineCompletions = prev[routineId] || []
      const existingIndex = routineCompletions.findIndex((c) => c.date === date)

      if (existingIndex > -1) {
        const updated = [...routineCompletions]
        updated[existingIndex].completed = !updated[existingIndex].completed
        return { ...prev, [routineId]: updated }
      } else {
        return {
          ...prev,
          [routineId]: [...routineCompletions, { id: `${routineId}-${date}`, date, completed: true }],
        }
      }
    })
  }

  const getRoutineCompletionPercentage = (date: string) => {
    const totalRoutines = Object.keys(completions).length
    if (totalRoutines === 0) return 0

    const completedCount = Object.values(completions).filter((routineList) =>
      routineList.some((c) => c.date === date && c.completed),
    ).length

    return Math.round((completedCount / totalRoutines) * 100)
  }

  const getStreak = () => {
    if (Object.keys(completions).length === 0) return 0

    let streak = 0
    const today = new Date()

    for (let i = 0; i < 365; i++) {
      const checkDate = new Date(today)
      checkDate.setDate(checkDate.getDate() - i)
      const dateStr = checkDate.toISOString().split("T")[0]

      const allCompleted = Object.values(completions).every((routineList) =>
        routineList.some((c) => c.date === dateStr && c.completed),
      )

      if (allCompleted && Object.keys(completions).length > 0) {
        streak++
      } else {
        break
      }
    }

    return streak
  }

  const getWellnessScore = () => {
    if (Object.keys(completions).length === 0) return 0

    const today = new Date().toISOString().split("T")[0]
    const percentage = getRoutineCompletionPercentage(today)

    // Calculate based on last 7 days
    let totalScore = 0
    for (let i = 0; i < 7; i++) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split("T")[0]
      totalScore += getRoutineCompletionPercentage(dateStr)
    }

    return Math.round(totalScore / 7)
  }

  const getTodayCompletions = () => {
    const today = new Date().toISOString().split("T")[0]
    return Object.values(completions).filter((routineList) => routineList.some((c) => c.date === today && c.completed))
      .length
  }

  const getTodayTotal = () => {
    return Object.keys(completions).length
  }

  return (
    <RoutineContext.Provider
      value={{
        completions,
        toggleRoutineCompletion,
        getRoutineCompletionPercentage,
        getStreak,
        getWellnessScore,
        getTodayCompletions,
        getTodayTotal,
      }}
    >
      {children}
    </RoutineContext.Provider>
  )
}

export function useRoutine() {
  const context = useContext(RoutineContext)
  if (context === undefined) {
    throw new Error("useRoutine must be used within RoutineProvider")
  }
  return context
}
