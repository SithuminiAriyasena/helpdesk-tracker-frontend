import React, { createContext, useContext, useState, useEffect } from 'react'
import { apiFetch } from '../api.js'

const TicketContext = createContext(null)

// Mapper to transform MySQL ticket format to frontend format
const mapTicketToFrontend = (t) => ({
  id: `TCK-${t.id}`,
  subject: t.title,
  requester: t.requestedBy,
  category: t.category,
  priority: t.priority,
  status: t.status,
  createdAt: t.date,
  dbId: t.id // Keep the numeric ID for API calls
})

// Mapper to transform MySQL user format to frontend format
const mapUserToFrontend = (u) => ({
  id: u.id,
  name: u.name,
  email: u.email,
  avatar: u.avatar || null,
  department: u.department || null,
  role: u.role,
  createdAt: u.created_at,
  deletedAt: u.deleted_at
    ? new Date(u.deleted_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null,
})

export function TicketProvider({ children }) {
  const [tickets, setTickets] = useState([])
  const [users, setUsers] = useState([])
  const [trashUsers, setTrashUsers] = useState([])

  const fetchTickets = async () => {
    try {
      const res = await apiFetch('/api/tickets')
      if (res.ok) {
        const data = await res.json()
        setTickets(data.map(mapTicketToFrontend))
      }
    } catch (err) {
      console.error('Failed to fetch tickets:', err)
    }
  }

  const fetchUsers = async () => {
    try {
      const [resUsers, resTrash] = await Promise.all([
        apiFetch('/api/users'),
        apiFetch('/api/users/trash')
      ])

      if (resUsers.ok) {
        const usersData = await resUsers.json()
        setUsers(usersData.map(mapUserToFrontend))
      }
      if (resTrash.ok) {
        const trashData = await resTrash.json()
        setTrashUsers(trashData.map(mapUserToFrontend))
      }
    } catch (err) {
      console.error('Failed to fetch users:', err)
    }
  }

  useEffect(() => {
    fetchTickets()
    fetchUsers()
  }, [])

  const createTicket = async (ticket) => {
    try {
      const res = await apiFetch('/api/tickets', {
        method: 'POST',
        body: JSON.stringify({
          title: ticket.subject,
          description: ticket.subject,
          priority: ticket.priority || 'Normal',
          category: ticket.category || 'General',
          requestedBy: ticket.requester || 'User'
        })
      })
      if (res.ok) {
        fetchTickets()
      }
    } catch (err) {
      console.error('Failed to create ticket:', err)
    }
  }

  const updateStatus = async (frontendId, status) => {
    setTickets((prev) => prev.map((t) => (t.id === frontendId ? { ...t, status } : t)))
    const dbId = frontendId.replace('TCK-', '')
    try {
      await apiFetch(`/api/tickets/${dbId}`, {
        method: 'PUT',
        body: JSON.stringify({ status })
      })
    } catch (err) {
      console.error('Failed to update status:', err)
      fetchTickets()
    }
  }

  const updatePriority = async (frontendId, priority) => {
    setTickets((prev) => prev.map((t) => (t.id === frontendId ? { ...t, priority } : t)))
    const dbId = frontendId.replace('TCK-', '')
    try {
      await apiFetch(`/api/tickets/${dbId}`, {
        method: 'PUT',
        body: JSON.stringify({ priority })
      })
    } catch (err) {
      console.error('Failed to update priority:', err)
      fetchTickets()
    }
  }

  const deleteTicket = async (frontendId) => {
    setTickets((prev) => prev.filter((t) => t.id !== frontendId))
    const dbId = frontendId.replace('TCK-', '')
    try {
      await apiFetch(`/api/tickets/${dbId}`, {
        method: 'DELETE'
      })
    } catch (err) {
      console.error('Failed to delete ticket:', err)
      fetchTickets()
    }
  }

  const deleteUser = async (userId) => {
    try {
      const res = await apiFetch(`/api/users/${userId}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        fetchUsers()
      } else {
        const data = await res.json()
        console.error('Delete user error:', data.message)
      }
    } catch (err) {
      console.error('Failed to delete user:', err)
    }
  }

  const restoreUser = async (userId) => {
    try {
      const res = await apiFetch(`/api/users/${userId}/restore`, {
        method: 'PUT',
      })
      if (res.ok) {
        fetchUsers()
      } else {
        const data = await res.json()
        console.error('Restore user error:', data.message)
      }
    } catch (err) {
      console.error('Failed to restore user:', err)
    }
  }

  const permanentlyDeleteUser = async (userId) => {
    try {
      const res = await apiFetch(`/api/users/${userId}/permanent`, {
        method: 'DELETE',
      })
      if (res.ok) {
        fetchUsers()
      } else {
        const data = await res.json()
        console.error('Permanent delete user error:', data.message)
      }
    } catch (err) {
      console.error('Failed to permanently delete user:', err)
    }
  }

  const emptyTrash = async () => {
    try {
      await Promise.all(
        trashUsers.map((u) =>
          apiFetch(`/api/users/${u.id}/permanent`, { method: 'DELETE' })
        )
      )
      fetchUsers()
    } catch (err) {
      console.error('Failed to empty trash:', err)
    }
  }

  return (
    <TicketContext.Provider
      value={{
        tickets,
        fetchTickets,
        createTicket,
        updateStatus,
        updatePriority,
        deleteTicket,
        users,
        trashUsers,
        fetchUsers,
        deleteUser,
        restoreUser,
        permanentlyDeleteUser,
        emptyTrash,
      }}
    >
      {children}
    </TicketContext.Provider>
  )
}

export const useTickets = () => useContext(TicketContext)
