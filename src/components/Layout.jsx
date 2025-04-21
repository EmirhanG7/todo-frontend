import { Link, useNavigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMe } from '../api.js';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    getMe().then((res) => {
      if (res?.user) setUser(res.user);
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">
            <Link to="/">Fullstack Todo App</Link>
          </h1>
          <div>
            {user ? (
              <div className="flex items-center gap-3">
                <span>{user.username}</span>
                <button
                  onClick={handleLogout}
                  className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Çıkış Yap
                </button>
              </div>
            ) : (
              <div className='flex items-center gap-3'>
                <Link
                  to="/login"
                  className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Giriş Yap
                </Link>
                <Link
                  to="/register"
                  className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Kayıt Ol
                </Link>
              </div>
            )}
          </div>
        </header>

        <main className="p-4 max-w-2xl mx-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
