import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function GoogleCallback() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setSession } = useAuth();
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    if (token) {
      try {
        const payloadBase64 = token.split('.')[1];
        const payloadDecoded = decodeURIComponent(
          atob(payloadBase64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        const user = JSON.parse(payloadDecoded);
        
        setSession(user, token);
        navigate(user.role === 'admin' ? '/admin/dashboard' : '/dashboard', { replace: true });
      } catch (err) {
        console.error('Failed to parse token', err);
        navigate('/login?error=invalid_token', { replace: true });
      }
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
