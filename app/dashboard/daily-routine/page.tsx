"use client"

import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const DAILY_ROUTINES: Record<string, any> = {
  vata: {
    morning: [
      { time: "5:30 AM", activity: "Wake up", icon: "🌅" },
      { time: "6:00 AM", activity: "Warm oil massage (Abhyanga)", icon: "💆" },
      { time: "6:30 AM", activity: "Gentle yoga (Hatha)", icon: "🧘" },
      { time: "7:00 AM", activity: "Warm breakfast with ghee", icon: "🍲" },
    ],
    afternoon: [
      { time: "12:00 PM", activity: "Lunch (main meal of the day)", icon: "🍽️" },
      { time: "2:00 PM", activity: "Rest and relaxation", icon: "😴" },
      { time: "3:00 PM", activity: "Light work or creative activities", icon: "📚" },
    ],
    evening: [
      { time: "6:00 PM", activity: "Meditation and breathing (Pranayama)", icon: "🧘‍♀️" },
      { time: "7:00 PM", activity: "Warm dinner", icon: "🍜" },
      { time: "9:00 PM", activity: "Sleep (early bedtime)", icon: "😴" },
    ],
  },
  pitta: {
    morning: [
      { time: "6:00 AM", activity: "Wake up", icon: "🌅" },
      { time: "6:30 AM", activity: "Cool shower", icon: "🚿" },
      { time: "7:00 AM", activity: "Moderate yoga", icon: "🧘" },
      { time: "7:30 AM", activity: "Cooling breakfast", icon: "🥣" },
    ],
    afternoon: [
      { time: "12:30 PM", activity: "Lunch with cooling foods", icon: "🥗" },
      { time: "2:00 PM", activity: "Productive work", icon: "💼" },
      { time: "4:00 PM", activity: "Short break with water", icon: "💧" },
    ],
    evening: [
      { time: "6:00 PM", activity: "Moderate exercise", icon: "🏃" },
      { time: "7:00 PM", activity: "Dinner", icon: "🍽️" },
      { time: "10:00 PM", activity: "Sleep", icon: "😴" },
    ],
  },
  kapha: {
    morning: [
      { time: "5:00 AM", activity: "Wake up early", icon: "🌅" },
      { time: "5:30 AM", activity: "Vigorous exercise or running", icon: "🏃" },
      { time: "6:30 AM", activity: "Warm shower", icon: "🚿" },
      { time: "7:00 AM", activity: "Light breakfast with spices", icon: "🍵" },
    ],
    afternoon: [
      { time: "12:00 PM", activity: "Lunch with light foods", icon: "🍲" },
      { time: "1:00 PM", activity: "Active work", icon: "💼" },
      { time: "3:00 PM", activity: "Physical activity", icon: "🚴" },
    ],
    evening: [
      { time: "6:00 PM", activity: "Yoga and stretching", icon: "🧘" },
      { time: "7:00 PM", activity: "Dinner (light)", icon: "🍜" },
      { time: "9:30 PM", activity: "Sleep", icon: "😴" },
    ],
  },
}

export default function DailyRoutinePage() {
  const { user } = useAuth()
  const router = useRouter()
  const prakriti = user?.prakriti?.toLowerCase() || "vata"
  const routine = DAILY_ROUTINES[prakriti] || DAILY_ROUTINES.vata

  return (
    <div className="p-8">
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="text-2xl mr-2">🌅</span> Morning Routine
              </CardTitle>
              <CardDescription>Start your day right for optimal energy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {routine.morning.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-start p-4 bg-orange-50 rounded-lg border border-orange-100">
                    <span className="text-2xl mr-4">{item.icon}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{item.time}</p>
                      <p className="text-sm text-muted-foreground">{item.activity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="text-2xl mr-2">☀️</span> Afternoon Routine
              </CardTitle>
              <CardDescription>Maintain balance through the day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {routine.afternoon.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-start p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                    <span className="text-2xl mr-4">{item.icon}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{item.time}</p>
                      <p className="text-sm text-muted-foreground">{item.activity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="text-2xl mr-2">🌙</span> Evening Routine
              </CardTitle>
              <CardDescription>Wind down for quality sleep</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {routine.evening.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-start p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                    <span className="text-2xl mr-4">{item.icon}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{item.time}</p>
                      <p className="text-sm text-muted-foreground">{item.activity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
