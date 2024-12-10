import axios from 'axios';
import { API_BASE_URL } from '../config/config';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

export const registerUser = async (data) => {
    try {
        const response = await api.post('/auth/register', data);
        return response.data;
    } catch (error) {
        throw error.response?.data || 'Erreur lors de l\'inscription';
    }
};

export const loginUser = async (data) => {
    try {
        const response = await api.post('/auth/login', data);
        return response.data;
    } catch (error) {
        throw error.response?.data || 'Erreur lors de la connexion';
    }
};

export default api;
