import { Link } from 'react-router-dom'
import { LifeBuoy, Zap, Shield, BarChart3, Clock, CheckCircle, ArrowRight, Menu, X, Sun, Moon } from 'lucide-react'
import { useState } from 'react'
import { useTickets } from '../context/TicketContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'

const FEATURES = [
  { icon: Zap, title: 'Fast Resolution', desc: 'AI-powered ticket routing gets issues to the right team instantly.' },
  { icon: Shield, title: 'Secure & Reliable', desc: 'Enterprise-grade security keeps your support data safe at all times.' },
  { icon: BarChart3, title: 'Real-time Analytics', desc: 'Track SLA performance, agent productivity, and CSAT scores live.' },
  { icon: Clock, title: '24/7 Automation', desc: 'Automate repetitive tasks so your team focuses on what matters.' },
]

const STATS = [
  { value: '10k+', label: 'Tickets Resolved' },
  { value: '98%', label: 'Customer Satisfaction' },
  { value: '< 2h', label: 'Avg. Response Time' },
  { value: '500+', label: 'Teams Onboarded' },
]

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { dark, toggle } = useTheme()
  
  // Real data from backend
  const { tickets } = useTickets()
  
  const openTickets = tickets.filter(t => t.status === 'Open')
  
  // Map priorities (admin uses High, Medium, Low)
  const urgentCount = tickets.filter(t => t.priority === 'Urgent').length
  const highCount = tickets.filter(t => t.priority === 'High').length
  const normalCount = tickets.filter(t => t.priority === 'Medium' || t.priority === 'Normal').length
  const lowCount = tickets.filter(t => t.priority === 'Low').length

  // Theme-aware classes
  const bg = dark ? 'bg-[#0d1b2e]' : 'bg-slate-50'
  const headerBg = dark ? 'bg-[#0d1b2e]/80' : 'bg-white/80'
  const border = dark ? 'border-white/10' : 'border-slate-200'
  const textPrimary = dark ? 'text-white' : 'text-slate-900'
  const textMuted = dark ? 'text-slate-400' : 'text-slate-500'
  const navLink = dark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
  const mobileMbg = dark ? 'bg-[#0d1b2e]' : 'bg-white'

  return (
    <div className={`min-h-screen ${bg} ${textPrimary} overflow-x-hidden transition-colors duration-300`}>

      {/* ── Navbar ─────────────────────────────────────────── */}
      <header className={`fixed inset-x-0 top-0 z-50 backdrop-blur-md ${headerBg} border-b ${border} transition-colors duration-300`}>
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg group-hover:scale-105 transition-transform">
              <LifeBuoy size={18} className="text-white" />
            </div>
            <div>
              <p className={`text-[15px] font-bold leading-tight ${textPrimary}`}>HelpDesk</p>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-violet-400">Tracker</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className={`hidden md:flex items-center gap-8 text-sm font-medium ${navLink}`}>
            <a href="#features" className="hover:text-violet-500 transition-colors">Features</a>
            <a href="#stats" className="hover:text-violet-500 transition-colors">Stats</a>
            <a href="#about-us" className="hover:text-violet-500 transition-colors">About Us</a>
          </nav>

          {/* CTA + Toggle */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggle}
              title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all hover:scale-105 hover:border-violet-500 hover:text-violet-400 ${dark ? 'border-white/20 bg-white/5 text-slate-300' : 'border-slate-200 bg-slate-100 text-slate-600'}`}
            >
              {dark ? <Sun size={16} strokeWidth={2} /> : <Moon size={16} strokeWidth={2} />}
            </button>

            <Link
              to="/login"
              className={`text-sm font-medium transition-colors ${navLink}`}
            >
              Sign In
            </Link>
            <Link
              to="/login"
              className="rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-lg hover:from-violet-500 hover:to-indigo-500 transition-all hover:scale-105 active:scale-95"
            >
              Get Started →
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggle}
              className={`flex h-8 w-8 items-center justify-center rounded-full border transition-colors ${dark ? 'border-white/20 text-slate-300' : 'border-slate-200 text-slate-600'}`}
            >
              {dark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <button
              className={`${navLink}`}
              onClick={() => setMobileOpen(o => !o)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className={`md:hidden border-t ${border} ${mobileMbg} px-6 py-4 flex flex-col gap-4`}>
            <a href="#features" className="text-sm text-slate-300 hover:text-white" onClick={() => setMobileOpen(false)}>Features</a>
            <a href="#stats" className="text-sm text-slate-300 hover:text-white" onClick={() => setMobileOpen(false)}>Stats</a>
            <a href="#about-us" className="text-sm text-slate-300 hover:text-white" onClick={() => setMobileOpen(false)}>About Us</a>
            <Link to="/login" className="mt-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-center text-sm font-semibold text-white" onClick={() => setMobileOpen(false)}>Get Started →</Link>
          </div>
        )}
      </header>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
        {/* Gradient blobs */}
        <div className="pointer-events-none absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-violet-700/20 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-indigo-700/20 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-16 items-center">

          {/* Left — headline */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/40 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold text-violet-300 mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
              Help desk automation
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] sm:leading-[1.08] tracking-tight mb-6">
              Automate your{' '}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                help desk.
              </span>
              <br />
              Elevate support<br />experiences.
            </h1>

            <p className={`${textMuted} text-lg leading-relaxed max-w-md mb-10`}>
              Put your help desk on auto-pilot. Cut down manual effort and boost productivity
              with smart routing, real-time analytics, and AI-powered automation.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-7 py-3.5 text-base font-semibold text-white shadow-xl hover:from-violet-500 hover:to-indigo-500 hover:scale-105 active:scale-95 transition-all"
              >
                Get Started Free <ArrowRight size={16} />
              </Link>
              <a
                href="#features"
                className={`inline-flex items-center gap-2 rounded-xl border px-7 py-3.5 text-base font-semibold transition-all ${dark ? 'border-white/20 bg-white/5 text-white hover:bg-white/10' : 'border-slate-300 bg-slate-100 text-slate-800 hover:bg-slate-200'}`}
              >
                See Features
              </a>
            </div>

            {/* Social proof */}
            <div className={`mt-10 flex items-center gap-3 text-sm ${textMuted}`}>
              <div className="flex -space-x-2">
                {['V', 'A', 'M', 'K'].map((l, i) => (
                  <div key={i} className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 ${dark ? 'border-[#0d1b2e]' : 'border-slate-50'} ${['bg-violet-500','bg-indigo-500','bg-pink-500','bg-cyan-500'][i]}`}>{l}</div>
                ))}
              </div>
              <span><strong className={textPrimary}>500+</strong> teams already on board</span>
            </div>
          </div>

          {/* Right — Login card */}
          <div className="relative">
            {/* Glow behind card */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-600/30 to-indigo-600/30 blur-2xl scale-110 pointer-events-none" />

            <div className={`relative rounded-3xl border backdrop-blur-xl p-8 shadow-2xl ${dark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white'}`}>
              <div className="mb-6 text-center">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 mb-4 shadow-lg">
                  <LifeBuoy size={22} className="text-white" />
                </div>
                <h2 className={`text-xl font-bold ${textPrimary}`}>Welcome to HelpDesk Tracker</h2>
                <p className={`text-sm ${textMuted} mt-1`}>Sign in to manage your tickets</p>
              </div>

              {/* Quick feature checklist */}
              <ul className="space-y-3 mb-8">
                {[
                  'Smart ticket auto-assignment',
                  'Real-time SLA monitoring',
                  'Role-based access (Admin / User)',
                  'Priority & category management',
                ].map(item => (
                  <li key={item} className={`flex items-center gap-3 text-sm ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
                    <CheckCircle size={16} className="shrink-0 text-violet-400" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                to="/login"
                className="block w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-3.5 text-center text-base font-semibold text-white shadow-lg hover:from-violet-500 hover:to-indigo-500 hover:scale-[1.02] active:scale-95 transition-all"
              >
                Sign In to Your Account
              </Link>

              <p className={`mt-4 text-center text-xs ${textMuted}`}>
                No account? Contact your administrator.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ──────────────────────────────────────────── */}
      <section id="stats" className={`border-y py-14 ${dark ? 'border-white/10 bg-white/[0.02]' : 'border-slate-200 bg-slate-100/50'}`}>
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <p className="text-4xl font-extrabold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">{value}</p>
              <p className={`mt-1 text-sm ${textMuted}`}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Ticket Board Preview ────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-4">One board to rule them all</p>
            <h2 className="text-4xl font-extrabold text-white leading-tight mb-6">
              Every open ticket, ranked by<br />
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">what breaches first.</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed max-w-md">
              Agents work from one board instead of switching between inbox,
              spreadsheet, and chat. Priority is always visible — nothing slips through.
            </p>

            {/* Bullet list */}
            <ul className="mt-8 space-y-3">
              {[
                'SLA breach timers count down in real time',
                'Priority levels: Urgent, High, Normal, Low',
                'One-click status updates for faster resolution',
              ].map(point => (
                <li key={point} className="flex items-start gap-3 text-sm text-slate-300">
                  <span className="mt-1 h-4 w-4 shrink-0 rounded-full bg-violet-500/20 flex items-center justify-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — mock browser UI */}
          <div className="relative">
            {/* Glow */}
            <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-br from-violet-600/20 to-indigo-600/20 blur-2xl" />

            {/* Browser chrome */}
            <div className={`relative rounded-2xl border overflow-hidden shadow-2xl ${dark ? 'border-white/10 bg-[#1a2235]' : 'border-slate-200 bg-white'}`}>

              {/* Browser title bar */}
              <div className={`flex items-center gap-1.5 px-4 py-3 border-b ${dark ? 'bg-[#141d2e] border-white/10' : 'bg-slate-100 border-slate-200'}`}>
                <span className="h-3 w-3 rounded-full bg-red-500/70" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
                <span className="h-3 w-3 rounded-full bg-green-500/70" />
                <div className={`ml-3 flex-1 rounded-md px-3 py-1 text-xs ${dark ? 'bg-white/5 text-slate-500' : 'bg-slate-200 text-slate-400'}`}>helpdesk.tracker/tickets</div>
              </div>

              <div className="p-5">
                {/* Priority Breakdown Widget */}
                <div className={`mb-6 rounded-xl border p-5 ${dark ? 'border-[#1E2740] bg-[#131829]' : 'border-slate-200 bg-slate-50'}`}>
                  <div className="mb-4">
                    <h3 className="text-[11px] font-bold text-indigo-400">PRIORITY BREAKDOWN</h3>
                    <p className={`text-xs mt-0.5 ${textMuted}`}>Share of open tickets by SLA priority</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-8">
                    {/* Donut Chart */}
                    <div className="relative h-32 w-32 shrink-0">
                      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90 transform">
                        {(() => {
                          const priorities = [
                            { name: 'Urgent', count: urgentCount, color: '#F0576B' },
                            { name: 'High', count: highCount, color: '#F59E42' },
                            { name: 'Normal', count: normalCount, color: '#34D399' },
                            { name: 'Low', count: lowCount, color: '#64748B' },
                          ]
                          const total = priorities.reduce((sum, p) => sum + p.count, 0)
                          
                          if (total === 0) {
                            return (
                              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1E2740" strokeWidth="12" />
                            )
                          }

                          let currentOffset = 0;
                          return priorities.map((p) => {
                            if (p.count === 0) return null;
                            const percentage = p.count / total;
                            const strokeDasharray = `${percentage * 251.2} 251.2`; // 2 * pi * r (r=40)
                            const strokeDashoffset = -currentOffset * 251.2;
                            currentOffset += percentage;
                            
                            return (
                              <circle
                                key={p.name}
                                cx="50"
                                cy="50"
                                r="40"
                                fill="transparent"
                                stroke={p.color}
                                strokeWidth="12"
                                strokeDasharray={strokeDasharray}
                                strokeDashoffset={strokeDashoffset}
                                className="transition-all duration-1000 ease-out"
                              />
                            )
                          })
                        })()}
                      </svg>
                      {/* Center Total */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={`font-mono text-2xl font-bold ${textPrimary}`}>
                          {urgentCount + highCount + normalCount + lowCount}
                        </span>
                        <span className="text-[9px] font-medium uppercase tracking-wider text-slate-500">
                          open tickets
                        </span>
                      </div>
                    </div>

                    {/* Legend */}
                    <div className="flex-1 w-full space-y-0">
                      {[
                        { name: 'Urgent', count: urgentCount, color: 'bg-[#F0576B]', textCol: 'text-[#F0576B]' },
                        { name: 'High', count: highCount, color: 'bg-[#F59E42]', textCol: 'text-[#F59E42]' },
                        { name: 'Normal', count: normalCount, color: 'bg-[#34D399]', textCol: 'text-[#34D399]' },
                        { name: 'Low', count: lowCount, color: 'bg-[#64748B]', textCol: 'text-[#64748B]' },
                      ].map((p, idx, arr) => {
                        const total = urgentCount + highCount + normalCount + lowCount
                        const pct = total === 0 ? 0 : Math.round((p.count / total) * 100)
                        return (
                          <div key={p.name} className={`flex items-center justify-between py-2.5 ${idx !== arr.length - 1 ? `border-b ${dark ? 'border-[#1E2740]/50' : 'border-slate-200'}` : ''}`}>
                            <div className="flex items-center gap-3">
                              <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${p.color}`} />
                              <div>
                                <p className={`text-sm font-bold ${textPrimary}`}>{p.name}</p>
                                <p className={`text-[10px] font-medium ${textMuted}`}>
                                  {p.count} ticket{p.count !== 1 ? 's' : ''}
                                </p>
                              </div>
                            </div>
                            <span className={`font-mono text-sm font-bold ${p.count > 0 ? p.textCol : 'text-[#64748B] opacity-50'}`}>
                              {pct}%
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────── */}

      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">Why teams love it</p>
            <h2 className="text-4xl font-extrabold text-white">Everything you need to run a<br />world-class help desk</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 hover:border-violet-500/40 transition-all hover:-translate-y-1"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600/40 to-indigo-600/40 group-hover:from-violet-600/60 group-hover:to-indigo-600/60 transition-all">
                  <Icon size={20} className="text-violet-300" />
                </div>
                <h3 className="font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── About Us ───────────────────────────────────────── */}
      <section id="about-us" className={`py-24 px-6 ${dark ? 'bg-white/[0.02]' : 'bg-slate-100/60'}`}>
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-16 items-start">

          {/* Left — text content */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-violet-400 mb-4">About Us</p>
            <h2 className={`text-4xl font-extrabold ${textPrimary} leading-tight mb-6`}>
              A simple, reliable place to manage every support request.
            </h2>

            <p className={`${textMuted} leading-relaxed mb-5`}>
              HelpDesk Tracker is a simple and reliable platform designed to make
              support requests easier to manage.
            </p>
            <p className={`${textMuted} leading-relaxed mb-8`}>
              We help organizations track, manage, and resolve support tickets in
              one central place. From submitting a new issue to monitoring its
              progress and completing the request, HelpDesk Tracker keeps
              everything organized and easy to follow.
            </p>

            {/* Blockquote */}
            <blockquote className="border-l-4 border-violet-500 pl-5 mb-10">
              <p className={`font-semibold text-lg leading-snug ${textPrimary}`}>
                Our goal is simple: make support faster, clearer, and more efficient.
              </p>
            </blockquote>

            {/* Capabilities checklist */}
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 mb-5">
              With HelpDesk Tracker, teams can
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {[
                'Submit and manage support requests',
                'Track ticket status and progress',
                'Assign issues to the right support staff',
                'Keep a clear record of previous requests',
                'Improve communication between users and support teams',
                'Resolve issues efficiently and on time',
              ].map(item => (
                <li key={item} className={`flex items-start gap-2.5 text-sm ${textMuted}`}>
                  <span className="mt-0.5 shrink-0 text-violet-400">
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — ticket path timeline card */}
          <div>
            <div className={`rounded-2xl border overflow-hidden shadow-2xl ${dark ? 'border-white/10 bg-[#1a2235]' : 'border-slate-200 bg-white'}`}>
              <div className="px-6 pt-6 pb-2">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500 mb-6">
                  A Ticket's Path Through HelpDesk
                </p>

                {/* Timeline steps */}
                <ol className="relative">
                  {[
                    {
                      label: 'Submitted',
                      desc: 'User logs the issue with the details support needs.',
                      time: '09:14 AM',
                      done: true,
                    },
                    {
                      label: 'Assigned',
                      desc: 'Routed to the right agent based on skill and load.',
                      time: '09:16 AM',
                      done: true,
                    },
                    {
                      label: 'In progress',
                      desc: 'Agent is working the ticket, status visible to the user.',
                      time: '09:42 AM',
                      done: false,
                    },
                    {
                      label: 'Resolved',
                      desc: 'Closed out with a record kept for next time.',
                      time: null,
                      done: false,
                    },
                  ].map((step, i, arr) => (
                    <li key={step.label} className="flex gap-4 pb-7 last:pb-0">
                      {/* Icon + connector line */}
                      <div className="flex flex-col items-center">
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                          step.done
                            ? 'bg-violet-600 border-violet-600'
                            : dark ? 'bg-transparent border-white/30' : 'bg-transparent border-slate-300'
                        }`}>
                          {step.done ? (
                            <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                            </svg>
                          ) : null}
                        </div>
                        {i < arr.length - 1 && (
                          <div className={`w-px flex-1 mt-1 ${step.done ? 'bg-violet-600/50' : dark ? 'bg-white/10' : 'bg-slate-200'}`} />
                        )}
                      </div>

                      {/* Content */}
                      <div className="pb-1">
                        <p className={`font-semibold text-base ${step.done ? textPrimary : 'text-violet-500'}`}>
                          {step.label}
                        </p>
                        <p className={`text-sm ${textMuted} mt-0.5 leading-relaxed`}>{step.desc}</p>
                        {step.time && (
                          <p className="text-xs text-slate-500 mt-1">{step.time}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Card footer */}
              <div className={`border-t px-6 py-4 mt-2 ${dark ? 'border-white/10' : 'border-slate-100'}`}>
                <p className={`text-xs ${textMuted}`}>
                  Every stage is logged automatically, so{' '}
                  <span className="text-violet-400 font-medium">nothing gets lost between handoffs</span>.
                </p>
              </div>
            </div>

            {/* Tagline card */}
            <div className={`mt-5 rounded-2xl border px-8 py-6 text-center ${dark ? 'bg-[#0d1b2e] border-white/10' : 'bg-slate-100 border-slate-200'}`}>
              <p className={`font-bold text-lg leading-snug ${textPrimary}`}>
                HelpDesk Tracker —{' '}
                <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                  making support simple, one ticket at a time.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ─────────────────────────────────────── */}
      <section id="about" className="relative py-24 px-6 overflow-hidden">
        {/* bg */}
        <div className={`absolute inset-0 ${dark ? 'bg-gradient-to-b from-[#0d1b2e] via-[#0a1628] to-[#060e1c]' : 'bg-gradient-to-b from-slate-100 via-slate-50 to-white'}`} />
        {dark && <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#3730a3_0%,_transparent_70%)] opacity-30" />}

        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className={`text-3xl md:text-4xl font-extrabold ${textPrimary} leading-snug mb-8`}>
            Want to explore how you can put your help desk
            operations on auto-pilot with HelpDesk Tracker?
            <span className="text-yellow-500"> Talk to our experts today!</span>
          </h2>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-9 py-4 text-base font-bold text-gray-900 shadow-xl hover:bg-yellow-300 hover:scale-105 active:scale-95 transition-all"
          >
            Sign in &amp; get started <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* ── Quick Links Bar ────────────────────────────────── */}
      <div className={`border-y ${dark ? 'bg-[#060e1c] border-white/10' : 'bg-slate-100 border-slate-200'}`}>
        <div className="mx-auto max-w-3xl flex items-center justify-center gap-10 py-5">
          {[
            { icon: BarChart3, label: 'Live Demo' },
            { icon: ArrowRight, label: 'Compare' },
            { icon: Zap, label: 'Get Quote' },
          ].map(({ icon: Icon, label }) => (
            <Link
              key={label}
              to="/login"
              className={`flex flex-col items-center gap-1.5 transition-colors group ${dark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors group-hover:border-violet-500/50 ${dark ? 'border-white/10' : 'border-slate-300'}`}>
                <Icon size={16} />
              </div>
              <span className="text-xs font-medium">{label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className={dark ? 'bg-[#111827]' : 'bg-slate-200'}>

        {/* Hotline bar */}
        <div className={`border-b py-3 text-center text-sm ${dark ? 'border-white/10 text-slate-300' : 'border-slate-300 text-slate-600'}`}>
          <span className="inline-flex items-center gap-2">
            <svg className="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2.28a2 2 0 011.897 1.368l.758 2.275a2 2 0 01-.45 2.07L8.34 9.858a16.016 16.016 0 006.802 6.802l1.145-1.145a2 2 0 012.07-.45l2.275.758A2 2 0 0121 17.72V20a2 2 0 01-2 2h-1C9.716 22 2 14.284 2 5V4a2 2 0 012-2h-.001z"/>
            </svg>
            To reach support, call&nbsp;
            <strong className="text-white text-base tracking-widest">+94 117 551 111</strong>
          </span>
        </div>

        {/* Office addresses */}
        <div className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-white/10">
          {[
            {
              region: 'SL',
              lines: [
                '147 Old Kottawa Road, Nugegoda 10250, Sri Lanka',
                '24/7 Hotline: +94117551111',
                'email: colombo.office@helpdesk.com',
                '💬 WhatsApp: +94711222002',
              ],
            },
            {
              region: 'USA',
              lines: [
                '4364 Cranwood Parkway,',
                'Warrensville Heights, OH 44128, USA',
                'Phone: +1-888-502-5244',
                'email: us.office@helpdesk.com',
              ],
            },
            {
              region: 'UK',
              lines: [
                '145-157 St John Street, London',
                'EC1V 4PY, United Kingdom',
                'Phone: +44-203-769-0961',
                'email: london.office@helpdesk.com',
              ],
            },
            {
              region: 'AUS',
              lines: [
                '440 Collins St, Level 9, #331,',
                'Melbourne VIC 3000',
                'Phone: +61-391-112-322',
                'email: melbourne.office@helpdesk.com',
              ],
            },
          ].map(({ region, lines }) => (
            <div key={region} className="flex gap-4">
              <span className="text-sm font-bold text-violet-400 w-10 shrink-0 pt-0.5">{region}:</span>
              <div className="space-y-1">
                {lines.map((l, i) => (
                  <p key={i} className={`text-xs leading-relaxed ${i === 0 ? 'text-slate-200 font-medium' : 'text-slate-400'}`}>{l}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* App / sell row */}
        <div className="mx-auto max-w-7xl px-6 py-7 flex flex-wrap items-center justify-center gap-4 border-b border-white/10">
          {/* Sell CTA */}
          <a href="#" className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-all">
            <LifeBuoy size={16} className="text-violet-400" />
            Partner with us
          </a>

          {/* App Store */}
          <a href="#" className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 hover:bg-white/10 transition-all">
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <span className="text-xs text-left leading-tight">
              <span className="block text-slate-400 text-[9px]">Download on the</span>
              <span className="block text-white font-semibold text-sm">App Store</span>
            </span>
          </a>

          {/* Google Play */}
          <a href="#" className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 hover:bg-white/10 transition-all">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3.18 23.76c.3.17.64.24.99.19l12.6-7.27-2.79-2.79-10.8 9.87zM.4 1.15A1.5 1.5 0 000 2.13v19.74c0 .39.14.73.4 1l.06.05 11.06-11.06v-.26L.46 1.1l-.06.05zm19.1 10.2l-2.83-1.63-3.13 3.13 3.13 3.13 2.86-1.65c.82-.47.82-1.51-.03-1.98zm-18.32 11.4l12.6-7.27-2.79-2.79L.18 21.6z" className="fill-[#4CAF50]"/>
            </svg>
            <span className="text-xs text-left leading-tight">
              <span className="block text-slate-400 text-[9px]">GET IT ON</span>
              <span className="block text-white font-semibold text-sm">Google Play</span>
            </span>
          </a>
        </div>

        {/* Policy links */}
        <div className="mx-auto max-w-3xl px-6 py-5 text-center border-b border-white/10">
          <nav className="flex flex-wrap justify-center items-center gap-x-1 gap-y-2 text-sm text-slate-400 mb-2">
            {['About us', 'Reviews', 'Refund & Returns', 'Careers', 'FAQs'].map((item, i, arr) => (
              <span key={item} className="flex items-center gap-1">
                <a href="#" className="hover:text-white transition-colors">{item}</a>
                {i < arr.length - 1 && <span className="text-slate-600">|</span>}
              </span>
            ))}
          </nav>
          <p className="text-xs text-slate-500">
            HelpDesk Tracker — Smart support for{' '}
            <span className="text-violet-400 font-medium">teams around the world</span>.
          </p>
        </div>

        {/* Social icons */}
        <div className="py-6 flex justify-center gap-4">
          {[
            { label: 'Facebook', path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
            { label: 'Twitter', path: 'M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0016.5 3a4.5 4.5 0 00-4.5 4.5v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
            { label: 'Instagram', path: 'M16 2H8a6 6 0 00-6 6v8a6 6 0 006 6h8a6 6 0 006-6V8a6 6 0 00-6-6zm4 14a4 4 0 01-4 4H8a4 4 0 01-4-4V8a4 4 0 014-4h8a4 4 0 014 4v8zm-8-9a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6zm4.5-9a1 1 0 100 2 1 1 0 000-2z' },
            { label: 'LinkedIn', path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z' },
            { label: 'YouTube', path: 'M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z' },
          ].map(({ label, path }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-slate-400 hover:border-violet-500 hover:text-violet-400 transition-all hover:scale-110"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d={path} />
              </svg>
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="pb-6 text-center text-xs text-slate-600">
          © 2026 <strong className="text-slate-500">HelpDesk Tracker</strong>. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
