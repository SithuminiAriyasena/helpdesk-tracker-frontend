import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Shield, Eye, EyeOff } from 'lucide-react'
import { apiFetch } from '../api.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useTickets } from '../context/TicketContext.jsx'

export default function Register() {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('user')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { user: currentUser } = useAuth()
  const { fetchUsers } = useTickets()

  const validateEmail = (e) => {
    return String(e).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  }

  const validatePassword = (p) => {
    if (p.length !== 6) return false
    if (!/[a-zA-Z]/.test(p)) return false
    if (!/[0-9]/.test(p)) return false
    if (!/[@#$%!]/.test(p)) return false
    return true
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    setError('')

    if (!firstName || !lastName || !email || !password) {
      setError('Please fill in all fields.')
      return
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.')
      return
    }

    if (!validatePassword(password)) {
      setError('Password must be exactly 6 characters and contain letters, numbers and one of @#$%!')
      return
    }

    setLoading(true)
    try {
      const body = { name: `${firstName} ${lastName}`, email, password, role }
      const res = await apiFetch('/api/auth/register', { method: 'POST', body: JSON.stringify(body) })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || data.message || 'Failed to create account')
        setLoading(false)
        return
      }

      // success - if an admin created the account, refresh admin users list and go to admin users
      if (currentUser && currentUser.role === 'admin') {
        try {
          await fetchUsers()
        } catch (e) {
          // ignore fetch error here
        }
        navigate('/admin/users')
      } else {
        navigate('/login?created=1')
      }
    } catch (err) {
      console.error('Register error', err)
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas p-4">
      <div className="w-full max-w-xl">
        <div className="text-center mb-6">
          <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-brand-500 flex items-center justify-center shadow-lg">
            <User size={28} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-ink">Add a new HelpDesk Tracker user</h2>
        </div>

        <form onSubmit={handleCreate} className="bg-surface rounded-2xl p-6 shadow-card border border-line">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-ink-light">First name</label>
              <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="mt-2 w-full rounded-lg border border-line px-3 py-2 bg-canvas text-ink" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink-light">Last name</label>
              <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="mt-2 w-full rounded-lg border border-line px-3 py-2 bg-canvas text-ink" />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-ink-light">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="mt-2 w-full rounded-lg border border-line px-3 py-2 bg-canvas text-ink" />
          </div>

          <div className="mb-4 relative">
            <label className="block text-sm font-semibold text-ink-light">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} placeholder="At least 6 characters" className="mt-2 w-full rounded-lg border border-line px-3 py-2 bg-canvas text-ink pr-10" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-light hover:text-ink">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-ink-light mb-2">Role</label>
            <div className="flex gap-3">
              <button type="button" onClick={() => setRole('user')} className={`w-full rounded-xl border py-3 text-sm font-medium ${role==='user' ? 'border-brand-500 bg-brand-500/10 text-brand-500' : 'border-line bg-surface text-ink-light'}`}>
                <User size={16} className="inline-block mr-2" /> User
              </button>
              <button type="button" onClick={() => setRole('admin')} className={`w-full rounded-xl border py-3 text-sm font-medium ${role==='admin' ? 'border-brand-500 bg-brand-500/10 text-brand-500' : 'border-line bg-surface text-ink-light'}`}>
                <Shield size={16} className="inline-block mr-2" /> Admin
              </button>
            </div>
          </div>

          {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="w-full sm:w-1/2 rounded-lg border border-line bg-surface py-3 text-sm font-medium text-ink hover:bg-surface/80"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-1/2 rounded-lg bg-brand-500 py-3 text-white font-semibold"
            >
              {loading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
