"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Student {
  id: string
  name: string
  email: string
  age?: number
  gender?: string
  prakriti?: string
  registeredDate: string
  lastActive: string
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterPrakriti, setFilterPrakriti] = useState("all")

  useEffect(() => {
    // Load students from localStorage
    const storedStudents = JSON.parse(localStorage.getItem("ayurlife_students") || "[]")
    setStudents(storedStudents)
  }, [])

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPrakriti = filterPrakriti === "all" || student.prakriti === filterPrakriti
    return matchesSearch && matchesPrakriti
  })

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Student Management</h1>
        <p className="text-muted-foreground">View and manage all registered students</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Search by Name or Email</label>
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Filter by Prakriti</label>
              <select
                value={filterPrakriti}
                onChange={(e) => setFilterPrakriti(e.target.value)}
                className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
              >
                <option value="all">All Prakriti</option>
                <option value="Vata">Vata</option>
                <option value="Pitta">Pitta</option>
                <option value="Kapha">Kapha</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Students List</CardTitle>
          <CardDescription>Total: {filteredStudents.length} students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Age</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Prakriti</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Registered</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Last Active</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <tr key={student.id} className="border-b border-border hover:bg-accent/50 transition">
                      <td className="py-3 px-4 text-foreground">{student.name}</td>
                      <td className="py-3 px-4 text-foreground">{student.email}</td>
                      <td className="py-3 px-4 text-foreground">{student.age || "-"}</td>
                      <td className="py-3 px-4">
                        {student.prakriti ? (
                          <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                            {student.prakriti}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">Pending</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground text-sm">{student.registeredDate}</td>
                      <td className="py-3 px-4 text-muted-foreground text-sm">{student.lastActive}</td>
                      <td className="py-3 px-4">
                        <button className="text-primary hover:underline text-sm font-medium">View</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-muted-foreground">
                      No students found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
