// const API_BASE = 'http://localhost:3001/api';
const API_BASE = import.meta.env.VITE_API_BASE;


export const register = async (data) => {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    credentials: 'include',
    body: JSON.stringify(data),
  });
  return res.json();
};

export const login = async (data) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    credentials: 'include',
    body: JSON.stringify(data),
  });
  return res.json();
};

export const logout = async () => {
  const res = await fetch(`${API_BASE}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  return res.json();
}

export const getMe = async () => {
  const res = await fetch(`${API_BASE}/auth/me`, {
    credentials: 'include',
  });
  return res.json();
};
