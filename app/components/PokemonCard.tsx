import Image from 'next/image';
import Link from 'next/link';

interface PokemonCardProps {
  id: number;
  name: string;
  imageUrl: string;
}

export default function PokemonCard({ id, name, imageUrl }: PokemonCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-4 bg-gray-100">
        <Image 
          src={imageUrl} 
          alt={`${name} imagen`} 
          width={200} 
          height={200}
          className="mx-auto"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold capitalize mb-2">{name}</h2>
        <p className="text-gray-600 mb-4">#{id.toString().padStart(3, '0')}</p>
        <Link 
          href={`/pokemons/${id}`}
          className="block text-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors duration-300"
        >
          Ver detalles
        </Link>
      </div>
    </div>
  );
} 