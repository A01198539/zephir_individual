'use client';

import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mb-6">
      <div className="flex items-center border-2 border-blue-500 rounded-lg overflow-hidden">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar Pokémon..."
          className="w-full px-4 py-2 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition-colors"
        >
          Buscar
        </button>
      </div>
    </form>
  );
} 