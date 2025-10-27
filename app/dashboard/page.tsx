"use client"

import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()

  const handleQuickAction = (path: string) => {
    router.push(path)
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to AyurLife</h1>
        <p className="text-muted-foreground">Your personalized Ayurveda wellness dashboard</p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-4">Welcome, {user?.name}!</h2>
        <p className="text-muted-foreground">Your personalized Ayurveda wellness dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Your Prakriti</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal-600">{user?.prakriti || "Not Assessed"}</div>
            <p className="text-xs text-muted-foreground mt-1">Take assessment to know</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Profile Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal-600">{user?.age ? "100%" : "50%"}</div>
            <p className="text-xs text-muted-foreground mt-1">Complete your profile</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Wellness Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal-600">85%</div>
            <p className="text-xs text-muted-foreground mt-1">Keep it up!</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal-600">7 days</div>
            <p className="text-xs text-muted-foreground mt-1">Consistency matters</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with your wellness journey</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <button
              onClick={() => handleQuickAction("/dashboard/prakriti-analysis")}
              className="w-full text-left p-4 rounded-lg hover:bg-teal-50 transition border border-transparent hover:border-teal-200 cursor-pointer"
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">📋</span>
                <div>
                  <p className="font-semibold text-foreground">Take Prakriti Assessment</p>
                  <p className="text-sm text-muted-foreground">Discover your constitution</p>
                </div>
              </div>
            </button>
            <button
              onClick={() => handleQuickAction("/dashboard/profile")}
              className="w-full text-left p-4 rounded-lg hover:bg-teal-50 transition border border-transparent hover:border-teal-200 cursor-pointer"
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">👤</span>
                <div>
                  <p className="font-semibold text-foreground">Complete Your Profile</p>
                  <p className="text-sm text-muted-foreground">Add your health information</p>
                </div>
              </div>
            </button>
            <button
              onClick={() => handleQuickAction("/dashboard/daily-routine")}
              className="w-full text-left p-4 rounded-lg hover:bg-teal-50 transition border border-transparent hover:border-teal-200 cursor-pointer"
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">🧘</span>
                <div>
                  <p className="font-semibold text-foreground">Start Daily Routine</p>
                  <p className="text-sm text-muted-foreground">Follow your personalized schedule</p>
                </div>
              </div>
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today's Wellness Tips</CardTitle>
            <CardDescription>Personalized recommendations for you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-4 bg-teal-50 rounded-lg border border-teal-100">
              <p className="text-sm font-medium text-teal-900">Morning Routine</p>
              <p className="text-xs text-teal-700 mt-1">Wake up at 6 AM and drink warm water</p>
            </div>
            <div className="p-4 bg-teal-50 rounded-lg border border-teal-100">
              <p className="text-sm font-medium text-teal-900">Meditation</p>
              <p className="text-xs text-teal-700 mt-1">Practice 10 minutes of meditation</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
