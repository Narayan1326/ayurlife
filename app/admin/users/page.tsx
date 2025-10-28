"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface User {
  id: string
  name: string
  email: string
  role: "user" | "admin"
  joinDate?: string
  age?: number
  gender?: string
}

export default function UsersManagementPage() {
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = () => {
    const usersData = localStorage.getItem("ayurlife_users")
    const users = usersData ? JSON.parse(usersData) : []
    setUsers(users)
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "all" || user.role === filterRole
    return matchesSearch && matchesRole
  })

  const handleChangeRole = (userId: string, newRole: "user" | "admin") => {
    const updatedUsers = users.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    setUsers(updatedUsers)
    localStorage.setItem("ayurlife_users", JSON.stringify(updatedUsers))
    setShowModal(false)
  }

  const handleDeleteUser = (userId: string) => {
    if (confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      const updatedUsers = users.filter((u) => u.id !== userId)
      setUsers(updatedUsers)
      localStorage.setItem("ayurlife_users", JSON.stringify(updatedUsers))
    }
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">User Management</h1>
        <p className="text-muted-foreground">Manage all registered users and their roles</p>
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
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-background text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Filter by Role</label>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-background text-foreground"
              >
                <option value="all">All Roles</option>
                <option value="user">Regular User</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Users List</CardTitle>
          <CardDescription>Total: {filteredUsers.length} users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Email</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Role</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Joined</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                    >
                      <td className="py-3 px-4 text-foreground font-medium">{user.name}</td>
                      <td className="py-3 px-4 text-foreground">{user.email}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            user.role === "admin"
                              ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                              : "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100"
                          }`}
                        >
                          {user.role === "admin" ? "Administrator" : "User"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground text-sm">
                        {user.joinDate ? new Date(user.joinDate).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedUser(user)
                              setShowModal(true)
                            }}
                            className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                          >
                            Edit Role
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 hover:text-red-700 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-muted-foreground">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Change User Role</CardTitle>
              <CardDescription>Update role for {selectedUser.name}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-foreground mb-3">Select new role:</p>
                <div className="space-y-2">
                  <button
                    onClick={() => handleChangeRole(selectedUser.id, "user")}
                    className={`w-full p-3 rounded-lg border-2 transition text-left ${
                      selectedUser.role === "user"
                        ? "border-teal-600 bg-teal-50 dark:bg-teal-950"
                        : "border-gray-200 hover:border-teal-300"
                    }`}
                  >
                    <p className="font-medium text-foreground">Regular User</p>
                    <p className="text-xs text-muted-foreground">Standard access to wellness features</p>
                  </button>
                  <button
                    onClick={() => handleChangeRole(selectedUser.id, "admin")}
                    className={`w-full p-3 rounded-lg border-2 transition text-left ${
                      selectedUser.role === "admin"
                        ? "border-red-600 bg-red-50 dark:bg-red-950"
                        : "border-gray-200 hover:border-red-300"
                    }`}
                  >
                    <p className="font-medium text-foreground">Administrator</p>
                    <p className="text-xs text-muted-foreground">Full access to admin panel</p>
                  </button>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-full px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
              >
                Close
              </button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
