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

interface SidebarProps {
  onClose?: () => void
}

export default function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="w-full h-full bg-background border-r border-border overflow-y-auto flex flex-col">
      <div className="p-4 md:p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-primary-foreground text-lg">🍃</span>
          </div>
          <span className="text-lg md:text-xl font-bold text-primary truncate">AyurLife</span>
        </div>

        <nav className="space-y-1 md:space-y-2">
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 md:px-4 py-2 md:py-3 rounded-lg transition text-sm md:text-base ${
                  isActive ? "bg-primary/20 text-primary font-semibold" : "text-foreground hover:bg-accent/50"
                }`}
              >
                <span className="text-lg flex-shrink-0">{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
