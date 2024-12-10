const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Vérifier si l'email existe déjà
        const userExists = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé' });
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insérer le nouvel utilisateur
        const newUser = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
            [username, email, hashedPassword]
        );

        res.status(201).json({
            message: 'Utilisateur créé avec succès',
            user: newUser.rows[0]
        });

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Erreur serveur lors de l\'inscription' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifier si l'utilisateur existe
        const userResult = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (userResult.rows.length === 0) {
            return res.status(401).json({ message: 'Identifiants incorrects' });
        }

        const user = userResult.rows[0];

        // Vérifier le mot de passe
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Identifiants incorrects' });
        }

        // Si tout est correct, renvoyer une réponse de succès
        res.status(200).json({
            message: 'Connexion réussie',
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Erreur serveur lors de la connexion:', error);
        res.status(500).json({ message: 'Erreur serveur lors de la connexion' });
    }
});

module.exports = router;