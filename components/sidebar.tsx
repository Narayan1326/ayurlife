"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const MENU_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: "🏠" },
  { href: "/dashboard/profile", label: "Profile", icon: "👤" },
  { href: "/dashboard/prakriti-analysis", label: "Prakriti Analysis", icon: "⚖️" },
  { href: "/dashboard/diet-plan", label: "Diet Plan", icon: "🍽️" },
  { href: "/dashboard/daily-routine", label: "Daily Routine", icon: "📅" },
  { href: "/dashboard/progress", label: "Progress", icon: "📈" },
  { href: "/dashboard/yoga-wellness", label: "Yoga & Wellness", icon: "❤️" },
  { href: "/dashboard/reports", label: "Reports", icon: "📋" },
  { href: "/dashboard/settings", label: "Settings", icon: "⚙️" },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-background border-r border-border h-screen overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground text-lg">🍃</span>
          </div>
          <span className="text-xl font-bold text-primary">AyurLife</span>
        </div>

        <nav className="space-y-2">
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive ? "bg-primary/20 text-primary font-semibold" : "text-foreground hover:bg-accent/50"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
