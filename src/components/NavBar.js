import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase-config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import LoadingSpinner from './LoadingSpinner';

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Escuchar cambios en el estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Limpieza al desmontar el componente
  }, []);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000); // Oculta el spinner después de 3 segundos
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      setIsLoading(false);
    }
  };

  return (
    <nav className="bg-pink-500 text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-lg font-bold">
          ITLA Crush 💌
        </Link>
        <div className="flex space-x-4">
          {user ? (
            <>
              <Link to="/love" className="hover:text-pink-200">
                Confesar Amor
              </Link>
              <Link to="/private" className="hover:text-pink-200">
                Privado
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-pink-200 focus:outline-none"
              >
                Cerrar Sesión
              </button>
              {isLoading && <LoadingSpinner />}
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-pink-200">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="hover:text-pink-200">
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
