import Layout from './components/Layout.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Todos from './pages/Todos.jsx';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('token');
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      {
        element: <PrivateRoute />,
        children: [
          { path: '/', element: <Todos /> },
        ],
      },
      { path: '*', element: <Navigate to="/todos" /> },
    ],
  },
];
