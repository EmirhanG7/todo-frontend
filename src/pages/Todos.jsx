import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../api';
import { toast } from 'react-toastify';

const API_BASE = import.meta.env.VITE_API_BASE;

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await getMe();
        if (res?.user) {
          setUser(res.user);
          await fetchTodos();
        } else {
          navigate('/login');
        }
      } catch (err) {
        setError('Kullanıcı doğrulanamadı');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await fetch(`${API_BASE}/todos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      setError('Todo listesi alınamadı');
      toast.error('Todo verileri alınamadı');
    }
  };

  const handleAdd = async () => {
    if (!title.trim()) return;
    const res = await fetch(`${API_BASE}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title }),
    });
    const newTodo = await res.json();
    toast.success('Todo eklendi');
    setTodos([...todos, newTodo]);
    setTitle('');
  };

  const handleToggle = async (id, currentStatus) => {
    const res = await fetch(`${API_BASE}/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ completed: !currentStatus }),
    });
    const updated = await res.json();
    toast.info('Durum değiştirildi');
    setTodos(todos.map((todo) => (todo.id === id ? updated : todo)));
  };

  const handleDelete = async (id) => {
    await fetch(`${API_BASE}/todos/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success('Silindi');
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleEditSubmit = async (id) => {
    const todoToUpdate = todos.find((t) => t.id === id);

    const res = await fetch(`${API_BASE}/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: editTitle,
        completed: todoToUpdate.completed,
      }),
    });

    const updated = await res.json();
    setTodos(todos.map((todo) => (todo.id === id ? updated : todo)));
    setEditingId(null);
    toast.success('Todo güncellendi');
  };

  if (loading) return <p className="text-center mt-10">Yükleniyor...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Merhaba, {user?.username}</h2>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded mb-6 hover:bg-red-600"
      >
        Çıkış Yap
      </button>

      <div className="flex gap-2 mb-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Yeni todo"
          className="flex-1 border border-gray-300 rounded px-2 py-1"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          Ekle
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo.id} className="flex justify-between items-center border-b py-1">
            {editingId === todo.id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="border px-2 py-1 rounded flex-1"
                />
                <button
                  onClick={() => handleEditSubmit(todo.id)}
                  className="ml-2 text-green-600"
                >
                  Kaydet
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="ml-2 text-gray-500"
                >
                  Vazgeç
                </button>
              </>
            ) : (
              <>
                <span
                  onClick={() => handleToggle(todo.id, todo.completed)}
                  className={`cursor-pointer flex-1 ${
                    todo.completed ? 'line-through text-gray-500' : ''
                  }`}
                >
                  {todo.title}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingId(todo.id);
                      setEditTitle(todo.title);
                    }}
                    className="text-blue-500"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="text-red-500"
                  >
                    Sil
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
