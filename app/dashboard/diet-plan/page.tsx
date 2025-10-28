"use client"

import { useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const DIET_RECOMMENDATIONS: Record<string, any> = {
  vata: {
    foods: ["Warm cooked foods", "Ghee and oils", "Sesame seeds", "Warm milk", "Grains like rice and wheat"],
    avoid: ["Cold foods", "Raw vegetables", "Caffeine", "Dry fruits", "Carbonated drinks"],
    meals: [
      "Breakfast: Warm oatmeal with ghee and dates",
      "Lunch: Rice with warm curry and vegetables",
      "Dinner: Warm soup with bread and ghee",
    ],
    tips: ["Eat warm foods", "Avoid cold drinks", "Include healthy oils", "Eat at regular times"],
  },
  pitta: {
    foods: ["Cooling foods", "Coconut oil", "Leafy greens", "Sweet fruits", "Milk and ghee"],
    avoid: ["Spicy foods", "Alcohol", "Fried foods", "Sour foods", "Excess salt"],
    meals: [
      "Breakfast: Coconut milk porridge with berries",
      "Lunch: Salad with cooling herbs and olive oil",
      "Dinner: Light vegetable curry with rice",
    ],
    tips: ["Eat cooling foods", "Avoid spicy dishes", "Include fresh vegetables", "Stay hydrated"],
  },
  kapha: {
    foods: ["Light foods", "Spices", "Warm drinks", "Legumes", "Bitter greens"],
    avoid: ["Heavy foods", "Dairy", "Oils", "Sweet foods", "Cold drinks"],
    meals: [
      "Breakfast: Spiced tea with light toast",
      "Lunch: Lentil soup with vegetables",
      "Dinner: Steamed vegetables with spices",
    ],
    tips: ["Eat light foods", "Include spices", "Avoid heavy meals", "Stay active"],
  },
}

export default function DietPlanPage() {
  const { user } = useAuth()
  const router = useRouter()
  const prakriti = user?.prakriti?.toLowerCase() || "vata"
  const recommendations = DIET_RECOMMENDATIONS[prakriti] || DIET_RECOMMENDATIONS.vata

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <div>
        <button
          onClick={() => router.back()}
          className="flex items-center text-teal-600 hover:text-teal-700 font-semibold mb-4 text-sm md:text-base"
        >
          ← Back to Dashboard
        </button>
      </div>

      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Diet Plan</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Personalized nutrition for your {user?.prakriti} constitution
        </p>
      </div>

      {!user?.prakriti ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm md:text-base text-muted-foreground">
              Please complete your Prakriti assessment first to get personalized diet recommendations.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4 md:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Recommended Foods for {user.prakriti}</CardTitle>
              <CardDescription className="text-xs md:text-sm">Foods that balance your constitution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-3 md:mb-4 flex items-center text-sm md:text-base">
                    <span className="text-xl md:text-2xl mr-2">✅</span> Foods to Include
                  </h3>
                  <ul className="space-y-2 md:space-y-3">
                    {recommendations.foods.map((food: string, idx: number) => (
                      <li key={idx} className="flex items-start text-foreground text-xs md:text-sm">
                        <span className="w-2 h-2 bg-teal-600 rounded-full mr-3 mt-1.5 flex-shrink-0"></span>
                        <span>{food}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-3 md:mb-4 flex items-center text-sm md:text-base">
                    <span className="text-xl md:text-2xl mr-2">❌</span> Foods to Avoid
                  </h3>
                  <ul className="space-y-2 md:space-y-3">
                    {recommendations.avoid.map((food: string, idx: number) => (
                      <li key={idx} className="flex items-start text-foreground text-xs md:text-sm">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-1.5 flex-shrink-0"></span>
                        <span>{food}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Sample Daily Meals</CardTitle>
              <CardDescription className="text-xs md:text-sm">
                Suggested meal plan for your constitution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 md:space-y-4">
                {recommendations.meals.map((meal: string, idx: number) => (
                  <div
                    key={idx}
                    className="p-3 md:p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-100 dark:border-teal-800"
                  >
                    <p className="text-foreground font-medium text-xs md:text-sm">{meal}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Dietary Tips</CardTitle>
              <CardDescription className="text-xs md:text-sm">Best practices for your constitution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {recommendations.tips.map((tip: string, idx: number) => (
                  <div
                    key={idx}
                    className="p-3 md:p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-800"
                  >
                    <p className="text-foreground font-medium text-xs md:text-sm">💡 {tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
