'use client';

import { useEffect, useState } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import { getPokemonList, getPokemonDetail } from '../services/pokemonService';
import PokemonCard from '../components/PokemonCard';

interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
}

export default function DashboardPage() {
  const [favoritePokemons, setFavoritePokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavoritePokemons = async () => {
      try {
        // Simulamos que tenemos algunos Pokémon favoritos (IDs 1, 4, 7, 25)
        const favoriteIds = [1, 4, 7, 25];
        
        const pokemonDetails = await Promise.all(
          favoriteIds.map(id => getPokemonDetail(id))
        );
        
        const formattedPokemons = pokemonDetails.map(pokemon => ({
          id: pokemon.id,
          name: pokemon.name,
          imageUrl: pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default
        }));
        
        setFavoritePokemons(formattedPokemons);
      } catch (error) {
        console.error('Error al cargar los Pokémon favoritos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFavoritePokemons();
  }, []);

  return (
    <ProtectedRoute>
      <div>
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <p className="mb-8">Bienvenido a tu dashboard personal. Aquí puedes ver tus Pokémon favoritos.</p>
        
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-4">Tus Pokémon Favoritos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favoritePokemons.map(pokemon => (
                <PokemonCard
                  key={pokemon.id}
                  id={pokemon.id}
                  name={pokemon.name}
                  imageUrl={pokemon.imageUrl}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </ProtectedRoute>
  );
} 