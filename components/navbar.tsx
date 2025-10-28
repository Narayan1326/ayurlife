"use client"

import { useAuth } from "@/context/auth-context"
import { useTheme } from "@/context/theme-context"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface NavbarProps {
  onMenuClick?: () => void
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <nav className="bg-card border-b border-border px-4 md:px-8 py-3 md:py-4 flex items-center justify-between gap-4">
      <button onClick={onMenuClick} className="md:hidden p-2 rounded-lg hover:bg-accent transition" title="Toggle menu">
        <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="flex-1 min-w-0">
        <h2 className="text-base md:text-lg font-semibold text-foreground truncate">Welcome to AyurLife</h2>
      </div>

      <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900 transition"
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? (
            <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.121-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm5.657-9.193a1 1 0 00-1.414 0l-.707.707A1 1 0 005.05 6.464l.707-.707a1 1 0 001.414-1.414zM5 11a1 1 0 100-2H4a1 1 0 100 2h1z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        <Link
          href="/dashboard/profile"
          className="p-2 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900 transition"
          title="View profile"
        >
          <svg className="w-5 h-5 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </Link>

        <button
          onClick={handleLogout}
          className="px-3 md:px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition text-sm md:text-base whitespace-nowrap"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}
