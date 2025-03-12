'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verificar si el usuario está autenticado al cargar el componente
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/">PokéApp</Link>
        </div>
        <div className="flex space-x-4">
          <Link 
            href="/" 
            className={`hover:text-blue-200 ${pathname === '/' ? 'font-bold' : ''}`}
          >
            Inicio
          </Link>
          <Link 
            href="/pokemons" 
            className={`hover:text-blue-200 ${pathname === '/pokemons' ? 'font-bold' : ''}`}
          >
            Pokémons
          </Link>
          {isLoggedIn ? (
            <>
              <Link 
                href="/dashboard" 
                className={`hover:text-blue-200 ${pathname === '/dashboard' ? 'font-bold' : ''}`}
              >
                Dashboard
              </Link>
              <button 
                onClick={handleLogout}
                className="hover:text-blue-200"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link 
              href="/login" 
              className={`hover:text-blue-200 ${pathname === '/login' ? 'font-bold' : ''}`}
            >
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
} 