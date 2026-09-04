import { Ticket, CircleDot, Clock, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout.jsx'
import StatCard from '../../components/StatCard.jsx'
import TicketTable from '../../components/TicketTable.jsx'
import { useTickets } from '../../context/TicketContext.jsx'

export default function AdminDashboard() {
  const { tickets, updateStatus, updatePriority, deleteTicket } = useTickets()

  const counts = {
    total: tickets.length,
    open: tickets.filter((t) => t.status === 'Open').length,
    progress: tickets.filter((t) => t.status === 'In Progress').length,
    resolved: tickets.filter((t) => t.status === 'Resolved').length,
  }
  const recent = tickets.slice(0, 6)

  return (
    <Layout title="Admin Dashboard" subtitle="Organization-wide ticket overview">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard label="Total Tickets" value={counts.total} icon={Ticket} accent="slate" />
        <StatCard label="Open" value={counts.open} icon={CircleDot} accent="amber" />
        <StatCard label="In Progress" value={counts.progress} icon={Clock} accent="blue" />
        <StatCard label="Resolved" value={counts.resolved} icon={CheckCircle2} accent="green" />
      </div>

      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-base font-bold text-ink">Recent Tickets</h2>
          <Link to="/admin/tickets" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
            View all
          </Link>
        </div>
        <TicketTable
          tickets={recent}
          showRequester
          onStatusChange={updateStatus}
          onPriorityChange={updatePriority}
          onDeleteTicket={deleteTicket}
        />
      </div>
    </Layout>
  )
}
