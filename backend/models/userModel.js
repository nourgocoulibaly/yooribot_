const pool = require('../config/database');

// Crée un nouvel utilisateur
const createUser = async (username, email, hashedPassword) => {
    const query = `
        INSERT INTO users (username, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, username, email;
    `;
    const values = [username, email, hashedPassword];
    const result = await pool.query(query, values);
    return result.rows[0];
};

// Recherche un utilisateur par e-mail
const findUserByEmail = async (email) => {
    const query = `SELECT * FROM users WHERE email = $1`;
    const values = [email];
    const result = await pool.query(query, values);
    return result.rows[0];
};

module.exports = { createUser, findUserByEmail };
