"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const ADMIN_MENU_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/students", label: "Students", icon: "👥" },
  { href: "/admin/follow-ups", label: "Follow-ups", icon: "📋" },
  { href: "/admin/reports", label: "Reports", icon: "📈" },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-background border-r border-border h-screen overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground text-lg">⚙️</span>
          </div>
          <span className="text-xl font-bold text-primary">AyurLife Admin</span>
        </div>

        <nav className="space-y-2">
          {ADMIN_MENU_ITEMS.map((item) => {
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

        <div className="mt-8 pt-8 border-t border-border">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground hover:bg-accent/50 transition"
          >
            <span className="text-lg">👤</span>
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </div>
    </aside>
  )
}
