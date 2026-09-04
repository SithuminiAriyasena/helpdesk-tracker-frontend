const STYLES = {
  Open: 'bg-status-openBg text-status-open',
  'In Progress': 'bg-status-progressBg text-status-progress',
  Resolved: 'bg-status-resolvedBg text-status-resolved',
}

const DOT = {
  Open: 'bg-status-open',
  'In Progress': 'bg-status-progress',
  Resolved: 'bg-status-resolved',
}

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${STYLES[status] || 'bg-slate-100 text-slate-600'}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${DOT[status] || 'bg-slate-400'}`} />
      {status}
    </span>
  )
}
