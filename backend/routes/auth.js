const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/auth/register
// @desc    Registrar um novo usuário
// @access  Public
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verifica se o usuário já existe
    let userByEmail = await User.findOne({ email });
    if (userByEmail) {
      return res.status(400).json({ message: 'Este e-mail já foi utilizado.' });
    }

    let userByUsername = await User.findOne({ username });
    if (userByUsername) {
      return res.status(400).json({ message: 'Nome de usuário já existe. '});
    }

    // Cria um novo usuário
    const user = new User({
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
    res.status(500).json({ message: 'Erro no Servidor.' });
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
      return res.status(400).json({ message: 'Credenciais inválidas.' });
    }

    // Compara a senha fornecida com a senha hash no banco de dados
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciais inválidas.' });
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
        res.json({ token, _id: user._id, username: user.username, email: user.email })
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Erro no Servidor.'});
  }
});

// @route   DELETE /api/auth/delete-account
// @desc    Excluir a conta do usuário logado.
// @access  Private (requer token JWT)
router.delete('/delete-account', protect, async (req, res) => {
  try {
    // Middleware 'protect' adiciona 'req.user' com o ID do usuário autenticado
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      // Verificação de segurança
      return res.status(404).json({ message: 'Usuário não encontrado. '});
    }

    await user.deleteOne(); // Para remover o documento.
    res.status(200).json({ message: 'Conta excluída com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir conta: ', error.message);
    res.status(500).json({ message: 'Erro interno do servidor ao excluir conta.'});
  }
});


module.exports = router;