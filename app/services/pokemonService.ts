interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
}

export async function getPokemonList(limit = 10, offset = 0): Promise<PokemonListResponse> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  
  if (!response.ok) {
    throw new Error('Error al obtener la lista de Pokémon');
  }
  
  return response.json();
}

export async function getPokemonDetail(idOrName: string | number): Promise<PokemonDetail> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);
  
  if (!response.ok) {
    throw new Error(`Error al obtener los detalles del Pokémon ${idOrName}`);
  }
  
  return response.json();
}

export async function searchPokemon(query: string): Promise<PokemonDetail[]> {
  // La API no tiene búsqueda directa, así que obtenemos una lista grande y filtramos
  const response = await getPokemonList(100, 0);
  const filteredResults = response.results.filter(pokemon => 
    pokemon.name.toLowerCase().includes(query.toLowerCase())
  );
  
  // Obtenemos los detalles de cada Pokémon filtrado
  const pokemonDetails = await Promise.all(
    filteredResults.map(pokemon => {
      const id = pokemon.url.split('/').filter(Boolean).pop();
      return getPokemonDetail(id || '');
    })
  );
  
  return pokemonDetails;
} 