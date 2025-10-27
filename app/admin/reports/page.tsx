"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminReportsPage() {
  const [reportData, setReportData] = useState({
    totalRegistrations: 0,
    prakritiDistribution: { vata: 0, pitta: 0, kapha: 0 },
    genderDistribution: { male: 0, female: 0, other: 0 },
    completionRate: 0,
  })

  useEffect(() => {
    // Calculate report data from localStorage
    const students = JSON.parse(localStorage.getItem("ayurlife_students") || "[]")

    const prakritiDist = { vata: 0, pitta: 0, kapha: 0 }
    const genderDist = { male: 0, female: 0, other: 0 }
    let completedAssessments = 0

    students.forEach((student: any) => {
      if (student.prakriti) {
        prakritiDist[student.prakriti.toLowerCase() as keyof typeof prakritiDist]++
        completedAssessments++
      }
      if (student.gender) {
        genderDist[student.gender as keyof typeof genderDist]++
      }
    })

    setReportData({
      totalRegistrations: students.length,
      prakritiDistribution: prakritiDist,
      genderDistribution: genderDist,
      completionRate: students.length > 0 ? Math.round((completedAssessments / students.length) * 100) : 0,
    })
  }, [])

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Analytics & Reports</h1>
        <p className="text-muted-foreground">View comprehensive wellness program statistics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{reportData.totalRegistrations}</div>
            <p className="text-xs text-muted-foreground mt-1">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{reportData.completionRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">Assessment completion</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Most Common Prakriti</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {Object.entries(reportData.prakritiDistribution)
                .sort(([, a], [, b]) => b - a)[0]?.[0]
                ?.toUpperCase() || "N/A"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Among users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Program Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">Good</div>
            <p className="text-xs text-muted-foreground mt-1">All systems active</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Prakriti Distribution</CardTitle>
            <CardDescription>Breakdown of user constitutions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Vata</span>
                <span className="text-sm font-semibold text-primary">{reportData.prakritiDistribution.vata}</span>
              </div>
              <div className="w-full bg-accent/20 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{
                    width: `${
                      reportData.totalRegistrations > 0
                        ? (reportData.prakritiDistribution.vata / reportData.totalRegistrations) * 100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Pitta</span>
                <span className="text-sm font-semibold text-primary">{reportData.prakritiDistribution.pitta}</span>
              </div>
              <div className="w-full bg-accent/20 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{
                    width: `${
                      reportData.totalRegistrations > 0
                        ? (reportData.prakritiDistribution.pitta / reportData.totalRegistrations) * 100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Kapha</span>
                <span className="text-sm font-semibold text-primary">{reportData.prakritiDistribution.kapha}</span>
              </div>
              <div className="w-full bg-accent/20 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{
                    width: `${
                      reportData.totalRegistrations > 0
                        ? (reportData.prakritiDistribution.kapha / reportData.totalRegistrations) * 100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Gender Distribution</CardTitle>
            <CardDescription>User demographics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Male</span>
                <span className="text-sm font-semibold text-primary">{reportData.genderDistribution.male}</span>
              </div>
              <div className="w-full bg-accent/20 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{
                    width: `${
                      reportData.totalRegistrations > 0
                        ? (reportData.genderDistribution.male / reportData.totalRegistrations) * 100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Female</span>
                <span className="text-sm font-semibold text-primary">{reportData.genderDistribution.female}</span>
              </div>
              <div className="w-full bg-accent/20 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{
                    width: `${
                      reportData.totalRegistrations > 0
                        ? (reportData.genderDistribution.female / reportData.totalRegistrations) * 100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Other</span>
                <span className="text-sm font-semibold text-primary">{reportData.genderDistribution.other}</span>
              </div>
              <div className="w-full bg-accent/20 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full"
                  style={{
                    width: `${
                      reportData.totalRegistrations > 0
                        ? (reportData.genderDistribution.other / reportData.totalRegistrations) * 100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
