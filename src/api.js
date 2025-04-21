// const API_BASE = 'http://localhost:3001/api';
const API_BASE = import.meta.env.VITE_API_BASE;


export const register = async (data) => {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const login = async (data) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getMe = async () => {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};
