import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import { toast } from 'react-toastify';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);




  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(form);
    setLoading(false);

    if (result?.token) {
      localStorage.setItem('token', result.token);
      toast.success('Giriş başarılı!');
      navigate('/');
    } else {
      toast.error('Giriş başarısız: ' + (result?.error || 'Bilinmeyen hata'));
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
          disabled={loading}
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {loading ? 'Giriş yapılıyor...' : 'Giriş'}
        </button>
      </form>
    </div>
  );
};

export default Login;
