import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
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
  const [hover, setHover] = useState(false);

  const handleLikeClick = () => onLike(dog.id);

  const cardStyle = {
    width: '18rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#f8f9fa',
    transform: hover ? 'translateY(-5px)' : 'none',
    transition: 'transform 0.3s ease-in-out'
  };

  return (
      <Card
        className="m-2"
        style={cardStyle}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
      <Card.Img
        variant="top"
        src={dog.img}
        alt={dog.name}
        className="img-fluid"
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <Card.Body>
        <Card.Title>{dog.name}</Card.Title>
        <Card.Text>
          Age: {dog.age} <br />
          Breed: {dog.breed}
        </Card.Text>
        {showHeart && (
          <span data-testid="like-button" onClick={handleLikeClick} style={{ cursor: 'pointer' }}>
            {isLiked ? <MdFavorite data-testid="liked-icon" style={{ color: 'red', fontSize: '30px' }} /> : <MdFavoriteBorder data-testid="not-liked-icon" style={{ fontSize: '30px' }} />}
          </span>
        )}
      </Card.Body>
    </Card>
  );
};

export default DogCard;
