import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import DogCard from './DogCard';

describe('DogCard', () => {
  const mockDog = {
    id: '1',
    img: 'test.jpg',
    name: 'Test Dog',
    age: 3,
    zip_code: '12345',
    breed: 'Test Breed'
  };
  const mockOnLike = jest.fn();

  test('renders DogCard with dog details', () => {
    render(<DogCard dog={mockDog} isLiked={false} onLike={mockOnLike} />);

    expect(screen.getByText('Test Dog')).toBeInTheDocument();
    expect(screen.getByText(/Age:/)).toBeInTheDocument();
    expect(screen.getByText(/3/)).toBeInTheDocument();
    expect(screen.getByText(/Breed:/)).toBeInTheDocument();
    expect(screen.getByText(/Test Breed/)).toBeInTheDocument();
    expect(screen.getByAltText('Test Dog')).toHaveAttribute('src', 'test.jpg');
  });

  test('calls onLike when like button is clicked', () => {
    render(<DogCard dog={mockDog} isLiked={false} onLike={mockOnLike} />);

    const likeButton = screen.getByTestId('like-button');
    fireEvent.click(likeButton);
    expect(mockOnLike).toHaveBeenCalledWith('1');
  });

  test('displays MdFavoriteBorder when not liked and MdFavorite when liked', () => {
    const { rerender } = render(<DogCard dog={mockDog} isLiked={false} onLike={mockOnLike} />);
    expect(screen.getByTestId('not-liked-icon')).toBeInTheDocument();

    rerender(<DogCard dog={mockDog} isLiked={true} onLike={mockOnLike} />);
    expect(screen.getByTestId('liked-icon')).toBeInTheDocument();
  });
});
