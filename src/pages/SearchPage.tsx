import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { fetchDogsByIds, getBreeds, searchDogs } from '../api/dog';
import DogList from '../components/DogList';
import FavoritesList from '../components/FavoritesList';
import Match from '../components/Match';


const SearchPage: React.FC = () => {
    const [breeds, setBreeds] = useState<string[]>([]);
    const [selectedBreed, setSelectedBreed] = useState<string>('');
    const [dogs, setDogs] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    const pageSize = 25;
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [favorites, setFavorites] = useState<string[]>([]);
    const [showFavorites, setShowFavorites] = useState(false);


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
                  sort: `breed:${sortOrder}`
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
    }, [breeds, selectedBreed, currentPage, sortOrder]);

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

    const handleLike = (dogId: string) => {
      setFavorites(prevFavorites => {
          return prevFavorites.includes(dogId)
              ? prevFavorites.filter(id => id !== dogId)
              : [...prevFavorites, dogId];
      });
    };


    return (
        <div className="container">
          <div className="mb-4 mt-4">
            <img src="/Fetch_Rewards_Logo.jpeg" alt="Fetch Logo" className="logo img-fluid mb-4 w-50" />
          </div>
          <div className="my-3">
            <button
              className="btn btn-primary btn-lg mt-2 mb-4"
              onClick={() => setShowFavorites(!showFavorites)}
              style={{ backgroundColor: "#2f0c38", color: '#f8a619' }}
            >
                {showFavorites ? 'Back to Search' : 'Show Favorites'}
            </button>

            {showFavorites ? (
              <>
                <Match favoriteIds={favorites}/>
                <div style={{ marginTop: '3.5rem' }}>
                  <h3>⬇️⬇️❤️❤️❤️ Your favorite dogs 🐶🐶🐶⬇️⬇️</h3>
                  <FavoritesList favoriteIds={favorites} />
                </div>
              </>
            ) : (
              <>
                <div className="mb-3">
                  <select
                    className="form-select"
                    value={selectedBreed}
                    onChange={handleBreedChange}
                    style={{ width: '250px' }}
                  >
                    <option value="">All Breeds</option>
                    {breeds.map(breed => (
                        <option key={breed} value={breed}>{breed}</option>
                    ))}
                  </select>
                </div>

              {selectedBreed === '' && (
                  <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}>
                      <option value="asc">Ascending</option>
                      <option value="desc">Descending</option>
                  </select>
              )}

              <DogList dogs={dogs} favorites={favorites} onLike={handleLike} />

              <div className="d-flex justify-content-center align-items-center mt-4 mb-4">
                <button
                  className="btn btn-secondary me-2"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 0}
                  style={{ width: '100px', backgroundColor: "#2f0c38", color: '#f8a619' }}
                >
                  Previous
                </button>
                <span className="me-2">Page {currentPage + 1} of {Math.ceil(totalResults / pageSize)}</span>
                <button
                  className="btn btn-secondary"
                  onClick={handleNextPage}
                  disabled={currentPage >= Math.ceil(totalResults / pageSize) - 1}
                  style={{ width: '100px', backgroundColor: "#2f0c38", color: '#f8a619' }}
                >
                  Next
                </button>
              </div>
            </>
          )}
          </div>
        </div>
    );
};

export default SearchPage;
