"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const PRAKRITI_QUESTIONS = [
  {
    id: 1,
    question: "Your body frame is:",
    options: { vata: "Thin and light", pitta: "Medium and muscular", kapha: "Heavy and sturdy" },
  },
  {
    id: 2,
    question: "Your skin type is:",
    options: { vata: "Dry and rough", pitta: "Oily and sensitive", kapha: "Oily and thick" },
  },
  {
    id: 3,
    question: "Your appetite is:",
    options: { vata: "Variable and irregular", pitta: "Strong and consistent", kapha: "Slow and steady" },
  },
  {
    id: 4,
    question: "Your digestion is:",
    options: { vata: "Quick but irregular", pitta: "Fast and efficient", kapha: "Slow but steady" },
  },
  {
    id: 5,
    question: "Your sleep pattern is:",
    options: { vata: "Light and easily disturbed", pitta: "Moderate and sound", kapha: "Deep and prolonged" },
  },
  {
    id: 6,
    question: "Your memory is:",
    options: {
      vata: "Quick to learn, quick to forget",
      pitta: "Sharp and retentive",
      kapha: "Slow to learn, long retention",
    },
  },
  {
    id: 7,
    question: "Your speech is:",
    options: { vata: "Fast and talkative", pitta: "Sharp and precise", kapha: "Slow and measured" },
  },
  {
    id: 8,
    question: "Your emotional nature is:",
    options: { vata: "Anxious and changeable", pitta: "Passionate and intense", kapha: "Calm and stable" },
  },
]

export default function PrakritiAnalysisPage() {
  const { user, updateProfile } = useAuth()
  const router = useRouter()
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAnswer = (questionId: number, dosha: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: dosha }))
  }

  const calculatePrakriti = () => {
    const counts = { vata: 0, pitta: 0, kapha: 0 }
    Object.values(answers).forEach((dosha) => {
      counts[dosha as keyof typeof counts]++
    })
    return counts
  }

  const handleSubmit = async () => {
    if (Object.keys(answers).length < PRAKRITI_QUESTIONS.length) {
      alert("Please answer all questions")
      return
    }

    const counts = calculatePrakriti()
    const prakriti = Object.entries(counts).sort(([, a], [, b]) => b - a)[0][0]

    setIsSubmitting(true)
    try {
      await updateProfile({
        prakriti: prakriti.charAt(0).toUpperCase() + prakriti.slice(1),
        prakritiDetails: counts,
      })
      setShowResults(true)
    } catch (error) {
      console.error("Failed to save prakriti:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const counts = calculatePrakriti()
  const prakriti = Object.entries(counts).sort(([, a], [, b]) => b - a)[0][0]

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
        <h1 className="text-3xl font-bold text-foreground mb-2">Prakriti Analysis</h1>
        <p className="text-muted-foreground">Discover your unique Ayurvedic constitution</p>
      </div>

      {showResults && user?.prakriti ? (
        <div className="space-y-6">
          <Card className="border-2 border-teal-600">
            <CardHeader>
              <CardTitle className="text-2xl">Your Prakriti: {user.prakriti}</CardTitle>
              <CardDescription>Your unique Ayurvedic constitution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-teal-50 rounded-lg border border-teal-100">
                  <p className="text-sm text-muted-foreground">Vata</p>
                  <p className="text-2xl font-bold text-teal-600">{counts.vata}</p>
                </div>
                <div className="text-center p-4 bg-teal-50 rounded-lg border border-teal-100">
                  <p className="text-sm text-muted-foreground">Pitta</p>
                  <p className="text-2xl font-bold text-teal-600">{counts.pitta}</p>
                </div>
                <div className="text-center p-4 bg-teal-50 rounded-lg border border-teal-100">
                  <p className="text-sm text-muted-foreground">Kapha</p>
                  <p className="text-2xl font-bold text-teal-600">{counts.kapha}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Characteristics of {user.prakriti}:</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {prakriti === "vata" && (
                      <>
                        <li>Creative and enthusiastic</li>
                        <li>Quick to learn and adapt</li>
                        <li>Prone to anxiety and worry</li>
                        <li>Irregular eating and sleeping habits</li>
                      </>
                    )}
                    {prakriti === "pitta" && (
                      <>
                        <li>Intelligent and ambitious</li>
                        <li>Strong digestion and metabolism</li>
                        <li>Prone to anger and irritability</li>
                        <li>Excellent leadership qualities</li>
                      </>
                    )}
                    {prakriti === "kapha" && (
                      <>
                        <li>Calm and stable</li>
                        <li>Strong immunity</li>
                        <li>Prone to lethargy and weight gain</li>
                        <li>Loyal and compassionate</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => setShowResults(false)}
                className="mt-6 px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
              >
                Retake Assessment
              </button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Prakriti Assessment Questionnaire</CardTitle>
            <CardDescription>Answer all questions to determine your constitution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {PRAKRITI_QUESTIONS.map((q) => (
                <div key={q.id} className="border-b pb-6 last:border-b-0">
                  <p className="font-medium text-foreground mb-4">
                    {q.id}. {q.question}
                  </p>
                  <div className="space-y-2">
                    {Object.entries(q.options).map(([dosha, text]) => (
                      <label
                        key={dosha}
                        className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-teal-50 transition"
                      >
                        <input
                          type="radio"
                          name={`q${q.id}`}
                          value={dosha}
                          checked={answers[q.id] === dosha}
                          onChange={() => handleAnswer(q.id, dosha)}
                          className="mr-3"
                        />
                        <span className="text-foreground">{text}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting || Object.keys(answers).length < PRAKRITI_QUESTIONS.length}
              className="mt-8 w-full px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition disabled:opacity-50"
            >
              {isSubmitting ? "Analyzing..." : "Get My Prakriti"}
            </button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
