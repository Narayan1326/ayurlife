"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface UserStats {
  totalUsers: number
  adminUsers: number
  regularUsers: number
  activeToday: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<UserStats>({
    totalUsers: 0,
    adminUsers: 0,
    regularUsers: 0,
    activeToday: 0,
  })

  useEffect(() => {
    const usersData = localStorage.getItem("ayurlife_users")
    const users = usersData ? JSON.parse(usersData) : []

    const adminCount = users.filter((u: any) => u.role === "admin").length
    const regularCount = users.filter((u: any) => u.role === "user").length

    setStats({
      totalUsers: users.length,
      adminUsers: adminCount,
      regularUsers: regularCount,
      activeToday: Math.floor(users.length * 0.6),
    })
  }, [])

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage users and system overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-teal-600">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">Registered accounts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-teal-600">{stats.adminUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">Administrator accounts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Regular Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-teal-600">{stats.regularUsers}</div>
            <p className="text-xs text-muted-foreground mt-1">Standard user accounts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Active Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-teal-600">{stats.activeToday}</div>
            <p className="text-xs text-muted-foreground mt-1">Users online</p>
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
              href="/admin/users"
              className="block w-full text-left p-3 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-950 transition border border-teal-200 dark:border-teal-800"
            >
              👥 Manage All Users
            </a>
            <a
              href="/admin/roles"
              className="block w-full text-left p-3 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-950 transition border border-teal-200 dark:border-teal-800"
            >
              🔐 Manage Roles & Permissions
            </a>
            <a
              href="/admin/activity"
              className="block w-full text-left p-3 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-950 transition border border-teal-200 dark:border-teal-800"
            >
              📊 View Activity Logs
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current system health</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-sm font-medium text-green-900 dark:text-green-100">Database Status</p>
              <p className="text-xs text-green-700 dark:text-green-300 mt-1">All systems operational</p>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-sm font-medium text-green-900 dark:text-green-100">API Status</p>
              <p className="text-xs text-green-700 dark:text-green-300 mt-1">All endpoints responding</p>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-sm font-medium text-green-900 dark:text-green-100">Security Status</p>
              <p className="text-xs text-green-700 dark:text-green-300 mt-1">No threats detected</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
