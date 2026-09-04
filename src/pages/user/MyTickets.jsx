import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import Layout from '../../components/Layout.jsx'
import TicketTable from '../../components/TicketTable.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { useTickets } from '../../context/TicketContext.jsx'
import { STATUSES } from '../../data/mockData.js'

export default function MyTickets() {
  const { user } = useAuth()
  const { tickets } = useTickets()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')

  const filtered = useMemo(() => {
    return tickets
      .filter((t) => t.requester === user.name)
      .filter((t) => (status === 'All' ? true : t.status === status))
      .filter((t) => t.subject.toLowerCase().includes(query.toLowerCase()) || t.id.toLowerCase().includes(query.toLowerCase()))
  }, [tickets, user.name, status, query])

  return (
    <Layout title="My Tickets" subtitle="All support tickets you've submitted">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-light" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by subject or ID"
            className="w-full rounded-lg border border-line bg-surface py-2.5 pl-9 pr-3 text-sm text-ink outline-none focus:border-brand-500"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {['All', ...STATUSES].map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`whitespace-nowrap rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors ${
                status === s
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'border border-line bg-surface text-ink-light hover:bg-canvas hover:text-ink'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <TicketTable tickets={filtered} />
    </Layout>
  )
}
