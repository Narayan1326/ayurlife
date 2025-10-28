"use client"

import { useAuth } from "@/context/auth-context"
import { useRoutine } from "@/context/routine-context"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from "react"

const DAILY_ROUTINES: Record<string, any> = {
  vata: {
    morning: [
      { id: "vata-morning-1", time: "5:30 AM", activity: "Wake up", icon: "🌅" },
      { id: "vata-morning-2", time: "6:00 AM", activity: "Warm oil massage (Abhyanga)", icon: "💆" },
      { id: "vata-morning-3", time: "6:30 AM", activity: "Gentle yoga (Hatha)", icon: "🧘" },
      { id: "vata-morning-4", time: "7:00 AM", activity: "Warm breakfast with ghee", icon: "🍲" },
    ],
    afternoon: [
      { id: "vata-afternoon-1", time: "12:00 PM", activity: "Lunch (main meal of the day)", icon: "🍽️" },
      { id: "vata-afternoon-2", time: "2:00 PM", activity: "Rest and relaxation", icon: "😴" },
      { id: "vata-afternoon-3", time: "3:00 PM", activity: "Light work or creative activities", icon: "📚" },
    ],
    evening: [
      { id: "vata-evening-1", time: "6:00 PM", activity: "Meditation and breathing (Pranayama)", icon: "🧘‍♀️" },
      { id: "vata-evening-2", time: "7:00 PM", activity: "Warm dinner", icon: "🍜" },
      { id: "vata-evening-3", time: "9:00 PM", activity: "Sleep (early bedtime)", icon: "😴" },
    ],
  },
  pitta: {
    morning: [
      { id: "pitta-morning-1", time: "6:00 AM", activity: "Wake up", icon: "🌅" },
      { id: "pitta-morning-2", time: "6:30 AM", activity: "Cool shower", icon: "🚿" },
      { id: "pitta-morning-3", time: "7:00 AM", activity: "Moderate yoga", icon: "🧘" },
      { id: "pitta-morning-4", time: "7:30 AM", activity: "Cooling breakfast", icon: "🥣" },
    ],
    afternoon: [
      { id: "pitta-afternoon-1", time: "12:30 PM", activity: "Lunch with cooling foods", icon: "🥗" },
      { id: "pitta-afternoon-2", time: "2:00 PM", activity: "Productive work", icon: "💼" },
      { id: "pitta-afternoon-3", time: "4:00 PM", activity: "Short break with water", icon: "💧" },
    ],
    evening: [
      { id: "pitta-evening-1", time: "6:00 PM", activity: "Moderate exercise", icon: "🏃" },
      { id: "pitta-evening-2", time: "7:00 PM", activity: "Dinner", icon: "🍽️" },
      { id: "pitta-evening-3", time: "10:00 PM", activity: "Sleep", icon: "😴" },
    ],
  },
  kapha: {
    morning: [
      { id: "kapha-morning-1", time: "5:00 AM", activity: "Wake up early", icon: "🌅" },
      { id: "kapha-morning-2", time: "5:30 AM", activity: "Vigorous exercise or running", icon: "🏃" },
      { id: "kapha-morning-3", time: "6:30 AM", activity: "Warm shower", icon: "🚿" },
      { id: "kapha-morning-4", time: "7:00 AM", activity: "Light breakfast with spices", icon: "🍵" },
    ],
    afternoon: [
      { id: "kapha-afternoon-1", time: "12:00 PM", activity: "Lunch with light foods", icon: "🍲" },
      { id: "kapha-afternoon-2", time: "1:00 PM", activity: "Active work", icon: "💼" },
      { id: "kapha-afternoon-3", time: "3:00 PM", activity: "Physical activity", icon: "🚴" },
    ],
    evening: [
      { id: "kapha-evening-1", time: "6:00 PM", activity: "Yoga and stretching", icon: "🧘" },
      { id: "kapha-evening-2", time: "7:00 PM", activity: "Dinner (light)", icon: "🍜" },
      { id: "kapha-evening-3", time: "9:30 PM", activity: "Sleep", icon: "😴" },
    ],
  },
}

export default function DailyRoutinePage() {
  const { user } = useAuth()
  const router = useRouter()
  const { completions, toggleRoutineCompletion } = useRoutine()
  const [today, setToday] = useState("")

  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0])
  }, [])

  const prakriti = user?.prakriti?.toLowerCase() || "vata"
  const routine = DAILY_ROUTINES[prakriti] || DAILY_ROUTINES.vata

  const isCompleted = (routineId: string) => {
    const routineCompletions = completions[routineId] || []
    return routineCompletions.some((c) => c.date === today && c.completed)
  }

  const handleToggle = (routineId: string) => {
    toggleRoutineCompletion(routineId, today)
  }

  const renderRoutineSection = (title: string, icon: string, items: any[], bgColor: string, borderColor: string) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <span className="text-2xl mr-2">{icon}</span> {title}
        </CardTitle>
        <CardDescription>
          {title === "Morning Routine" && "Start your day right for optimal energy"}
          {title === "Afternoon Routine" && "Maintain balance through the day"}
          {title === "Evening Routine" && "Wind down for quality sleep"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {items.map((item: any) => (
            <div
              key={item.id}
              className={`flex items-start p-4 rounded-lg border transition ${
                isCompleted(item.id) ? `${bgColor} opacity-60 line-through` : `${bgColor} ${borderColor}`
              }`}
            >
              <input
                type="checkbox"
                checked={isCompleted(item.id)}
                onChange={() => handleToggle(item.id)}
                className="w-5 h-5 mt-0.5 mr-4 cursor-pointer accent-teal-600 flex-shrink-0"
              />
              <span className="text-2xl mr-4 flex-shrink-0">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground">{item.time}</p>
                <p className="text-sm text-muted-foreground">{item.activity}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-teal-600 hover:text-teal-700 font-semibold mb-4"
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Daily Routine</h1>
        <p className="text-muted-foreground">Personalized schedule for your {user?.prakriti} constitution</p>
      </div>

      {!user?.prakriti ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">
              Please complete your Prakriti assessment first to get personalized routine recommendations.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {renderRoutineSection("Morning Routine", "🌅", routine.morning, "bg-orange-50", "border-orange-100")}
          {renderRoutineSection("Afternoon Routine", "☀️", routine.afternoon, "bg-yellow-50", "border-yellow-100")}
          {renderRoutineSection("Evening Routine", "🌙", routine.evening, "bg-indigo-50", "border-indigo-100")}
        </div>
      )}
    </div>
  )
}
