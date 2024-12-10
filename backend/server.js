const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);

// Test route
app.get('/test', (req, res) => {
    res.json({ message: 'Server is running' });
});

// Lancement du serveur
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
