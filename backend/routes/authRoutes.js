import express from 'express';
import bcrypt from 'bcrypt';
import pool from '../config/database.js';

const router = express.Router();

// Route de login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Tentative de connexion pour:', email);

        // Vérifier si l'utilisateur existe
        const userResult = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (userResult.rows.length === 0) {
            console.log('Utilisateur non trouvé:', email);
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        const user = userResult.rows[0];

        // Vérifier le mot de passe
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            console.log('Mot de passe invalide pour:', email);
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        // Succès de la connexion
        console.log('Connexion réussie pour:', email);
        res.json({
            id: user.id,
            email: user.email,
            username: user.username
        });

    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        res.status(500).json({ message: 'Erreur serveur lors de la connexion' });
    }
});

export default router;