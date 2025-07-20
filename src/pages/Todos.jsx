import {useState} from 'react';
import {toast} from 'react-toastify';
import {useAddTodoMutation, useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation} from "../store/todo.js";

const Todos = () => {

  const [newTitle, setNewTitle] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const {data: todos = [], isLoading, isError, Error} = useGetTodosQuery();
  const [addTodo, result] = useAddTodoMutation()
  const [updateTodo] = useUpdateTodoMutation()
  const [deleteTodo] = useDeleteTodoMutation()

  console.log('isLoading', isLoading)
  console.log('data', todos)
  console.log('result', result.isLoading)


  const handleAdd = async () => {
    if (!newTitle.trim()) return
    try {
      await addTodo({title: newTitle}).unwrap()
      toast.success('Todo eklendi')
      setNewTitle('')
    } catch (err) {
      toast.error('Ekleme hatası')
    }
  }

  const handleToggle = async (todo) => {
    try {
      await updateTodo({id: todo.id, completed: !todo.completed}).unwrap()
      toast.info('Durum güncellendi')
    } catch {
      toast.error('Güncelleme hatası')
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id).unwrap()
      toast.success('Silindi')
    } catch {
      toast.error('Silme hatası')
    }
  }


  const handleEditSubmit = async (id) => {
    const todoToUpdate = todos.find((t) => t.id === id);

    try {
      await updateTodo({id: todoToUpdate.id, title: editTitle,}).unwrap()
      toast.info('Todo Güncellendi')
    } catch (err) {
      toast.error('Güncelleme hatası')
    }
  }


  if (isLoading) return <p className="text-center mt-10">Yükleniyor...</p>;
  if (isError) return <p className="text-center text-red-500 mt-10">{Error}</p>;

  return (
    <div className="max-w-lg mx-auto p-4">


      <div className="flex gap-2 mb-4">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
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
                  onClick={() => {
                    handleEditSubmit(todo.id),
                      setEditingId(null)
                  }}
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
                  onClick={() => handleToggle(todo)}
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
