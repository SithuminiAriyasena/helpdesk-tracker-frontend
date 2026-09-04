import { Link } from 'react-router-dom'
import { Ticket, CircleDot, Clock, CheckCircle2, Plus } from 'lucide-react'
import Layout from '../../components/Layout.jsx'
import StatCard from '../../components/StatCard.jsx'
import TicketTable from '../../components/TicketTable.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { useTickets } from '../../context/TicketContext.jsx'

export default function UserDashboard() {
  const { user } = useAuth()
  const { tickets } = useTickets()

  const mine = tickets.filter((t) => t.requester === user.name)
  const counts = {
    total: mine.length,
    open: mine.filter((t) => t.status === 'Open').length,
    progress: mine.filter((t) => t.status === 'In Progress').length,
    resolved: mine.filter((t) => t.status === 'Resolved').length,
  }
  const recent = mine.slice(0, 5)

  return (
    <Layout title={`Welcome back, ${user.name.split(' ')[0]}`} subtitle="Here's what's happening with your tickets">
      <div className="mb-6 flex items-center justify-between">
        <div />
        <Link
          to="/create-ticket"
          className="flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
        >
          <Plus size={16} /> Create Ticket
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard label="Total Tickets" value={counts.total} icon={Ticket} accent="slate" />
        <StatCard label="Open" value={counts.open} icon={CircleDot} accent="amber" />
        <StatCard label="In Progress" value={counts.progress} icon={Clock} accent="blue" />
        <StatCard label="Resolved" value={counts.resolved} icon={CheckCircle2} accent="green" />
      </div>

      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-base font-bold text-ink">Recent Tickets</h2>
          <Link to="/my-tickets" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
            View all
          </Link>
        </div>
        <TicketTable tickets={recent} />
      </div>
    </Layout>
  )
}
