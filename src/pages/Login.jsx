import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { Target, Eye, EyeOff, User, Hexagon, CheckCircle2, ArrowRight, Sun, Moon } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'

export default function Login() {
  const { login, quickLogin, error: authError, user } = useAuth()
  const { dark, toggle } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [validationError, setValidationError] = useState('')
  const [previewRole, setPreviewRole] = useState('admin')

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validatePassword = (password) => {
    if (password.length !== 6) return false;
    if (!/[a-zA-Z]/.test(password)) return false;
    if (!/[0-9]/.test(password)) return false;
    if (!/[@#$%!]/.test(password)) return false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setValidationError('')

    if (!email || !password) {
      setValidationError('Please fill in all fields.')
      return
    }

    if (!validateEmail(email)) {
      setValidationError('Please enter a valid email format.')
      return
    }

    if (!validatePassword(password)) {
      setValidationError('Password must be exactly 6 characters and contain at least one letter, one number, and one special symbol (@, #, $, %, !).')
      return
    }

    const ok = await login(email, password)
    if (ok) goToDashboard()
  }

  const goToDashboard = () => {
    setTimeout(() => {
      navigate(email.includes('admin') ? '/admin/dashboard' : '/dashboard')
    }, 0)
  }

  const handleQuickLogin = (role) => {
    quickLogin(role)
    navigate(role === 'admin' ? '/admin/dashboard' : '/dashboard')
  }

  const handleRoleSelect = (role) => {
    setPreviewRole(role);
    if (role === 'admin') {
      setEmail('admin@company.com');
      setPassword('Pass@1');
    } else {
      setEmail('sithuminiariyasena@gmail.com');
      setPassword('user@1');
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-canvas px-4 font-sans transition-colors duration-200">
      {/* Top right theme toggle */}
      <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
        <button
          onClick={toggle}
          title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-surface text-ink-light transition-all hover:scale-105 hover:border-brand-500 hover:text-brand-500 shadow-sm"
        >
          {dark ? <Sun size={16} strokeWidth={2} /> : <Moon size={16} strokeWidth={2} />}
        </button>
      </div>

      <div className="w-full max-w-md py-6 sm:py-8">
        <div className="mb-8 flex flex-col items-center text-center">
          <Link to="/" className="group flex flex-col items-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500 shadow-lg group-hover:opacity-90 transition-opacity">
              <Target size={28} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-ink tracking-tight group-hover:opacity-90 transition-opacity">HelpDesk Tracker</h1>
          </Link>
          <p className="mt-2 text-sm text-ink-light">Sign in to manage IT support tickets</p>
        </div>

        <div className="rounded-[24px] bg-surface p-6 sm:p-8 shadow-card border border-line transition-colors">
          <form onSubmit={handleSubmit}>
            <label className="mb-2 block text-sm font-bold text-ink">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sithuminiariyasena@gmail.com"
              className="mb-5 w-full rounded-xl bg-canvas border border-line px-4 py-3 text-sm text-ink outline-none focus:border-brand-500 focus:bg-surface focus:ring-2 focus:ring-brand-100 transition-all placeholder:text-ink-light"
            />
            
            <label className="mb-2 block text-sm font-bold text-ink">Password</label>
            <div className="relative mb-6">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className="w-full rounded-xl border border-line bg-canvas px-4 py-3 pr-11 text-sm text-ink outline-none focus:border-brand-500 focus:bg-surface focus:ring-2 focus:ring-brand-100 transition-all placeholder:text-ink-light"
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-light hover:text-ink focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            <div className="mb-6">
              <label className="mb-3 block text-sm font-bold text-ink">Log in as</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleRoleSelect('user')}
                  className={`relative flex items-center justify-start pl-4 gap-3 rounded-xl border py-3 text-sm font-bold transition-all ${
                    previewRole === 'user'
                      ? 'border-brand-500 bg-brand-500/10 text-brand-500'
                      : 'border-line bg-surface text-ink-light hover:border-brand-400 hover:text-ink'
                  }`}
                >
                  <User size={18} />
                  User
                  {previewRole === 'user' && (
                    <CheckCircle2 size={16} className="absolute right-3 top-3 text-brand-500" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleSelect('admin')}
                  className={`relative flex items-center justify-start pl-4 gap-3 rounded-xl border py-3 text-sm font-bold transition-all ${
                    previewRole === 'admin'
                      ? 'border-brand-500 bg-brand-500/10 text-brand-500'
                      : 'border-line bg-surface text-ink-light hover:border-brand-400 hover:text-ink'
                  }`}
                >
                  <Hexagon size={18} />
                  Admin
                  {previewRole === 'admin' && (
                    <CheckCircle2 size={16} className="absolute right-3 top-3 text-brand-500" />
                  )}
                </button>
              </div>
            </div>

            {(validationError || authError) && (
              <p className="mb-4 text-sm font-medium text-red-500">{validationError || authError}</p>
            )}

            {/* show account created message if redirected from registration */}
            {new URLSearchParams(location.search).get('created') === '1' && (
              <p className="mb-4 text-sm font-medium text-green-600">Account created successfully. You can now sign in.</p>
            )}
            
            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-brand-500 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-600 shadow-sm"
            >
              Sign in
            </button>
            {/* Google Login */}
            <button
              type="button"
              className="mt-2.5 w-full rounded-xl bg-red-600 py-3 text-sm font-bold text-white transition-colors hover:bg-red-700 shadow-sm flex items-center justify-center gap-3"
              onClick={() => { window.location.href = 'http://localhost:5000/api/auth/google'; }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48" aria-hidden>
                <path fill="#EA4335" d="M24 9.5c3.9 0 7.1 1.4 9.5 3.6l7-7C36.9 2.9 30.8 0 24 0 14.7 0 6.9 5.6 3 13.7l8.3 6.5C13.6 15 18.4 9.5 24 9.5z"/>
                <path fill="#34A853" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.5 2.7-2 5-4.4 6.6l6.9 5.3C44.6 37.7 46.5 31.8 46.5 24.5z"/>
                <path fill="#4A90E2" d="M10.3 29.9c-1.2-2.7-1.9-5.6-1.9-8.6s.7-5.9 1.9-8.6L3 6.2C.9 10.3 0 14.9 0 19.8s.9 9.5 3 13.6l7.3-3.5z"/>
                <path fill="#FBBC05" d="M24 48c6.5 0 12-2.1 16.1-5.8l-7.7-6.1C30.8 36.6 27.6 38 24 38c-5.6 0-10.4-5.5-12.7-11.9L3 30.3C6.9 38.4 14.7 44 24 44z"/>
              </svg>
              <span>Sign in with Google</span>
            </button>

            <div className="mt-4 text-center">
              <Link id="create-account-link" to="/register" className="text-sm font-semibold text-brand-500 hover:text-brand-600">
                Create account
              </Link>
            </div>
          </form>
        </div>
        
        <p className="mt-8 text-center text-xs text-ink-light leading-relaxed">
          User: sithuminiariyasena@gmail.com (password: "user@1")<br/>Admin: admin@company.com (password: "Pass@1")
        </p>
      </div>
    </div>
  )
}
