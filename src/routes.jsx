import Layout from './components/Layout.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Todos from './pages/Todos.jsx';
import { Navigate, Outlet } from 'react-router-dom';
import {useGetMeQuery} from "./store/user.js";

const PrivateRoute = () => {
  const { data: me, isLoading, isError } = useGetMeQuery()
  console.log(isError)

  if (isLoading) return <p>Yükleniyor…</p>
  if (isError || !me?.user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />

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
