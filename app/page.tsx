"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">Bienvenido a PokéApp</h1>
        <p className="text-xl mb-8">
          Explora el mundo Pokémon con nuestra aplicación. Busca información detallada sobre tus Pokémon favoritos.
        </p>
        
        <div className="flex justify-center space-x-4 mb-12">
          <Link 
            href="/pokemons" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Ver Pokémon
          </Link>
          <Link 
            href="/login" 
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Iniciar Sesión
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-blue-600 mb-3">Busca Pokémon</h2>
          <p>Utiliza nuestro buscador para encontrar información sobre cualquier Pokémon por su nombre.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-blue-600 mb-3">Explora Detalles</h2>
          <p>Descubre estadísticas, tipos, habilidades y más información detallada sobre cada Pokémon.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-blue-600 mb-3">Contenido Exclusivo</h2>
          <p>Inicia sesión para acceder a funciones exclusivas y guardar tus Pokémon favoritos.</p>
        </div>
      </div>
    </div>
  );
}