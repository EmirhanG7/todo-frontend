import {Link, Outlet, Navigate, useNavigate, useLocation} from 'react-router-dom';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useGetMeQuery, useLogoutMutation, userApi} from "../store/user.js";
import {useDispatch} from "react-redux";
import {todoApi} from "../store/todo.js";

const Layout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const publicPaths = ['/login', '/register']
  const skipMe = publicPaths.includes(location.pathname)


  const { data: me, isLoading, isError } = useGetMeQuery(undefined, {
    skip: skipMe,
    refetchOnMountOrArgChange: true,
  })
  const [logout, { isLoading: logoutLoading }] = useLogoutMutation()


  if (!skipMe && isLoading) return <p>Yükleniyor..</p>

  if (!skipMe && (isError || !me?.user)) {
    return <Navigate to="/login" replace />
  }


  const handleLogout = async () => {
    try {
      await logout().unwrap()
      dispatch(userApi.util.resetApiState())
      dispatch(todoApi.util.resetApiState())
      toast.info('Çıkış yapıldı')
      navigate('/login', {replace: true})
    } catch (error) {
      toast.error('çıkış yapılamadı', error)
    }
  }


  return (
    <>
      <ToastContainer position="top-right" autoClose={1000} />
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">
            <Link to="/">Fullstack Todo App</Link>
          </h1>
          <div>
            {me?.user ? (
              <div className="flex items-center gap-3">
                <span>{me?.user.username}</span>
                <button
                  onClick={handleLogout}
                  disabled={logoutLoading}
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
