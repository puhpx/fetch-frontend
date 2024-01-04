import React, { useEffect, useState } from 'react';
import { fetchDogsByIds } from '../api/dog';
import DogCard from './DogCard'; // Adjust the import path as necessary

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
        <div>
            {favoriteDogs.map(dog => (
                <DogCard key={dog.id} dog={dog} isLiked={true} onLike={() => {}} />
            ))}
        </div>
    );
};

export default FavoritesList;
