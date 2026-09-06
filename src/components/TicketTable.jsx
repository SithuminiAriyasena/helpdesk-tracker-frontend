import { useState, useRef, useEffect } from 'react'
import StatusBadge from './StatusBadge.jsx'
import PriorityBadge from './PriorityBadge.jsx'
import { ChevronDown, Flame, Minus, ArrowDown, Trash2, AlertTriangle, CornerUpLeft, CheckCircle2 } from 'lucide-react'
import { apiFetch } from '../api.js'

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
  const [ticketToDelete, setTicketToDelete] = useState(null)
  const [replyTicket, setReplyTicket] = useState(null)
  const [replyStatus, setReplyStatus] = useState('In Progress')
  const [replyEmail, setReplyEmail] = useState('')
  const [replyDescription, setReplyDescription] = useState('')
  const [replySending, setReplySending] = useState(false)
  const [replySent, setReplySent] = useState(false)

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
    <>
      {/* Confirmation Modal */}
      {ticketToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-surface p-6 shadow-2xl border border-line animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-rose-500 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10">
                <AlertTriangle size={20} />
              </div>
              <h3 className="font-display text-base font-bold text-ink">Are you sure you want to delete?</h3>
            </div>
            <p className="text-sm text-ink-light mb-6">
              Do you really want to delete ticket <strong className="text-ink font-mono">{ticketToDelete.id}</strong> ({ticketToDelete.subject})? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2.5">
              <button
                onClick={() => setTicketToDelete(null)}
                className="rounded-lg border border-line bg-surface px-4 py-2 text-xs font-semibold text-ink transition-colors hover:bg-canvas"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDeleteTicket(ticketToDelete.id)
                  setTicketToDelete(null)
                }}
                className="rounded-lg bg-rose-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-rose-700 shadow-sm"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {replyTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-surface p-6 shadow-2xl border border-line animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-display text-lg font-bold text-ink">Reply to ticket</h3>
                <div className="mt-2 text-sm text-ink-light flex items-center gap-3">
                  <span className="rounded-lg bg-brand-500/10 px-2 py-0.5 font-mono text-xs font-bold text-brand-500">{replyTicket.id}</span>
                  <span className="text-ink">{replyTicket.subject}</span>
                </div>
              </div>
              <button onClick={() => setReplyTicket(null)} className="text-ink-light hover:text-ink">
                ✕
              </button>
            </div>

            {!replySent ? (
            <>
            <div className="mt-4 grid grid-cols-1 gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink">Status</label>
                <select
                  value={replyStatus}
                  onChange={(e) => setReplyStatus(e.target.value)}
                  className="w-full rounded-lg border border-line px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand-500 bg-surface"
                >
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink">User email</label>
                <input
                  value={replyEmail}
                  onChange={(e) => setReplyEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full rounded-lg border border-line px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand-500 bg-surface"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink">Description</label>
                <textarea
                  rows={5}
                  value={replyDescription}
                  onChange={(e) => setReplyDescription(e.target.value)}
                  placeholder="Describe the update or solution for this ticket"
                  className="w-full resize-none rounded-lg border border-line px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand-500 bg-surface"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => { if (!replySending) setReplyTicket(null) }}
                disabled={replySending}
                className="rounded-lg border border-line bg-surface px-4 py-2 text-sm font-semibold text-ink-light transition-colors hover:bg-canvas disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (replySending) return
                  setReplySending(true)
                  // Update status via provided handler for optimistic UI
                  if (onStatusChange) onStatusChange(replyTicket.id, replyStatus)

                  try {
                    const dbId = replyTicket.dbId || replyTicket.id.replace('TCK-', '')
                    // Update ticket status/assignee in backend
                    await apiFetch(`/api/tickets/${dbId}`, {
                      method: 'PUT',
                      body: JSON.stringify({ status: replyStatus, assignedTo: replyEmail })
                    })

                    // Send email to user using the new email endpoint
                    const resp = await apiFetch('/api/tickets/reply', {
                      method: 'POST',
                      body: JSON.stringify({ email: replyEmail, ticketId: replyTicket.id, description: replyDescription })
                    })

                    if (!resp.ok) {
                      const err = await resp.json().catch(() => ({ message: 'Unknown error' }))
                      throw new Error(err.message || 'Failed to send email')
                    }

                    // indicate success
                    setReplySent(true)
                    setTimeout(() => {
                      setReplySending(false)
                      setReplySent(false)
                      setReplyTicket(null)
                      setReplyEmail('')
                      setReplyDescription('')
                    }, 1100)
                  } catch (err) {
                    console.error('Failed to send reply/update ticket', err)
                    setReplySending(false)
                    alert('Failed to send reply: ' + (err.message || err))
                  }
                }}
                disabled={replySending}
                className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-600 disabled:opacity-60"
              >
                {replySending ? 'Sending…' : 'Send'}
              </button>
            </div>
            </>
            ) : (
              <div className="mt-6 flex flex-col items-center gap-3 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10">
                  <CheckCircle2 size={28} className="text-emerald-500" />
                </div>
                <p className="font-display text-base font-semibold text-ink">Sent successfully</p>
                <p className="text-sm text-ink-light">The ticket update was sent.</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-2xl bg-surface shadow-sm ring-1 ring-line">
        <div className="overflow-x-auto">
          <table className="min-w-[640px] w-full text-left text-sm">
            <thead>
                <tr className="border-b border-line bg-canvas text-xs font-semibold uppercase tracking-wider text-ink-light">
                  <th className="px-5 py-3.5">Ticket</th>
                <th className="px-5 py-3.5">Subject</th>
                {showRequester && <th className="px-5 py-3.5">Requester</th>}
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Priority</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Created</th>
                <th className="w-16 px-4 py-3.5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {tickets.map((t) => (
                <tr key={t.id} className="transition-colors hover:bg-canvas/50">
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
                  <td className="whitespace-nowrap px-4 py-4 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <button
                        type="button"
                        onClick={() => { setReplyTicket(t); setReplyStatus(t.status); setReplyEmail(''); setReplyDescription('') }}
                        className="text-ink-light hover:text-ink transition-colors"
                        title="Reply"
                      >
                        <CornerUpLeft size={16} />
                      </button>
                      <button
                        onClick={() => setTicketToDelete(t)}
                        className="text-ink-light hover:text-red-500 transition-colors"
                        title="Delete ticket"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

