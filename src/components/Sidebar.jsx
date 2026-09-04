import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Ticket,
  PlusCircle,
  UserCircle,
  LogOut,
  Users,
  ListChecks,
  LifeBuoy,
  X,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

const USER_NAV = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/my-tickets', label: 'My Tickets', icon: Ticket },
  { to: '/create-ticket', label: 'Create Ticket', icon: PlusCircle },
  { to: '/profile', label: 'Profile', icon: UserCircle },
]

const ADMIN_NAV = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/tickets', label: 'All Tickets', icon: ListChecks },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/profile', label: 'Profile', icon: UserCircle },
]

export default function Sidebar({ mobileOpen = false, onClose = () => {} }) {
  const { user, logout } = useAuth()
  const nav = user?.role === 'admin' ? ADMIN_NAV : USER_NAV

  const content = (
    <div className="flex h-full flex-col bg-surface text-ink-light transition-colors">
      <div className="flex items-center justify-between px-6 py-5">
        <NavLink
          to="/"
          onClick={onClose}
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80 cursor-pointer"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 shadow-sm">
            <LifeBuoy size={18} className="text-white" />
          </div>
          <div>
            <p className="font-display text-[15px] font-bold leading-tight text-ink">HelpDesk</p>
            <p className="text-[11px] font-medium uppercase tracking-wider text-brand-500">Tracker</p>
          </div>
        </NavLink>
        {mobileOpen && (
          <button
            onClick={onClose}
            className="md:hidden flex h-8 w-8 items-center justify-center rounded-lg border border-line text-ink-light hover:text-ink hover:bg-canvas transition-colors"
            title="Close navigation"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <nav className="mt-2 flex-1 space-y-1 px-3 overflow-y-auto">
        {nav.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-brand-500 text-white shadow-card font-semibold'
                  : 'text-ink-light hover:bg-canvas hover:text-ink'
              }`
            }
          >
            <Icon size={17} strokeWidth={2} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-line px-3 py-4">
        <button
          onClick={() => {
            logout()
            onClose()
          }}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink-light transition-colors hover:bg-canvas hover:text-ink"
        >
          <LogOut size={17} strokeWidth={2} />
          Logout
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-line md:block h-full">
        {content}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={onClose}
          />
          {/* Drawer panel */}
          <div className="relative flex w-72 max-w-[85vw] h-full shadow-2xl border-r border-line z-10">
            {content}
          </div>
        </div>
      )}
    </>
  )
}
