import Layout from '../../components/Layout.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

function initials(name = '') {
  return name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()
}

export default function Profile() {
  const { user } = useAuth()

  return (
    <Layout title="Profile" subtitle="Your account details">
      <div className="mx-auto max-w-xl rounded-xl2 bg-surface p-6 shadow-card border border-line">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-500/10 font-display text-xl font-bold text-brand-500">
            {initials(user.name)}
          </div>
          <div>
            <p className="font-display text-lg font-bold text-ink">{user.name}</p>
            <p className="text-sm capitalize text-ink-light">{user.role}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 border-t border-line pt-6 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-light">Email</p>
            <p className="mt-1 text-sm font-medium text-ink">{user.email}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-light">Role</p>
            <p className="mt-1 text-sm font-medium capitalize text-ink">{user.role}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-light">Employee ID</p>
            <p className="mt-1 font-mono text-sm font-medium text-ink">EMP-{String(user.id).padStart(4, '0')}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-light">Department</p>
            <p className="mt-1 text-sm font-medium text-ink">IT Operations</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
