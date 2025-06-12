const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const { protect } = require('./middleware/authMiddleware');
require('dotenv').config();

const app = express();

// Conectar ao Banco de Dados
connectDB();

// Middlewares
app.use(express.json());    // Permite o Express parseie JSON no corpo das requisições 
app.use(cors());    // Habilita o CORS para permitir requisições do frontend

// Rotas de Autenticação
app.use('/api/auth', authRoutes); // Todas as rotas em authRoutes serão prefixadas com /api/auth

// Rota de Exemplo Protegida
app.get('/api/protected', protect, (req, res) => {
  // req.user estará disponível aqui pelo authMiddleware
  res.json({ msg: `Bem-vindo(a), ${req.user.username}! Esta é uma rota protegida.`})
});

// Rota de Teste Simples
app.get('/', (req, res) => {
    res.send('API funcionando!');
});

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));