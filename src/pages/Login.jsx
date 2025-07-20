import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {useLoginMutation} from "../store/user.js";

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation()




  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await login(form).unwrap()
      if (result?.user) {
        toast.success('Giriş başarılı')
        navigate('/')
      } else {
        toast.error(result.message || 'Giriş yapılamadı', error)
      }

    } catch {
      toast.error('sunucu hatası', error)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Giriş Yap</h2>
        <input
          name="username"
          onChange={handleChange}
          placeholder="Kullanıcı adı"
          className="w-full mb-3 px-3 py-2 border rounded"
        />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Şifre"
          className="w-full mb-3 px-3 py-2 border rounded"
        />
        <button
          disabled={isLoading}
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {isLoading ? 'Giriş yapılıyor...' : 'Giriş'}
        </button>
      </form>
    </div>
  );
};

export default Login;
