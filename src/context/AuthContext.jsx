import React, { createContext, useContext, useState, useEffect } from 'react'
import { apiFetch } from '../api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')

  // On mount, check if there's a user in local storage to persist session
  useEffect(() => {
    const storedUser = localStorage.getItem('helpdesk_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('helpdesk_user');
      }
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Invalid email or password.');
        return false;
      }

      setError('');
      setUser(data.user);
      localStorage.setItem('helpdesk_token', data.token);
      localStorage.setItem('helpdesk_user', JSON.stringify(data.user));
      return true;
    } catch (err) {
      console.error('Login error:', err);
      setError('Network error. Please try again later.');
      return false;
    }
  }

  const quickLogin = (role) => {
    // Kept for UI preview purposes only - this bypasses backend security
    // and should be removed in a true production build.
    const mockUser = {
      id: role === 'admin' ? 2 : 1,
      name: role === 'admin' ? 'Admin Preview' : 'User Preview',
      email: `${role}@company.com`,
      role: role
    };
    setError('')
    setUser(mockUser)
    localStorage.setItem('helpdesk_user', JSON.stringify(mockUser));
  }

  const setSession = (userData, token) => {
    setError('')
    setUser(userData)
    if (token) localStorage.setItem('helpdesk_token', token)
    if (userData) localStorage.setItem('helpdesk_user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem('helpdesk_token');
    localStorage.removeItem('helpdesk_user');
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, quickLogin, setSession, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
