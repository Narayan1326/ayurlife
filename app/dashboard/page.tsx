"use client"

import { useAuth } from "@/context/auth-context"
import { useRoutine } from "@/context/routine-context"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { getWellnessScore, getStreak, getTodayCompletions, getTodayTotal } = useRoutine()

  const wellnessScore = getWellnessScore()
  const streak = getStreak()
  const todayCompletions = getTodayCompletions()
  const todayTotal = getTodayTotal()

  const handleQuickAction = (path: string) => {
    router.push(path)
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Welcome to AyurLife</h1>
        <p className="text-sm md:text-base text-muted-foreground">Your personalized Ayurveda wellness dashboard</p>
      </div>

      <div>
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">Welcome, {user?.name}!</h2>
        <p className="text-sm md:text-base text-muted-foreground">Your personalized Ayurveda wellness dashboard</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card>
          <CardHeader className="pb-2 md:pb-3">
            <CardTitle className="text-xs md:text-sm font-medium">Your Prakriti</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold text-teal-600">{user?.prakriti || "Not Assessed"}</div>
            <p className="text-xs text-muted-foreground mt-1">Take assessment to know</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 md:pb-3">
            <CardTitle className="text-xs md:text-sm font-medium">Profile Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold text-teal-600">{user?.age ? "100%" : "50%"}</div>
            <p className="text-xs text-muted-foreground mt-1">Complete your profile</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 md:pb-3">
            <CardTitle className="text-xs md:text-sm font-medium">Wellness Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold text-teal-600">{wellnessScore}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              {wellnessScore === 0 ? "Start tracking" : "Keep it up!"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 md:pb-3">
            <CardTitle className="text-xs md:text-sm font-medium">Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold text-teal-600">
              {streak} {streak === 1 ? "day" : "days"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Consistency matters</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Quick Actions</CardTitle>
            <CardDescription className="text-xs md:text-sm">Get started with your wellness journey</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 md:space-y-3">
            <button
              onClick={() => handleQuickAction("/dashboard/prakriti-analysis")}
              className="w-full text-left p-3 md:p-4 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-900/20 transition border border-transparent hover:border-teal-200 cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <span className="text-xl md:text-2xl flex-shrink-0">📋</span>
                <div className="min-w-0">
                  <p className="font-semibold text-sm md:text-base text-foreground">Take Prakriti Assessment</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Discover your constitution</p>
                </div>
              </div>
            </button>
            <button
              onClick={() => handleQuickAction("/dashboard/profile")}
              className="w-full text-left p-3 md:p-4 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-900/20 transition border border-transparent hover:border-teal-200 cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <span className="text-xl md:text-2xl flex-shrink-0">👤</span>
                <div className="min-w-0">
                  <p className="font-semibold text-sm md:text-base text-foreground">Complete Your Profile</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Add your health information</p>
                </div>
              </div>
            </button>
            <button
              onClick={() => handleQuickAction("/dashboard/daily-routine")}
              className="w-full text-left p-3 md:p-4 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-900/20 transition border border-transparent hover:border-teal-200 cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <span className="text-xl md:text-2xl flex-shrink-0">🧘</span>
                <div className="min-w-0">
                  <p className="font-semibold text-sm md:text-base text-foreground">Start Daily Routine</p>
                  <p className="text-xs md:text-sm text-muted-foreground">Follow your personalized schedule</p>
                </div>
              </div>
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Today's Progress</CardTitle>
            <CardDescription className="text-xs md:text-sm">Routines completed today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 md:space-y-3">
            <div className="p-3 md:p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-100 dark:border-teal-800">
              <p className="text-xs md:text-sm font-medium text-teal-900 dark:text-teal-100">Routines Completed</p>
              <p className="text-2xl md:text-3xl font-bold text-teal-600 mt-2">
                {todayCompletions}/{todayTotal}
              </p>
            </div>
            <div className="p-3 md:p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-100 dark:border-teal-800">
              <p className="text-xs md:text-sm font-medium text-teal-900 dark:text-teal-100">Daily Wellness Tips</p>
              <p className="text-xs text-teal-700 dark:text-teal-200 mt-1">
                {todayTotal === 0 ? "Start your daily routine to track progress" : "Keep up the great work!"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
