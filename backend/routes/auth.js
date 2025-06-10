const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// @route   POST /api/auth/register
// @desc    Registrar um novo usuário
// @access  Public
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Verifica se o usuário já existe
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'Usuário com este e-mail já existe.' });
        }

        user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'Nome de usuário já existe. '});
        }

        // Cria um novo usuário
        user = new User({
            username,
            email,
            password
        });

        await user.save(); // Salva o usuário no banco de dados

        // Gera o token JWT
        const payload = {
            user: {
                id: user.id // O ID do usuário no MongoDB
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' }, // Token expira em 1 hora
            (err, token) => {
                if (err) throw err;
                res.json({ token, username: user.username, email: user.email }); // Retorna o token e os dados do usuário
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no Servidor.');
    }
});

//  @route  POST /api/auth/login
//  @desc   Autenticar usuário e obter token
//  @access Public
router.post ('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verifica se o usuário existe
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Credenciais inválidas.' });
        }

        // Compara a senha fornecida com a senha hash no banco de dados
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Credenciais inválidass.' });
        }

        // Gera o token JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, username: user.username, email: user.email })
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no Servidor.');
    }
});

module.exports = router;