"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const YOGA_POSES = [
  {
    name: "Tadasana (Mountain Pose)",
    duration: "3 min",
    benefits: "Improves posture and balance",
    youtube: "https://www.youtube.com/embed/CTrRX7DcBSA",
    youtubeLink: "https://www.youtube.com/watch?v=CTrRX7DcBSA",
  },
  {
    name: "Surya Namaskar (Sun Salutation)",
    duration: "2 min",
    benefits: "Energizes the body and improves flexibility",
    youtube: "https://www.youtube.com/embed/1xRX1MuoImw",
    youtubeLink: "https://www.youtube.com/watch?v=1xRX1MuoImw",
  },
  {
    name: "Bhujangasana (Cobra Pose)",
    duration: "1 min",
    benefits: "Strengthens back and opens chest",
    youtube: "https://www.youtube.com/embed/UYDTHxVh2EE",
    youtubeLink: "https://www.youtube.com/watch?v=UYDTHxVh2EE",
  },
  {
    name: "Balasana (Child's Pose)",
    duration: "2 min",
    benefits: "Relaxes and calms the nervous system",
    youtube: "https://www.youtube.com/embed/2MJGg-dUKh0",
    youtubeLink: "https://www.youtube.com/watch?v=2MJGg-dUKh0",
  },
]

const MEDITATION_GUIDES = [
  {
    name: "Morning Meditation",
    duration: "10 minutes",
    description: "Focus on gratitude and set intentions for the day",
    youtube: "https://www.youtube.com/embed/inpok4MKVLM",
    youtubeLink: "https://www.youtube.com/watch?v=inpok4MKVLM",
  },
  {
    name: "Evening Meditation",
    duration: "15 minutes",
    description: "Body scan relaxation for deep rest",
    youtube: "https://www.youtube.com/embed/ZToicYcHIOU",
    youtubeLink: "https://www.youtube.com/watch?v=ZToicYcHIOU",
  },
  {
    name: "Breathing Exercise (Pranayama)",
    duration: "13 minutes",
    description: "Alternate nostril breathing for balance",
    youtube: "https://www.youtube.com/embed/I77hh5I69gA",
    youtubeLink: "https://www.youtube.com/watch?v=I77hh5I69gA",
  },
]

export default function YogaWellnessPage() {
  const router = useRouter()

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
        <h1 className="text-3xl font-bold text-foreground mb-2">Yoga & Wellness</h1>
        <p className="text-muted-foreground">Guided yoga practices and meditation for your wellbeing</p>
      </div>

      <div className="space-y-8">
        {/* Yoga Poses Section */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Daily Yoga Routine</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {YOGA_POSES.map((pose, idx) => (
              <Card key={idx} className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg">{pose.name}</CardTitle>
                  <CardDescription>{pose.benefits}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      src={pose.youtube}
                      title={pose.name}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-teal-600">Duration: {pose.duration}</span>
                    <a
                      href={pose.youtubeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-teal-600 hover:text-teal-700 font-semibold"
                    >
                      Watch on YouTube →
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Meditation Section */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Meditation & Breathing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MEDITATION_GUIDES.map((guide, idx) => (
              <Card key={idx} className="overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg">{guide.name}</CardTitle>
                  <CardDescription>{guide.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      src={guide.youtube}
                      title={guide.name}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-teal-600">Duration: {guide.duration}</span>
                    <a
                      href={guide.youtubeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-teal-600 hover:text-teal-700 font-semibold"
                    >
                      Watch on YouTube →
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Wellness Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Wellness Tips</CardTitle>
            <CardDescription>Best practices for a healthy lifestyle</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-teal-50 rounded-lg border border-teal-100">
                <p className="font-semibold text-foreground">🧘 Practice Regularly</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Consistency is key. Practice yoga and meditation daily for best results.
                </p>
              </div>
              <div className="p-4 bg-teal-50 rounded-lg border border-teal-100">
                <p className="font-semibold text-foreground">🌬️ Focus on Breathing</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Proper breathing enhances the benefits of yoga and meditation.
                </p>
              </div>
              <div className="p-4 bg-teal-50 rounded-lg border border-teal-100">
                <p className="font-semibold text-foreground">⏰ Best Times</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Practice yoga in early morning or evening for optimal results.
                </p>
              </div>
              <div className="p-4 bg-teal-50 rounded-lg border border-teal-100">
                <p className="font-semibold text-foreground">🧘‍♀️ Listen to Your Body</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Never force poses. Respect your body's limits and progress gradually.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
