import { Card } from 'react-bootstrap';

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
}

const DogCard: React.FC<DogCardProps> = ({ dog }) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={dog.img} />
            <Card.Body>
                <Card.Title>{dog.name}</Card.Title>
                <Card.Text>
                    Age: {dog.age} <br />
                    Breed: {dog.breed}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default DogCard;
