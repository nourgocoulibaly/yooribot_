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

// Ajoutez des logs pour déboguer
api.interceptors.request.use(request => {
    console.log('Request:', request);
    return request;
});

api.interceptors.response.use(
    response => {
        console.log('Response:', response);
        return response;
    },
    error => {
        console.log('Error:', error);
        return Promise.reject(error);
    }
);

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

export const sendMessage = async (message, onChunkReceived) => {
    try {
        // Envoyer le message et obtenir un ID de conversation
        const initResponse = await axios.post('http://192.168.1.71:5000/api/chat/init', {
            message
        });
        
        const conversationId = initResponse.data.conversationId;
        let isComplete = false;
        let fullResponse = '';

        // Polling pour récupérer les chunks de réponse
        while (!isComplete) {
            const response = await axios.get(`http://192.168.1.71:5000/api/chat/stream/${conversationId}`);
            
            if (response.data.content) {
                onChunkReceived(response.data.content);
                fullResponse += response.data.content;
            }
            
            isComplete = response.data.isComplete;
            
            if (!isComplete) {
                await new Promise(resolve => setTimeout(resolve, 100)); // Attendre 100ms entre chaque requête
            }
        }

        return fullResponse;
    } catch (error) {
        if (error.response) {
            console.error('Erreur serveur:', error.response.data);
            throw new Error(error.response.data.message || 'Erreur serveur');
        } else if (error.request) {
            console.error('Erreur réseau:', error.request);
            throw new Error('Erreur de connexion au serveur');
        } else {
            console.error('Erreur:', error.message);
            throw error;
        }
    }
};

export default {
    loginUser,
    registerUser,
    sendMessage,
    api,
};