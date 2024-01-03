import axios from 'axios';

const API_URL = 'https://frontend-take-home-service.fetch.com/dogs';

// Interface for the search response
type SearchParams = {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: number;
  ageMax?: number;
  size?: number;
  from?: number;
  sort?: string;
};

// Function to search
export const searchDogs = async (params: SearchParams) => {
  return axios.get(`${API_URL}/search`, { params, withCredentials: true });
};

// Function to get breeds
export const getBreeds = async () => {
  return axios.get(`${API_URL}/breeds`, { withCredentials: true });
};

// Function to fetch specific dogs by IDs
export const fetchDogsByIds = async (dogIds: string[]) => {
  return axios.post(`${API_URL}`, dogIds, { withCredentials: true });
};

// Interface for the match response
interface Match {
  match: string;
}

// Function to get a match
export const getMatch = async (dogIds: string[]): Promise<Match> => {
  return axios.post(`${API_URL}/dogs/match`, dogIds, { withCredentials: true });
};