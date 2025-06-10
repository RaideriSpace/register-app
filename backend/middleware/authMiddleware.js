const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
    // Obter o token do cabeçalho
    const token = req.header('x-auth-token');

    // Verifica se não há token
    if (!token) {
        return res.status(401).json({ msg: 'Nenhum token, autorização negada.'});
    }

    try {
        // Verifica o token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Anexar o objeto de usuário decodificado à requisição
        req.user = decoded.user;
        next(); // Prosseguir para a próxima função middleware/rota
    } catch (err) {
        res.status(401).json({ msg: 'Token não é válido. '});
    }
};