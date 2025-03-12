'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { getPokemonDetail } from '../../services/pokemonService';

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export default function PokemonDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPokemonDetail = async () => {
      try {
        setLoading(true);
        const id = params.id;
        
        if (!id) {
          setError('ID de Pokémon no válido');
          return;
        }
        
        // Convertir el id a string si es un array
        const pokemonId = Array.isArray(id) ? id[0] : id.toString();
        const pokemonData = await getPokemonDetail(pokemonId);
        setPokemon(pokemonData);
      } catch (error) {
        console.error('Error al cargar los detalles del Pokémon:', error);
        setError('No se pudo cargar la información del Pokémon');
      } finally {
        setLoading(false);
      }
    };

    loadPokemonDetail();
  }, [params.id]);

  const getTypeColor = (type: string) => {
    const typeColors: Record<string, string> = {
      normal: 'bg-gray-400',
      fire: 'bg-red-500',
      water: 'bg-blue-500',
      electric: 'bg-yellow-400',
      grass: 'bg-green-500',
      ice: 'bg-blue-200',
      fighting: 'bg-red-700',
      poison: 'bg-purple-500',
      ground: 'bg-yellow-600',
      flying: 'bg-indigo-300',
      psychic: 'bg-pink-500',
      bug: 'bg-green-400',
      rock: 'bg-yellow-700',
      ghost: 'bg-purple-700',
      dragon: 'bg-indigo-600',
      dark: 'bg-gray-700',
      steel: 'bg-gray-500',
      fairy: 'bg-pink-300',
    };
    
    return typeColors[type] || 'bg-gray-400';
  };

  const formatStatName = (statName: string) => {
    const statNames: Record<string, string> = {
      'hp': 'HP',
      'attack': 'Ataque',
      'defense': 'Defensa',
      'special-attack': 'Ataque Especial',
      'special-defense': 'Defensa Especial',
      'speed': 'Velocidad'
    };
    
    return statNames[statName] || statName;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="text-center my-12">
        <p className="text-xl text-red-600 mb-4">{error || 'No se encontró el Pokémon'}</p>
        <button
          onClick={() => router.push('/pokemons')}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Volver a la lista
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center text-blue-600 hover:underline"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Volver
      </button>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 bg-blue-50">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-6 md:mb-0">
              <Image
                src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
                alt={pokemon.name}
                width={300}
                height={300}
                className="mx-auto"
              />
            </div>
            
            <div className="md:w-2/3 md:pl-8">
              <div className="flex items-center mb-4">
                <h1 className="text-3xl font-bold capitalize mr-3">{pokemon.name}</h1>
                <span className="text-gray-500 text-xl">#{pokemon.id.toString().padStart(3, '0')}</span>
              </div>
              
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Tipos</h2>
                <div className="flex space-x-2">
                  {pokemon.types.map((typeInfo: PokemonType) => (
                    <span
                      key={typeInfo.type.name}
                      className={`${getTypeColor(typeInfo.type.name)} text-white px-3 py-1 rounded-full capitalize`}
                    >
                      {typeInfo.type.name}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h2 className="text-lg font-semibold mb-2">Altura</h2>
                  <p>{(pokemon.height / 10).toFixed(1)} m</p>
                </div>
                <div>
                  <h2 className="text-lg font-semibold mb-2">Peso</h2>
                  <p>{(pokemon.weight / 10).toFixed(1)} kg</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Habilidades</h2>
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities.map((abilityInfo: PokemonAbility) => (
                    <span
                      key={abilityInfo.ability.name}
                      className="bg-gray-200 px-3 py-1 rounded-full capitalize"
                    >
                      {abilityInfo.ability.name.replace('-', ' ')}
                      {abilityInfo.is_hidden && <span className="text-xs ml-1">(Oculta)</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Estadísticas</h2>
          <div className="space-y-4">
            {pokemon.stats.map((statInfo: PokemonStat) => (
              <div key={statInfo.stat.name}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{formatStatName(statInfo.stat.name)}</span>
                  <span>{statInfo.base_stat}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${Math.min(100, (statInfo.base_stat / 255) * 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 