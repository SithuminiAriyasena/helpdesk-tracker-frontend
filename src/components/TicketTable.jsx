import { useState, useRef, useEffect } from 'react'
import StatusBadge from './StatusBadge.jsx'
import PriorityBadge from './PriorityBadge.jsx'
import { ChevronDown, Flame, Minus, ArrowDown, Trash2 } from 'lucide-react'

const PRIORITY_CFG = {
  High:   { dot: 'bg-rose-500',    pill: 'text-rose-600 bg-rose-50 ring-rose-200',       option: 'text-rose-600 hover:bg-rose-50',     icon: Flame    },
  Medium: { dot: 'bg-amber-400',   pill: 'text-amber-600 bg-amber-50 ring-amber-200',    option: 'text-amber-600 hover:bg-amber-50',   icon: Minus    },
  Low:    { dot: 'bg-emerald-400', pill: 'text-emerald-600 bg-emerald-50 ring-emerald-200', option: 'text-emerald-600 hover:bg-emerald-50', icon: ArrowDown },
}

function PriorityPicker({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const cfg = PRIORITY_CFG[value] || {}
  const Icon = cfg.icon || Minus

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 transition-all hover:brightness-95 ${cfg.pill}`}
      >
        <Icon size={11} strokeWidth={2.5} />
        {value}
        <ChevronDown size={11} strokeWidth={2.5} className={`transition-transform duration-150 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-32 overflow-hidden rounded-xl border border-line bg-surface shadow-xl">
          {Object.entries(PRIORITY_CFG).map(([p, c]) => {
            const PIcon = c.icon
            return (
              <button
                key={p}
                onClick={() => { onChange(p); setOpen(false) }}
                className={`flex w-full items-center gap-2 px-3 py-2 text-xs font-semibold transition-colors hover:bg-canvas ${c.option}`}
              >
                <span className={`h-2 w-2 rounded-full ${c.dot}`} />
                {p}
                {p === value && <span className="ml-auto text-[10px] opacity-50">✓</span>}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

const STATUS_CFG = {
  Open:         { dot: 'bg-amber-400',   btn: 'text-amber-700 bg-amber-50 ring-amber-200',     option: 'text-amber-700 hover:bg-amber-50'   },
  'In Progress':{ dot: 'bg-blue-400',    btn: 'text-blue-700 bg-blue-50 ring-blue-200',        option: 'text-blue-700 hover:bg-blue-50'     },
  Resolved:     { dot: 'bg-emerald-500', btn: 'text-emerald-700 bg-emerald-50 ring-emerald-200', option: 'text-emerald-700 hover:bg-emerald-50' },
}

function StatusPicker({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const cfg = STATUS_CFG[value] || {}

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 transition-all hover:brightness-95 ${cfg.btn}`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
        {value}
        <ChevronDown size={11} strokeWidth={2.5} className={`transition-transform duration-150 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-36 overflow-hidden rounded-xl border border-line bg-surface shadow-xl">
          {Object.entries(STATUS_CFG).map(([s, c]) => (
            <button
              key={s}
              onClick={() => { onChange(s); setOpen(false) }}
              className={`flex w-full items-center gap-2 px-3 py-2 text-xs font-semibold transition-colors hover:bg-canvas ${c.option}`}
            >
              <span className={`h-2 w-2 rounded-full ${c.dot}`} />
              {s}
              {s === value && <span className="ml-auto text-[10px] opacity-50">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function TicketTable({ tickets, showRequester = false, onStatusChange, onPriorityChange, onDeleteTicket }) {
  if (!tickets.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-surface py-16 text-center shadow-card border border-line">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-canvas">
          <svg className="h-6 w-6 text-ink-light" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <p className="font-display text-base font-semibold text-ink">No tickets to show</p>
        <p className="mt-1 text-sm text-ink-light">New tickets will appear here as they come in.</p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-surface shadow-sm ring-1 ring-line">
      <div className="overflow-x-auto">
        <table className="min-w-[640px] w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line bg-canvas text-xs font-semibold uppercase tracking-wider text-ink-light">
              {onDeleteTicket && <th className="w-10 px-4 py-3.5"></th>}
              <th className="px-5 py-3.5">Ticket</th>
              <th className="px-5 py-3.5">Subject</th>
              {showRequester && <th className="px-5 py-3.5">Requester</th>}
              <th className="px-5 py-3.5">Category</th>
              <th className="px-5 py-3.5">Priority</th>
              <th className="px-5 py-3.5">Status</th>
              <th className="px-5 py-3.5">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {tickets.map((t) => (
              <tr key={t.id} className="transition-colors hover:bg-canvas/50">
                {onDeleteTicket && (
                  <td className="whitespace-nowrap px-4 py-4">
                    <button
                      onClick={() => onDeleteTicket(t.id)}
                      className="text-ink-light hover:text-red-500 transition-colors"
                      title="Delete ticket"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                )}
                <td className="whitespace-nowrap px-5 py-4">
                  <span className="rounded-lg bg-brand-500/10 px-2.5 py-1 font-mono text-xs font-bold text-brand-500">
                    {t.id}
                  </span>
                </td>
                <td className="max-w-xs px-5 py-4">
                  <span className="font-medium text-ink">{t.subject}</span>
                </td>
                {showRequester && (
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 text-[10px] font-bold text-white shadow-sm">
                        {t.requester.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                      </div>
                      <span className="text-ink">{t.requester}</span>
                    </div>
                  </td>
                )}
                <td className="px-5 py-4">
                  <span className="rounded-lg bg-canvas px-2 py-0.5 text-xs font-medium text-ink-light border border-line">
                    {t.category}
                  </span>
                </td>
                <td className="px-5 py-4">
                  {onPriorityChange ? (
                    <PriorityPicker value={t.priority} onChange={(val) => onPriorityChange(t.id, val)} />
                  ) : (
                    <PriorityBadge priority={t.priority} />
                  )}
                </td>
                <td className="px-5 py-4">
                  {onStatusChange ? (
                    <StatusPicker value={t.status} onChange={(val) => onStatusChange(t.id, val)} />
                  ) : (
                    <StatusBadge status={t.status} />
                  )}
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-xs text-ink-light">{t.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

