"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface StudentStats {
  totalStudents: number
  completedAssessment: number
  pendingFollowups: number
  activeUsers: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<StudentStats>({
    totalStudents: 0,
    completedAssessment: 0,
    pendingFollowups: 0,
    activeUsers: 0,
  })

  useEffect(() => {
    // Fetch admin statistics
    const students = JSON.parse(localStorage.getItem("ayurlife_students") || "[]")
    const completedAssessment = students.filter((s: any) => s.prakriti).length
    const pendingFollowups = students.filter((s: any) => s.followupPending).length

    setStats({
      totalStudents: students.length,
      completedAssessment,
      pendingFollowups,
      activeUsers: Math.floor(students.length * 0.7),
    })
  }, [])

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage students and wellness programs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground mt-1">Registered users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Assessment Complete</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{stats.completedAssessment}</div>
            <p className="text-xs text-muted-foreground mt-1">Prakriti determined</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Pending Follow-ups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{stats.pendingFollowups}</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting action</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{stats.activeUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">This week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your admin tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <a
              href="/admin/students"
              className="block w-full text-left p-3 rounded-lg hover:bg-accent/50 transition border border-border"
            >
              👥 View All Students
            </a>
            <a
              href="/admin/follow-ups"
              className="block w-full text-left p-3 rounded-lg hover:bg-accent/50 transition border border-border"
            >
              📋 Manage Follow-ups
            </a>
            <a
              href="/admin/reports"
              className="block w-full text-left p-3 rounded-lg hover:bg-accent/50 transition border border-border"
            >
              📊 View Reports
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest student activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-accent/10 rounded-lg">
              <p className="text-sm font-medium text-foreground">New Registration</p>
              <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
            </div>
            <div className="p-3 bg-accent/10 rounded-lg">
              <p className="text-sm font-medium text-foreground">Assessment Completed</p>
              <p className="text-xs text-muted-foreground mt-1">4 hours ago</p>
            </div>
            <div className="p-3 bg-accent/10 rounded-lg">
              <p className="text-sm font-medium text-foreground">Profile Updated</p>
              <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
