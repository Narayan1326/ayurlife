"use client"

import { useRouter } from "next/navigation"
import { useRoutine } from "@/context/routine-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProgressPage() {
  const router = useRouter()
  const { getRoutineCompletionPercentage, getWellnessScore, getTodayCompletions, getTodayTotal } = useRoutine()

  const today = new Date().toISOString().split("T")[0]
  const todayAdherence = getRoutineCompletionPercentage(today)
  const wellnessScore = getWellnessScore()
  const todayCompletions = getTodayCompletions()
  const todayTotal = getTodayTotal()

  // Calculate weekly metrics
  let weeklyAdherence = 0
  for (let i = 0; i < 7; i++) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split("T")[0]
    weeklyAdherence += getRoutineCompletionPercentage(dateStr)
  }
  weeklyAdherence = Math.round(weeklyAdherence / 7)

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
        <h1 className="text-3xl font-bold text-foreground mb-2">Progress Tracking</h1>
        <p className="text-muted-foreground">Monitor your wellness journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Progress</CardTitle>
            <CardDescription>Your wellness metrics this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Routine Adherence</span>
                  <span className="text-sm font-semibold text-teal-600">{weeklyAdherence}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-teal-600 h-2 rounded-full transition-all"
                    style={{ width: `${weeklyAdherence}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Today's Completion</span>
                  <span className="text-sm font-semibold text-teal-600">
                    {todayTotal === 0 ? "0%" : Math.round((todayCompletions / todayTotal) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-teal-600 h-2 rounded-full transition-all"
                    style={{ width: `${todayTotal === 0 ? 0 : Math.round((todayCompletions / todayTotal) * 100)}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Consistency</span>
                  <span className="text-sm font-semibold text-teal-600">{todayAdherence}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-teal-600 h-2 rounded-full transition-all"
                    style={{ width: `${todayAdherence}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Wellness Score</CardTitle>
            <CardDescription>Overall wellness improvement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-5xl font-bold text-teal-600 mb-2">{wellnessScore}%</div>
              <p className="text-muted-foreground mb-4">
                {wellnessScore === 0
                  ? "Start tracking your routines to see your wellness score"
                  : wellnessScore >= 80
                    ? "Excellent progress! Keep it up!"
                    : "Great progress! Keep improving!"}
              </p>
              <div className="space-y-2 text-sm">
                <p>📊 Based on last 7 days</p>
                <p>🎯 Target: 90%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
