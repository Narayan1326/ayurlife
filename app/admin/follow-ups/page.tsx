"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface FollowUp {
  id: string
  studentName: string
  studentEmail: string
  type: "assessment" | "diet" | "routine" | "progress"
  status: "pending" | "completed" | "overdue"
  dueDate: string
  notes: string
}

export default function FollowUpsPage() {
  const [followUps, setFollowUps] = useState<FollowUp[]>([])
  const [filterStatus, setFilterStatus] = useState("all")
  const [showForm, setShowForm] = useState(false)
  const [newFollowUp, setNewFollowUp] = useState({
    studentName: "",
    studentEmail: "",
    type: "assessment" as const,
    dueDate: "",
    notes: "",
  })

  useEffect(() => {
    // Load follow-ups from localStorage
    const storedFollowUps = JSON.parse(localStorage.getItem("ayurlife_followups") || "[]")
    setFollowUps(storedFollowUps)
  }, [])

  const handleAddFollowUp = () => {
    if (newFollowUp.studentName && newFollowUp.dueDate) {
      const followUp: FollowUp = {
        id: Date.now().toString(),
        ...newFollowUp,
        status: "pending",
      }
      const updated = [...followUps, followUp]
      setFollowUps(updated)
      localStorage.setItem("ayurlife_followups", JSON.stringify(updated))
      setNewFollowUp({
        studentName: "",
        studentEmail: "",
        type: "assessment",
        dueDate: "",
        notes: "",
      })
      setShowForm(false)
    }
  }

  const handleStatusChange = (id: string, newStatus: "pending" | "completed" | "overdue") => {
    const updated = followUps.map((f) => (f.id === id ? { ...f, status: newStatus } : f))
    setFollowUps(updated)
    localStorage.setItem("ayurlife_followups", JSON.stringify(updated))
  }

  const filteredFollowUps = filterStatus === "all" ? followUps : followUps.filter((f) => f.status === filterStatus)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Follow-up Management</h1>
        <p className="text-muted-foreground">Track and manage student follow-ups</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">
              {followUps.filter((f) => f.status === "pending").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {followUps.filter((f) => f.status === "completed").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {followUps.filter((f) => f.status === "overdue").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Add New Follow-up</CardTitle>
              <CardDescription>Create a new follow-up task for a student</CardDescription>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
            >
              {showForm ? "Cancel" : "Add Follow-up"}
            </button>
          </div>
        </CardHeader>
        {showForm && (
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Student Name</label>
                <input
                  type="text"
                  value={newFollowUp.studentName}
                  onChange={(e) => setNewFollowUp({ ...newFollowUp, studentName: e.target.value })}
                  placeholder="Enter student name"
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  value={newFollowUp.studentEmail}
                  onChange={(e) => setNewFollowUp({ ...newFollowUp, studentEmail: e.target.value })}
                  placeholder="Enter email"
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Follow-up Type</label>
                <select
                  value={newFollowUp.type}
                  onChange={(e) => setNewFollowUp({ ...newFollowUp, type: e.target.value as any })}
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                >
                  <option value="assessment">Assessment Reminder</option>
                  <option value="diet">Diet Plan Review</option>
                  <option value="routine">Routine Check-in</option>
                  <option value="progress">Progress Review</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Due Date</label>
                <input
                  type="date"
                  value={newFollowUp.dueDate}
                  onChange={(e) => setNewFollowUp({ ...newFollowUp, dueDate: e.target.value })}
                  className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Notes</label>
              <textarea
                value={newFollowUp.notes}
                onChange={(e) => setNewFollowUp({ ...newFollowUp, notes: e.target.value })}
                placeholder="Add any notes..."
                rows={3}
                className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
              />
            </div>
            <button
              onClick={handleAddFollowUp}
              className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition"
            >
              Create Follow-up
            </button>
          </CardContent>
        )}
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Follow-ups List</CardTitle>
              <CardDescription>Total: {filteredFollowUps.length} follow-ups</CardDescription>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredFollowUps.length > 0 ? (
              filteredFollowUps.map((followUp) => (
                <div key={followUp.id} className="p-4 border border-border rounded-lg hover:bg-accent/50 transition">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-foreground">{followUp.studentName}</p>
                      <p className="text-sm text-muted-foreground">{followUp.studentEmail}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(followUp.status)}`}>
                      {followUp.status.charAt(0).toUpperCase() + followUp.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="text-sm text-foreground">
                        Type: <span className="font-medium capitalize">{followUp.type}</span>
                      </p>
                      <p className="text-sm text-muted-foreground">Due: {followUp.dueDate}</p>
                    </div>
                    <select
                      value={followUp.status}
                      onChange={(e) => handleStatusChange(followUp.id, e.target.value as any)}
                      className="px-3 py-1 border border-input rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="overdue">Overdue</option>
                    </select>
                  </div>
                  {followUp.notes && <p className="text-sm text-muted-foreground italic">Note: {followUp.notes}</p>}
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">No follow-ups found</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
