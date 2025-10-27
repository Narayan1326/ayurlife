"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

export default function ReportsPage() {
  const router = useRouter()
  const [downloading, setDownloading] = useState<string | null>(null)

  const reportData = {
    daysActive: 28,
    adherence: 85,
    yogaMinutes: 120,
    wellnessScore: 92,
    recommendations: [
      "Increase meditation to 20 minutes daily",
      "Add more leafy greens to your diet",
      "Maintain consistent sleep schedule",
    ],
    generatedDate: new Date().toLocaleDateString(),
  }

  const downloadPDF = () => {
    setDownloading("pdf")
    const content = `
AYURLIFE WELLNESS REPORT
Generated: ${reportData.generatedDate}

MONTHLY SUMMARY
===============
Days Active: ${reportData.daysActive}
Adherence: ${reportData.adherence}%
Yoga Minutes: ${reportData.yogaMinutes}
Wellness Score: ${reportData.wellnessScore}%

RECOMMENDATIONS
===============
${reportData.recommendations.map((rec, i) => `${i + 1}. ${rec}`).join("\n")}
    `
    const element = document.createElement("a")
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content))
    element.setAttribute("download", `AyurLife_Report_${new Date().toISOString().split("T")[0]}.txt`)
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    setDownloading(null)
  }

  const downloadCSV = () => {
    setDownloading("csv")
    const csvContent = `Metric,Value
Days Active,${reportData.daysActive}
Adherence,${reportData.adherence}%
Yoga Minutes,${reportData.yogaMinutes}
Wellness Score,${reportData.wellnessScore}%
Generated Date,${reportData.generatedDate}`

    const element = document.createElement("a")
    element.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent))
    element.setAttribute("download", `AyurLife_Report_${new Date().toISOString().split("T")[0]}.csv`)
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    setDownloading(null)
  }

  const downloadJSON = () => {
    setDownloading("json")
    const jsonContent = JSON.stringify(
      {
        reportType: "Monthly Wellness Summary",
        generatedDate: reportData.generatedDate,
        metrics: {
          daysActive: reportData.daysActive,
          adherence: `${reportData.adherence}%`,
          yogaMinutes: reportData.yogaMinutes,
          wellnessScore: `${reportData.wellnessScore}%`,
        },
        recommendations: reportData.recommendations,
      },
      null,
      2,
    )
    const element = document.createElement("a")
    element.setAttribute("href", "data:application/json;charset=utf-8," + encodeURIComponent(jsonContent))
    element.setAttribute("download", `AyurLife_Report_${new Date().toISOString().split("T")[0]}.json`)
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    setDownloading(null)
  }

  const downloadExcel = () => {
    setDownloading("excel")
    const excelContent = `
    <table>
      <tr><th>Metric</th><th>Value</th></tr>
      <tr><td>Days Active</td><td>${reportData.daysActive}</td></tr>
      <tr><td>Adherence</td><td>${reportData.adherence}%</td></tr>
      <tr><td>Yoga Minutes</td><td>${reportData.yogaMinutes}</td></tr>
      <tr><td>Wellness Score</td><td>${reportData.wellnessScore}%</td></tr>
      <tr><td>Generated Date</td><td>${reportData.generatedDate}</td></tr>
    </table>
    `
    const element = document.createElement("a")
    element.setAttribute("href", "data:application/vnd.ms-excel;charset=utf-8," + encodeURIComponent(excelContent))
    element.setAttribute("download", `AyurLife_Report_${new Date().toISOString().split("T")[0]}.xls`)
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    setDownloading(null)
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-teal-600 hover:text-teal-700 font-semibold mb-4"
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Reports</h1>
        <p className="text-muted-foreground">View your wellness reports and analytics</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Summary</CardTitle>
            <CardDescription>Your wellness metrics for this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-teal-50 rounded-lg border border-teal-100">
                <p className="text-2xl font-bold text-teal-600">{reportData.daysActive}</p>
                <p className="text-sm text-muted-foreground">Days Active</p>
              </div>
              <div className="text-center p-4 bg-teal-50 rounded-lg border border-teal-100">
                <p className="text-2xl font-bold text-teal-600">{reportData.adherence}%</p>
                <p className="text-sm text-muted-foreground">Adherence</p>
              </div>
              <div className="text-center p-4 bg-teal-50 rounded-lg border border-teal-100">
                <p className="text-2xl font-bold text-teal-600">{reportData.yogaMinutes}</p>
                <p className="text-sm text-muted-foreground">Yoga Minutes</p>
              </div>
              <div className="text-center p-4 bg-teal-50 rounded-lg border border-teal-100">
                <p className="text-2xl font-bold text-teal-600">{reportData.wellnessScore}%</p>
                <p className="text-sm text-muted-foreground">Wellness Score</p>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold text-foreground mb-4">Download Report</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  onClick={downloadPDF}
                  disabled={downloading !== null}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition disabled:opacity-50"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                  {downloading === "pdf" ? "Downloading..." : "PDF"}
                </button>
                <button
                  onClick={downloadCSV}
                  disabled={downloading !== null}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition disabled:opacity-50"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  {downloading === "csv" ? "Downloading..." : "CSV"}
                </button>
                <button
                  onClick={downloadJSON}
                  disabled={downloading !== null}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition disabled:opacity-50"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                  {downloading === "json" ? "Downloading..." : "JSON"}
                </button>
                <button
                  onClick={downloadExcel}
                  disabled={downloading !== null}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition disabled:opacity-50"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  {downloading === "excel" ? "Downloading..." : "Excel"}
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
            <CardDescription>Based on your progress</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {reportData.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-teal-600 mr-3 font-bold">✓</span>
                  <span className="text-foreground">{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
