const STYLES = {
  High: 'text-rose-600 bg-rose-500/10 dark:text-rose-400',
  Medium: 'text-amber-600 bg-amber-500/10 dark:text-amber-400',
  Low: 'text-emerald-600 bg-emerald-500/10 dark:text-emerald-400',
}

export default function PriorityBadge({ priority }) {
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ${STYLES[priority] || 'text-ink-light bg-canvas border border-line'}`}>
      {priority}
    </span>
  )
}
