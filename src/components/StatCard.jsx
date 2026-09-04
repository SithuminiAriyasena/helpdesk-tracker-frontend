const ACCENTS = {
  slate: { bar: 'bg-ink', icon: 'bg-ink/10 text-ink' },
  amber: { bar: 'bg-status-open', icon: 'bg-status-openBg text-status-open' },
  blue: { bar: 'bg-status-progress', icon: 'bg-status-progressBg text-status-progress' },
  green: { bar: 'bg-status-resolved', icon: 'bg-status-resolvedBg text-status-resolved' },
}

export default function StatCard({ label, value, icon: Icon, accent = 'slate' }) {
  const a = ACCENTS[accent]
  return (
    <div className="relative overflow-hidden rounded-xl2 bg-surface p-5 shadow-card transition-colors">
      <span className={`absolute inset-y-0 left-0 w-1 ${a.bar}`} />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-ink-light">{label}</p>
          <p className="mt-2 font-mono text-3xl font-semibold text-ink">{value}</p>
        </div>
        {Icon && (
          <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${a.icon}`}>
            <Icon size={19} strokeWidth={2} />
          </span>
        )}
      </div>
    </div>
  )
}
