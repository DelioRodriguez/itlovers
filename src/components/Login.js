import React, { useState } from 'react';
import { auth } from '../firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    const { email, password } = form;
    if (!email || !password) {
      return alert('Por favor, completa todos los campos.');
    }

    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setTimeout(() => {
        setIsLoading(false);
        navigate('/'); // Redirige al índice después de 3 segundos
      }, 3000);
    } catch (error) {
      console.error('Error al iniciar sesión:', error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      {isLoading && <LoadingSpinner />}
      <h2 className="text-2xl font-bold text-pink-600 mb-4">Iniciar Sesión</h2>
      <input
        type="email"
        name="email"
        placeholder="Correo Electrónico"
        value={form.email}
        onChange={handleChange}
        className="w-full p-3 border rounded mb-3"
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
        className="w-full p-3 border rounded mb-3"
      />
      <button
        onClick={handleSubmit}
        className="w-full bg-pink-500 hover:bg-pink-600 text-white p-3 rounded"
      >
        Iniciar Sesión
      </button>
    </div>
  );
};

export default Login;
