"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { useTheme } from "@/context/theme-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()
  const [settings, setSettings] = useState({
    notifications: true,
    emailReminders: true,
    weeklyReports: true,
    soundAlerts: true,
    privateProfile: false,
    dataCollection: true,
  })

  const [language, setLanguage] = useState("en")
  const [timezone, setTimezone] = useState("UTC")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    const savedSettings = localStorage.getItem("ayurlife_settings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  const handleToggle = (key: string) => {
    const newSettings = { ...settings, [key]: !settings[key] }
    setSettings(newSettings)
    localStorage.setItem("ayurlife_settings", JSON.stringify(newSettings))
  }

  const handleThemeToggle = () => {
    toggleTheme()
  }

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value)
  }

  const handleTimezoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimezone(e.target.value)
  }

  const handleDeleteAccount = () => {
    if (showDeleteConfirm) {
      const usersData = localStorage.getItem("ayurlife_users")
      const users = usersData ? JSON.parse(usersData) : []
      const filteredUsers = users.filter((u: any) => u.id !== user?.id)
      localStorage.setItem("ayurlife_users", JSON.stringify(filteredUsers))
      logout()
      router.push("/login")
    }
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-teal-600 hover:text-teal-700 font-semibold mb-4"
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your preferences and account settings</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Control how you receive updates and reminders</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Push Notifications</p>
                <p className="text-sm text-muted-foreground">Receive wellness reminders and alerts</p>
              </div>
              <button
                onClick={() => handleToggle("notifications")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  settings.notifications ? "bg-teal-600" : "bg-muted"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    settings.notifications ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Email Reminders</p>
                <p className="text-sm text-muted-foreground">Get daily wellness tips via email</p>
              </div>
              <button
                onClick={() => handleToggle("emailReminders")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  settings.emailReminders ? "bg-teal-600" : "bg-muted"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    settings.emailReminders ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Weekly Reports</p>
                <p className="text-sm text-muted-foreground">Receive weekly progress summaries</p>
              </div>
              <button
                onClick={() => handleToggle("weeklyReports")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  settings.weeklyReports ? "bg-teal-600" : "bg-muted"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    settings.weeklyReports ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Sound Alerts</p>
                <p className="text-sm text-muted-foreground">Enable sound notifications</p>
              </div>
              <button
                onClick={() => handleToggle("soundAlerts")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  settings.soundAlerts ? "bg-teal-600" : "bg-muted"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    settings.soundAlerts ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Customize your AyurLife experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Language</label>
              <select
                value={language}
                onChange={handleLanguageChange}
                className="w-full px-4 py-2 border border-border bg-card text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="hi">Hindi</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Timezone</label>
              <select
                value={timezone}
                onChange={handleTimezoneChange}
                className="w-full px-4 py-2 border border-border bg-card text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="UTC">UTC</option>
                <option value="EST">Eastern Time (EST)</option>
                <option value="CST">Central Time (CST)</option>
                <option value="MST">Mountain Time (MST)</option>
                <option value="PST">Pacific Time (PST)</option>
                <option value="IST">Indian Standard Time (IST)</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Dark Mode</p>
                <p className="text-sm text-muted-foreground">Use dark theme for the app</p>
              </div>
              <button
                onClick={handleThemeToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  theme === "dark" ? "bg-teal-600" : "bg-muted"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    theme === "dark" ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Privacy & Security</CardTitle>
            <CardDescription>Manage your privacy settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Private Profile</p>
                <p className="text-sm text-muted-foreground">Hide your profile from other users</p>
              </div>
              <button
                onClick={() => handleToggle("privateProfile")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  settings.privateProfile ? "bg-teal-600" : "bg-muted"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    settings.privateProfile ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Data Collection</p>
                <p className="text-sm text-muted-foreground">Allow us to collect usage data for improvements</p>
              </div>
              <button
                onClick={() => handleToggle("dataCollection")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  settings.dataCollection ? "bg-teal-600" : "bg-muted"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    settings.dataCollection ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">Danger Zone</CardTitle>
            <CardDescription>Irreversible actions</CardDescription>
          </CardHeader>
          <CardContent>
            <button
              onClick={() => setShowDeleteConfirm(!showDeleteConfirm)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Delete Account
            </button>
            {showDeleteConfirm && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-800 dark:text-red-200 font-semibold mb-4">
                  Are you sure? This action cannot be undone. All your data will be permanently deleted.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={handleDeleteAccount}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Yes, Delete My Account
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
