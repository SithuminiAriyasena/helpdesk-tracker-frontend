import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './context/AuthContext.jsx'

import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import UserDashboard from './pages/user/Dashboard.jsx'
import MyTickets from './pages/user/MyTickets.jsx'
import CreateTicket from './pages/user/CreateTicket.jsx'
import Profile from './pages/user/Profile.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import AllTickets from './pages/admin/AllTickets.jsx'
import AdminUsers from './pages/admin/Users.jsx';
import GoogleCallback from './pages/GoogleCallback.jsx';
import Register from './pages/Register.jsx';

function ProtectedRoute({ role, children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (role && user.role !== role) {
    return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'} replace />
  }
  return children
}

export default function App() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path="/login"
        element={<Login />}
      />
      <Route path="/register" element={<Register />} />
      <Route path="/google-callback" element={<GoogleCallback />} />

      {/* User routes */}
      <Route path="/dashboard" element={<ProtectedRoute role="user"><UserDashboard /></ProtectedRoute>} />
      <Route path="/my-tickets" element={<ProtectedRoute role="user"><MyTickets /></ProtectedRoute>} />
      <Route path="/create-ticket" element={<ProtectedRoute role="user"><CreateTicket /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute role="user"><Profile /></ProtectedRoute>} />

      {/* Admin routes */}
      <Route path="/admin/dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/tickets" element={<ProtectedRoute role="admin"><AllTickets /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute role="admin"><AdminUsers /></ProtectedRoute>} />
      <Route path="/admin/profile" element={<ProtectedRoute role="admin"><Profile /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
