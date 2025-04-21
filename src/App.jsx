import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Todos from './pages/Todos';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/todos" element={<Todos />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
