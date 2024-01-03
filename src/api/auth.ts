import axios from 'axios';

const API_URL = 'https://frontend-take-home-service.fetch.com/auth';

export const login = async (name: string, email: string) => {
    return axios.post(`${API_URL}/login`, { name, email }, { withCredentials: true });
};

export const logout = async () => {
    return axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
};