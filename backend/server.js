// Désactiver les avertissements de dépréciation
process.noDeprecation = true;

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRoutes from './routes/chatRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', chatRoutes);

// Test route
app.get('/test', (req, res) => {
    res.json({ message: 'Server is running' });
});

// Lancement du serveur
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
