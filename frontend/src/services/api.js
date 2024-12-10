import axios from 'axios';
import { API_BASE_URL } from '../config/config';

const api = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 10000
});

export const loginUser = async (email, password) => {
    try {
        const response = await api.post('/auth/login', {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.error('Login error details:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        throw new Error(error.response?.data?.message || 'Identifiants incorrects');
    }
};

export const registerUser = async (userData) => {
    try {
        // Test de connexion au serveur
        console.log('Testing server connection...');
        try {
            await axios.get(`${API_BASE_URL}/test`);
            console.log('Server is reachable');
        } catch (error) {
            console.log('Server test failed:', error.message);
        }

        console.log('Attempting registration...');
        console.log('Request URL:', `${API_BASE_URL}/api/auth/register`);
        console.log('Request data:', userData);

        const response = await api.post('/auth/register', userData);
        console.log('Registration successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('Registration error details:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            config: error.config
        });
        throw new Error(error.response?.data?.message || 'Erreur lors de l\'inscription');
    }
};

export default {
    loginUser,
    registerUser,
    api,
};