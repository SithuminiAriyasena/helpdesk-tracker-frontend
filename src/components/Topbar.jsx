import { Sun, Moon, Menu } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'

function initials(name = '') {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export default function Topbar({ title, subtitle, onOpenMobileMenu }) {
  const { user } = useAuth()
  const { dark, toggle } = useTheme()

  return (
    <header className="flex items-center justify-between border-b border-line bg-surface px-4 py-3.5 sm:px-6 sm:py-4 md:px-8 transition-colors">
      <div className="flex items-center gap-3">
        {onOpenMobileMenu && (
          <button
            onClick={onOpenMobileMenu}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-canvas text-ink-light transition-colors hover:text-ink md:hidden"
            title="Open navigation menu"
          >
            <Menu size={18} />
          </button>
        )}
        <div>
          <h1 className="font-display text-lg sm:text-xl font-bold text-ink leading-tight">{title}</h1>
          {subtitle && <p className="hidden sm:block mt-0.5 text-xs sm:text-sm text-ink-light">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Theme toggle */}
        <button
          onClick={toggle}
          title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-canvas text-ink-light transition-all hover:scale-105 hover:border-brand-500 hover:text-brand-500 shadow-sm"
        >
          {dark ? <Sun size={16} strokeWidth={2} /> : <Moon size={16} strokeWidth={2} />}
        </button>

        <div className="hidden sm:block text-right leading-tight">
          <p className="text-sm font-semibold text-ink">{user?.name}</p>
          <p className="text-xs capitalize text-ink-light">{user?.role}</p>
        </div>
        <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-brand-500/10 font-display text-xs sm:text-sm font-bold text-brand-500 overflow-hidden">
          {user?.avatar ? (
            <img src={user.avatar} alt="avatar" className="h-full w-full object-cover" />
          ) : (
            <span className="block w-full text-center">{initials(user?.name)}</span>
          )}
        </div>
      </div>
    </header>
  )
}
