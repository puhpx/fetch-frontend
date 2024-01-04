import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import DogCard from './DogCard';


interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

interface DogListProps {
  dogs: Dog[];
  favorites: string[];
  onLike: (dogId: string) => void;
}

const DogList: React.FC<DogListProps> = ({ dogs, favorites, onLike }) => {
  return (
    <div className="d-flex flex-wrap">
      {dogs.map(dog => (
        <DogCard
          key={dog.id}
          dog={dog}
          isLiked={favorites.includes(dog.id)}
          onLike={onLike}
        />
      ))}
    </div>
  );
};

export default DogList;
