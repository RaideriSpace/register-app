const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  // Obter o token do cabeçalho
  // Verifica se não há token
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.header('x-auth-token')) {
    token = req.header('x-auth-token');
  }

  if (!token) {
    return res.status(401).json({ message: 'Nenhum token fornecido, autorização negada.'});
  }

  try {
    // Verifica o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Anexar o objeto de usuário decodificado à requisição
    req.user = decoded.user;
    next(); // Prosseguir para a próxima função middleware/rota
  } catch (err) {
    console.error('Erro de autenticação do token: ', err.message);
    res.status(401).json({ message: 'Token não é válido ou expirou. '});
  }
};

module.exports = { protect };