import React from 'react';
import { Card } from 'react-bootstrap';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

interface DogCardProps {
  dog: Dog;
  isLiked: boolean;
  onLike: (dogId: string) => void;
  showHeart?: boolean;
}

const DogCard: React.FC<DogCardProps> = ({ dog, isLiked, onLike, showHeart = true }) => {
  const handleLikeClick = () => onLike(dog.id);

  return (
    <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={dog.img} />
        <Card.Body>
            <Card.Title>{dog.name}</Card.Title>
            <Card.Text>
                Age: {dog.age} <br />
                Breed: {dog.breed}
            </Card.Text>
            {showHeart && (
              <span onClick={handleLikeClick} style={{ cursor: 'pointer' }}>
                {isLiked ? <MdFavorite style={{ color: 'red' }} /> : <MdFavoriteBorder />}
              </span>
            )}
        </Card.Body>
    </Card>
  );
};

export default DogCard;