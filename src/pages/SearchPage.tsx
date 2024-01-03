import React, { useEffect, useState } from 'react';
import { fetchDogsByIds, getBreeds, searchDogs } from '../api/dog';
import DogList from '../components/DogList';

const SearchPage: React.FC = () => {
    const [breeds, setBreeds] = useState<string[]>([]);
    const [selectedBreed, setSelectedBreed] = useState<string>('');
    const [dogs, setDogs] = useState<any[]>([]);

    useEffect(() => {
        const fetchBreeds = async () => {
            try {
                const response = await getBreeds();
                setBreeds(response.data);
            } catch (error) {
                console.error('Error fetching breeds:', error);
            }
        };
        fetchBreeds();
    }, []);

    useEffect(() => {
        const fetchDogs = async () => {
            try {
                const searchParams = {
                    breeds: selectedBreed ? [selectedBreed] : [],
                    size: 10,  // Number of results to return
                };
                const searchResponse = await searchDogs(searchParams);
                const dogIds = searchResponse.data.resultIds.slice(0, 100);
                const dogsResponse = await fetchDogsByIds(dogIds);
                setDogs(dogsResponse.data);
            } catch (error) {
                console.error('Error fetching dogs:', error);
            }
        };

        if (breeds.length > 0) {
            fetchDogs();
        }
    }, [breeds, selectedBreed]);

    const handleBreedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBreed(event.target.value);
    };

    return (
        <div>
            <select value={selectedBreed} onChange={handleBreedChange}>
                <option value="">All Breeds</option>
                {breeds.map(breed => (
                    <option key={breed} value={breed}>{breed}</option>
                ))}
            </select>

            <DogList dogs={dogs} />
            {/* Need to implement Pagination component */}
        </div>
    );
};

export default SearchPage;
