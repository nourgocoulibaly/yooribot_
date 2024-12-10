const { Pool } = require('pg');
require('dotenv').config(); // Charger les variables d'environnement

// Configuration de la connexion à la base de données
const pool = new Pool({
    user: process.env.DB_USER, // Nom d'utilisateur PostgreSQL
    host: process.env.DB_HOST, // Hôte (exemple : localhost)
    database: process.env.DB_NAME, // Nom de la base
    password: process.env.DB_PASSWORD, // Mot de passe
    port: process.env.DB_PORT || 5432, // Port par défaut PostgreSQL
});

// Vérification de la connexion
pool.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données', err);
    } else {
        console.log('Connexion réussie à PostgreSQL');
    }
});

module.exports = pool;
