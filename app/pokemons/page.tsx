'use client';

import { useState, useEffect } from 'react';
import { getPokemonList, getPokemonDetail, searchPokemon } from '../services/pokemonService';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';

interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
}

export default function PokemonsPage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    const loadPokemons = async () => {
      try {
        setLoading(true);
        
        const offset = (currentPage - 1) * ITEMS_PER_PAGE;
        const response = await getPokemonList(ITEMS_PER_PAGE, offset);
        
        // Calcular el total de páginas
        setTotalPages(Math.ceil(response.count / ITEMS_PER_PAGE));
        
        // Obtener detalles de cada Pokémon
        const pokemonDetails = await Promise.all(
          response.results.map(pokemon => {
            const id = pokemon.url.split('/').filter(Boolean).pop();
            return getPokemonDetail(id || '');
          })
        );
        
        const formattedPokemons = pokemonDetails.map(pokemon => ({
          id: pokemon.id,
          name: pokemon.name,
          imageUrl: pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default
        }));
        
        setPokemons(formattedPokemons);
      } catch (error) {
        console.error('Error al cargar los Pokémon:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!isSearching) {
      loadPokemons();
    }
  }, [currentPage, isSearching]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setIsSearching(false);
      return;
    }
    
    try {
      setLoading(true);
      setSearchQuery(query);
      setIsSearching(true);
      
      const results = await searchPokemon(query);
      
      const formattedResults = results.map(pokemon => ({
        id: pokemon.id,
        name: pokemon.name,
        imageUrl: pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default
      }));
      
      setSearchResults(formattedResults);
      
      // Paginación para resultados de búsqueda
      setTotalPages(Math.ceil(formattedResults.length / ITEMS_PER_PAGE));
      setCurrentPage(1);
    } catch (error) {
      console.error('Error al buscar Pokémon:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
    setCurrentPage(1);
  };

  // Obtener los Pokémon a mostrar en la página actual
  const displayedPokemons = isSearching
    ? searchResults.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
    : pokemons;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Pokémon</h1>
      
      <SearchBar onSearch={handleSearch} />
      
      {isSearching && (
        <div className="mb-4 flex items-center">
          <p className="mr-2">
            Resultados para: <span className="font-semibold">{searchQuery}</span>
          </p>
          <button 
            onClick={clearSearch}
            className="text-blue-600 hover:underline"
          >
            Limpiar búsqueda
          </button>
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : displayedPokemons.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
            {displayedPokemons.map(pokemon => (
              <PokemonCard
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                imageUrl={pokemon.imageUrl}
              />
            ))}
          </div>
          
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        </>
      ) : (
        <div className="text-center my-12">
          <p className="text-xl">No se encontraron Pokémon que coincidan con tu búsqueda.</p>
        </div>
      )}
    </div>
  );
} 