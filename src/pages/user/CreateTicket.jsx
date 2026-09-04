import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import Layout from '../../components/Layout.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { useTickets } from '../../context/TicketContext.jsx'
import { CATEGORIES, PRIORITIES } from '../../data/mockData.js'

export default function CreateTicket() {
  const { user } = useAuth()
  const { createTicket } = useTickets()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    subject: '',
    category: CATEGORIES[0],
    priority: 'Medium',
    description: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [cancelled, setCancelled] = useState(false)

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    createTicket({ ...form, requester: user?.name })
    setSubmitted(true)
    setTimeout(() => navigate('/my-tickets'), 1100)
  }

  const handleCancel = () => {
    setCancelled(true)
    if (window.history.length > 2) {
      navigate(-1)
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <Layout title="Create Ticket" subtitle="Describe the issue and our team will pick it up">
      <div className="mx-auto max-w-2xl">
        {submitted ? (
          <div className="flex flex-col items-center rounded-xl2 bg-surface py-16 text-center shadow-card">
            <CheckCircle2 size={40} className="text-status-resolved" />
            <p className="mt-3 font-display text-lg font-bold text-ink">Ticket submitted</p>
            <p className="mt-1 text-sm text-ink-light">Redirecting to My Tickets…</p>
          </div>
        ) : cancelled ? null : (
          <form onSubmit={handleSubmit} className="space-y-5 rounded-xl2 bg-surface p-6 shadow-card">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">Subject</label>
              <input
                required
                value={form.subject}
                onChange={update('subject')}
                placeholder="Briefly describe the issue"
                className="w-full rounded-lg border border-line px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand-500 bg-surface"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink">Category</label>
                <select
                  value={form.category}
                  onChange={update('category')}
                  className="w-full rounded-lg border border-line px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand-500 bg-surface"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink">Priority</label>
                <select
                  value={form.priority}
                  onChange={update('priority')}
                  className="w-full rounded-lg border border-line px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand-500 bg-surface"
                >
                  {PRIORITIES.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">Description</label>
              <textarea
                required
                rows={5}
                value={form.description}
                onChange={update('description')}
                placeholder="Steps to reproduce, error messages, when it started…"
                className="w-full resize-none rounded-lg border border-line px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand-500 bg-surface"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 rounded-lg border border-line bg-surface py-2.5 text-sm font-semibold text-ink-light transition-colors hover:bg-canvas hover:text-ink"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 rounded-lg bg-brand-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
              >
                Submit Ticket
              </button>
            </div>
          </form>
        )}
      </div>
    </Layout>
  )
}
