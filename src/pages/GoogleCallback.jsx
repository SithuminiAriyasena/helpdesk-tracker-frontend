import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { apiFetch } from '../api.js'

export default function GoogleCallback() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setSession } = useAuth();
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    if (token) {
      // Store token first, then ask backend to validate and return the canonical user record
      (async () => {
        try {
          localStorage.setItem('helpdesk_token', token);

          // Fetch verified user from backend (apiFetch reads token from localStorage)
          const resp = await apiFetch('/api/auth/me');
          if (!resp.ok) {
            localStorage.removeItem('helpdesk_token');
            navigate('/login?error=invalid_token', { replace: true });
            return;
          }
          const data = await resp.json();
          const user = data.user;

          if (!user) {
            localStorage.removeItem('helpdesk_token');
            navigate('/login?error=no_user', { replace: true });
            return;
          }

          setSession(user, token);
          navigate(user.role === 'admin' ? '/admin/dashboard' : '/dashboard', { replace: true });
        } catch (err) {
          console.error('Failed to validate token with backend', err);
          localStorage.removeItem('helpdesk_token');
          navigate('/login?error=invalid_token', { replace: true });
        }
      })();
    } else {
      navigate('/login?error=no_token', { replace: true });
    }
  }, [location, navigate, setSession]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas text-ink transition-colors">
      <div className="text-center">
        <h2 className="text-xl font-bold mb-4">Completing Google Sign In...</h2>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500 mx-auto"></div>
      </div>
    </div>
  );
}
