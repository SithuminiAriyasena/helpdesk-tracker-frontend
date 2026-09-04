import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import Layout from '../../components/Layout.jsx'
import TicketTable from '../../components/TicketTable.jsx'
import { useTickets } from '../../context/TicketContext.jsx'
import { STATUSES } from '../../data/mockData.js'

const PRIORITIES = ['High', 'Medium', 'Low']

const STATUS_COLORS = {
  All: 'bg-slate-800 text-white shadow-sm',
  Open: 'bg-amber-500 text-white shadow-sm',
  'In Progress': 'bg-blue-500 text-white shadow-sm',
  Resolved: 'bg-emerald-500 text-white shadow-sm',
}

const PRIORITY_COLORS = {
  All: 'bg-slate-800 text-white shadow-sm',
  High: 'bg-rose-500 text-white shadow-sm',
  Medium: 'bg-amber-500 text-white shadow-sm',
  Low: 'bg-emerald-500 text-white shadow-sm',
}

export default function AllTickets() {
  const { tickets, updateStatus, updatePriority, deleteTicket } = useTickets()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')
  const [priority, setPriority] = useState('All')

  const filtered = useMemo(() => {
    return tickets
      .filter((t) => (status === 'All' ? true : t.status === status))
      .filter((t) => (priority === 'All' ? true : t.priority === priority))
      .filter(
        (t) =>
          t.subject.toLowerCase().includes(query.toLowerCase()) ||
          t.id.toLowerCase().includes(query.toLowerCase()) ||
          t.requester.toLowerCase().includes(query.toLowerCase()),
      )
  }, [tickets, status, priority, query])

  return (
    <Layout title="All Tickets" subtitle="Every ticket across the organization">

      {/* Filter Card */}
      <div className="mb-6 rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-line">
        {/* Search */}
        <div className="relative mb-4">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-light" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tickets by subject, ID, or requester…"
            className="w-full rounded-xl border border-line bg-canvas py-2.5 pl-10 pr-4 text-sm text-ink outline-none transition focus:border-indigo-400 focus:bg-surface focus:ring-2 focus:ring-indigo-100 placeholder:text-ink-light"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Status filter */}
          <div className="flex flex-1 flex-wrap items-center gap-1.5">
            <span className="flex items-center gap-1 text-xs font-semibold text-ink-light mr-1">
              <SlidersHorizontal size={12} /> Status
            </span>
            {['All', ...STATUSES].map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                  status === s
                    ? STATUS_COLORS[s] || 'bg-brand-500 text-white shadow-sm'
                    : 'bg-canvas text-ink-light border border-line hover:text-ink hover:bg-canvas/80'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="h-px w-full bg-line sm:h-6 sm:w-px" />

          {/* Priority filter */}
          <div className="flex flex-1 flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-ink-light mr-1">Priority</span>
            {['All', ...PRIORITIES].map((p) => (
              <button
                key={p}
                onClick={() => setPriority(p)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                  priority === p
                    ? PRIORITY_COLORS[p] || 'bg-brand-500 text-white shadow-sm'
                    : 'bg-canvas text-ink-light border border-line hover:text-ink hover:bg-canvas/80'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Active filter summary */}
        {(status !== 'All' || priority !== 'All' || query) && (
          <div className="mt-3 flex items-center justify-between rounded-xl bg-brand-500/10 border border-brand-500/20 px-3 py-2">
            <p className="text-xs text-brand-500 dark:text-brand-400">
              Showing <strong>{filtered.length}</strong> of <strong>{tickets.length}</strong> tickets
              {status !== 'All' && <> · Status: <strong>{status}</strong></>}
              {priority !== 'All' && <> · Priority: <strong>{priority}</strong></>}
              {query && <> · Search: <strong>"{query}"</strong></>}
            </p>
            <button
              onClick={() => { setStatus('All'); setPriority('All'); setQuery('') }}
              className="text-xs font-semibold text-brand-500 hover:underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      <TicketTable
        tickets={filtered}
        showRequester
        onStatusChange={updateStatus}
        onPriorityChange={updatePriority}
        onDeleteTicket={deleteTicket}
      />
    </Layout>
  )
}
