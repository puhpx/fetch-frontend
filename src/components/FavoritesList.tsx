import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { fetchDogsByIds } from '../api/dog';
import DogCard from './DogCard';

interface FavoritesListProps {
    favoriteIds: string[];
}

const FavoritesList: React.FC<FavoritesListProps> = ({ favoriteIds }) => {
    const [favoriteDogs, setFavoriteDogs] = useState<any[]>([]);

    useEffect(() => {
        const fetchFavoriteDogs = async () => {
            try {
                if (favoriteIds.length > 0) {
                    const response = await fetchDogsByIds(favoriteIds);
                    setFavoriteDogs(response.data);
                }
            } catch (error) {
                console.error('Error fetching favorite dogs:', error);
            }
        };

        fetchFavoriteDogs();
    }, [favoriteIds]);

    return (
        <div className="d-flex flex-wrap">
            {favoriteDogs.map(dog => (
                <DogCard
                  key={dog.id}
                  dog={dog}
                  isLiked={true}
                  onLike={() => {}}
                  showHeart={false}
                />
            ))}
        </div>
    );
};

export default FavoritesList;
