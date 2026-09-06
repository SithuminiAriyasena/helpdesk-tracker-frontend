import { useState } from 'react'
import { Trash2, RotateCcw, Users as UsersIcon, AlertTriangle } from 'lucide-react'
import Layout from '../../components/Layout.jsx'
import { useTickets } from '../../context/TicketContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

function initials(name = '') {
  return name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()
}

export default function AdminUsers() {
  const { users, trashUsers, deleteUser, restoreUser, permanentlyDeleteUser, emptyTrash, tickets } = useTickets()
  const { user: currentUser } = useAuth()
  const [activeTab, setActiveTab] = useState('active') // 'active' | 'trash'
  const [userToTrash, setUserToTrash] = useState(null)
  const [userToDelete, setUserToDelete] = useState(null)
  const [confirmEmptyTrash, setConfirmEmptyTrash] = useState(false)

  const ticketCount = (name) => tickets.filter((t) => t.requester === name).length

  return (
    <Layout title="Users" subtitle="Everyone with access to the helpdesk">
      {/* Top bar with View Switcher Tabs and Trash Controls */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Tab Buttons */}
        <div className="flex items-center gap-2 rounded-xl bg-surface p-1 shadow-sm ring-1 ring-line">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all ${
              activeTab === 'active'
                ? 'bg-brand-500 text-white shadow-sm'
                : 'text-ink-light hover:text-ink hover:bg-canvas'
            }`}
          >
            <UsersIcon size={15} />
            <span>Active Users</span>
            <span
              className={`ml-1 rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                activeTab === 'active' ? 'bg-white/20 text-white' : 'bg-canvas text-ink-light border border-line'
              }`}
            >
              {users.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('trash')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all ${
              activeTab === 'trash'
                ? 'bg-brand-500 text-white shadow-sm'
                : 'text-ink-light hover:text-ink hover:bg-canvas'
            }`}
          >
            <Trash2 size={15} />
            <span>Trash</span>
            <span
              className={`ml-1 rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                activeTab === 'trash'
                  ? 'bg-white/20 text-white'
                  : trashUsers.length > 0
                  ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                  : 'bg-canvas text-ink-light border border-line'
              }`}
            >
              {trashUsers.length}
            </span>
          </button>
        </div>

        {/* Empty Trash Button (shown when in Trash tab and items exist) */}
        {activeTab === 'trash' && trashUsers.length > 0 && (
          <div>
            <button
              onClick={() => setConfirmEmptyTrash(true)}
              className="flex items-center gap-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500 hover:text-white transition-all shadow-sm"
            >
              <Trash2 size={14} />
              Empty Trash
            </button>
          </div>
        )}
      </div>

      {/* Confirmation Modal for Empty Trash */}
      {confirmEmptyTrash && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-surface p-6 shadow-2xl border border-line animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-rose-500 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10">
                <AlertTriangle size={20} />
              </div>
              <h3 className="font-display text-base font-bold text-ink">Empty Trash?</h3>
            </div>
            <p className="text-sm text-ink-light mb-6">
              This will permanently delete all {trashUsers.length} users from the trash. This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2.5">
              <button
                onClick={() => setConfirmEmptyTrash(false)}
                className="rounded-lg border border-line bg-surface px-4 py-2 text-xs font-semibold text-ink transition-colors hover:bg-canvas"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  emptyTrash()
                  setConfirmEmptyTrash(false)
                }}
                className="rounded-lg bg-rose-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-rose-700 shadow-sm"
              >
                Permanently Delete All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Active User Deletion */}
      {userToTrash && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-surface p-6 shadow-2xl border border-line animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-rose-500 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10">
                <AlertTriangle size={20} />
              </div>
              <h3 className="font-display text-base font-bold text-ink">Are you sure you want to delete?</h3>
            </div>
            <p className="text-sm text-ink-light mb-6">
              Do you really want to delete user <strong className="text-ink">{userToTrash.name}</strong>? This user will be moved to trash.
            </p>
            <div className="flex items-center justify-end gap-2.5">
              <button
                onClick={() => setUserToTrash(null)}
                className="rounded-lg border border-line bg-surface px-4 py-2 text-xs font-semibold text-ink transition-colors hover:bg-canvas"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteUser(userToTrash.id)
                  setUserToTrash(null)
                }}
                className="rounded-lg bg-rose-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-rose-700 shadow-sm"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Permanent User Deletion */}
      {userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-surface p-6 shadow-2xl border border-line animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-rose-500 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10">
                <AlertTriangle size={20} />
              </div>
              <h3 className="font-display text-base font-bold text-ink">Are you sure you want to delete?</h3>
            </div>
            <p className="text-sm text-ink-light mb-6">
              Are you sure you want to permanently delete <strong>{userToDelete.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2.5">
              <button
                onClick={() => setUserToDelete(null)}
                className="rounded-lg border border-line bg-surface px-4 py-2 text-xs font-semibold text-ink transition-colors hover:bg-canvas"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  permanentlyDeleteUser(userToDelete.id)
                  setUserToDelete(null)
                }}
                className="rounded-lg bg-rose-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-rose-700 shadow-sm"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      {activeTab === 'active' ? (
        /* Active Users Table */
        <div className="overflow-hidden rounded-xl2 bg-surface shadow-card border border-line">
          {users.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-canvas text-ink-light">
                <UsersIcon size={24} />
              </div>
              <p className="font-display text-base font-semibold text-ink">No active users</p>
              <p className="mt-1 text-sm text-ink-light">All users have been moved to the trash.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-[600px] w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-line bg-canvas text-xs font-semibold uppercase tracking-wide text-ink-light">
                    <th className="px-5 py-3.5">Name</th>
                    <th className="px-5 py-3.5">Email</th>
                    <th className="px-5 py-3.5">Role</th>
                    <th className="px-5 py-3.5">Tickets Filed</th>
                    <th className="px-5 py-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {users.map((u) => (
                    <tr key={u.id} className="transition-colors hover:bg-canvas/60">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500/10 font-display text-xs font-bold text-brand-500 overflow-hidden">
                            {u.avatar ? (
                              <img src={u.avatar} alt={u.name} className="h-full w-full object-cover" />
                            ) : (
                              initials(u.name)
                            )}
                          </div>
                          <span className="font-medium text-ink">{u.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-ink-light">{u.email}</td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold capitalize ${
                            u.role === 'admin'
                              ? 'bg-brand-500/10 text-brand-500 dark:text-brand-400'
                              : 'bg-canvas border border-line text-ink-light'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 font-mono text-ink">{ticketCount(u.name)}</td>
                      <td className="px-5 py-3.5 text-right">
                        <button
                          onClick={() => setUserToTrash(u)}
                          className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-ink-light hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                          title="Delete user (move to trash)"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        /* Trash Users Table */
        <div className="overflow-hidden rounded-xl2 bg-surface shadow-card border border-line">
          {trashUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-canvas text-ink-light">
                <Trash2 size={24} />
              </div>
              <p className="font-display text-base font-semibold text-ink">Trash is empty</p>
              <p className="mt-1 text-sm text-ink-light">Users deleted from the list will appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-[650px] w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-line bg-canvas text-xs font-semibold uppercase tracking-wide text-ink-light">
                    <th className="px-5 py-3.5">Name</th>
                    <th className="px-5 py-3.5">Email</th>
                    <th className="px-5 py-3.5">Role</th>
                    <th className="px-5 py-3.5">Deleted Date</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {trashUsers.map((u) => (
                    <tr key={u.id} className="transition-colors hover:bg-canvas/60">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-500/10 font-display text-xs font-bold text-ink-light">
                            {initials(u.name)}
                          </div>
                          <div>
                            <span className="font-medium text-ink">{u.name}</span>
                            <span className="ml-2 inline-flex items-center rounded bg-rose-500/10 px-1.5 py-0.5 text-[10px] font-bold text-rose-500">
                              Deleted
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-ink-light">{u.email}</td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold capitalize ${
                            u.role === 'admin'
                              ? 'bg-brand-500/10 text-brand-500 dark:text-brand-400'
                              : 'bg-canvas border border-line text-ink-light'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-ink-light">{u.deletedAt}</td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => restoreUser(u.id)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-brand-500/30 bg-brand-500/10 px-2.5 py-1 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:bg-brand-500 hover:text-white transition-all shadow-sm"
                            title="Restore user to active list"
                          >
                            <RotateCcw size={13} />
                            Restore
                          </button>
                          <button
                            onClick={() => setUserToDelete(u)}
                            className="inline-flex items-center justify-center h-7 w-7 rounded-lg text-ink-light hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                            title="Delete permanently"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </Layout>
  )
}
