import React, { useEffect, useState } from 'react';
import { fetchDogsByIds, getBreeds, searchDogs } from '../api/dog';
import DogList from '../components/DogList';

const SearchPage: React.FC = () => {
    const [breeds, setBreeds] = useState<string[]>([]);
    const [selectedBreed, setSelectedBreed] = useState<string>('');
    const [dogs, setDogs] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    const pageSize = 25;


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
      // Reset the page number when the breed changes
      setCurrentPage(0);
    }, [selectedBreed]);

    useEffect(() => {
        const fetchDogs = async () => {
            try {
                const searchParams = {
                  breeds: selectedBreed ? [selectedBreed] : [],
                  size: pageSize,
                  from: currentPage * pageSize,
                  sort: 'breed:asc'
                };
                const searchResponse = await searchDogs(searchParams);
                const dogIds = searchResponse.data.resultIds;
                const dogsResponse = await fetchDogsByIds(dogIds);
                setDogs(dogsResponse.data);
                setTotalResults(searchResponse.data.total);
            } catch (error) {
                console.error('Error fetching dogs:', error);
            }
        };

        if (breeds.length > 0) {
            fetchDogs();
        }
    }, [breeds, selectedBreed, currentPage]);

    const handleBreedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBreed(event.target.value);
    };

    const handleNextPage = () => {
      if (currentPage < Math.ceil(totalResults / pageSize) - 1) {
          setCurrentPage(currentPage + 1);
      }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
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

            <button onClick={handlePreviousPage} disabled={currentPage === 0}>Previous</button>
            <span>Page {currentPage + 1} of {Math.ceil(totalResults / pageSize)}</span>
            <button onClick={handleNextPage} disabled={currentPage >= Math.ceil(totalResults / pageSize) - 1}>Next</button>
        </div>
    );
};

export default SearchPage;
