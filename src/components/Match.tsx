import React, { useEffect, useState } from 'react';
import { fetchDogsByIds, getMatch } from '../api/dog';
import DogCard from './DogCard';

interface MatchProps {
    favoriteIds: string[];
}

const Match: React.FC<MatchProps> = ({ favoriteIds }) => {
    const [matchedDog, setMatchedDog] = useState<any>(null);

    useEffect(() => {
        const fetchMatchedDog = async () => {
            try {
                if (favoriteIds.length > 0) {
                    const matchResponse = await getMatch(favoriteIds);
                    const matchedDogId = matchResponse.data.match;
                    const dogResponse = await fetchDogsByIds([matchedDogId]);
                    setMatchedDog(dogResponse.data[0]);
                }
            } catch (error) {
                console.error('Error fetching matched dog:', error);
            }
        };

        fetchMatchedDog();
    }, [favoriteIds]);

    if (!matchedDog) {
        return <div>Loading matched dog...</div>;
    }

    return (
        <div>
            <h3>Matched Dog</h3>
            <DogCard
              key={matchedDog.id}
              dog={matchedDog}
              isLiked={false}
              onLike={() => {}}
              showHeart={false}
            />
        </div>
    );
};

export default Match;
