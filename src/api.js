const BASE_URL = 'http://localhost:5000';

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('helpdesk_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  return response;
}

export default apiFetch;
