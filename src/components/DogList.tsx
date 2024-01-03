import DogCard from './DogCard';

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

interface DogListProps {
  dogs: Dog[];
}

const DogList: React.FC<DogListProps> = ({ dogs }) => {
    return (
        <div className="d-flex flex-wrap">
            {dogs.map(dog => <DogCard key={dog.id} dog={dog} />)}
        </div>
    );
};

export default DogList;
