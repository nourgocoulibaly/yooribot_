const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/userModel');
require('dotenv').config();

// Inscription d'un utilisateur
const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Vérifie si l'utilisateur existe déjà
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Email déjà utilisé.' });
        }

        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Création de l'utilisateur
        const newUser = await createUser(username, email, hashedPassword);
        res.status(201).json({ message: 'Utilisateur créé avec succès.', user: newUser });
    } catch (error) {
        console.error('Erreur lors de l\'inscription :', error.message);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};

// Connexion d'un utilisateur
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Vérifie si l'utilisateur existe
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        // Vérifie le mot de passe
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Mot de passe incorrect.' });
        }

        // Génération du token JWT
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Connexion réussie.', token });
    } catch (error) {
        console.error('Erreur lors de la connexion :', error.message);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};

module.exports = { register, login };
