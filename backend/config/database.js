import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

// Vérification des variables d'environnement
const requiredEnvVars = ['DB_USER', 'DB_HOST', 'DB_NAME', 'DB_PASSWORD', 'DB_PORT'];
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        console.error(`La variable d'environnement ${envVar} n'est pas définie`);
        process.exit(1);
    }
}

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD.toString(), // Conversion explicite en string
    port: parseInt(process.env.DB_PORT, 10),
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Test de connexion
pool.connect((err, client, release) => {
    if (err) {
        console.error('Erreur de connexion à PostgreSQL:', err.message);
        return;
    }
    console.log('Connexion à PostgreSQL établie avec succès');
    release();
});

export default pool;
