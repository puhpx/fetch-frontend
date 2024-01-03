import axios from 'axios';

const API_URL = 'https://frontend-take-home-service.fetch.com/locations';

type Coordinates = {
    lat: number;
    lon: number;
};

type GeoBoundingBox = {
    top?: Coordinates;
    left?: Coordinates;
    bottom?: Coordinates;
    right?: Coordinates;
    bottom_left?: Coordinates;
    top_right?: Coordinates;
    bottom_right?: Coordinates;
    top_left?: Coordinates;
};

type Location = {
    zip_code: string;
    latitude: number;
    longitude: number;
    city: string;
    state: string;
    county: string;
};

type LocationSearchParams = {
    city?: string;
    states?: string[];
    geoBoundingBox?: GeoBoundingBox;
    size?: number;
    from?: number;
};

// Fetch locations by an array of ZIP codes
export const fetchLocationsByZipCodes = async (zipCodes: string[]): Promise<Location[]> => {
    return axios.post(`${API_URL}`, zipCodes, { withCredentials: true });
};

// Search for locations with advanced filtering
export const searchLocations = async (params: LocationSearchParams): Promise<{ results: Location[], total: number }> => {
    return axios.post(`${API_URL}/search`, params, { withCredentials: true });
};
