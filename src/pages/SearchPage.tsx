import { useEffect, useState } from 'react';
import { searchDogs } from '../api/dog';
import DogList from '../components/DogList';

const SearchPage = () => {
    const [dogs, setDogs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await searchDogs({ /* query params */ });
            setDogs(response.data);
        };

        fetchData();
    }, []);

    return (
        <div className="container">
            <h1>Search for Dogs</h1>
            <DogList dogs={dogs} />
        </div>
    );
};

export default SearchPage;
