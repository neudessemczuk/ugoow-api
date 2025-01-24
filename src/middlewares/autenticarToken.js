import jwt from 'jsonwebtoken';

const autenticarToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // O token vem no formato "Bearer <token>"
  if (!token) {
    return res.status(401).json({ mensagem: 'Acesso negado! Token não fornecido.' });
  }

  try {
    const usuario = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = usuario; // Adiciona os dados do token no objeto `req`
    next();
  } catch (erro) {
    return res.status(403).json({ mensagem: 'Token inválido!' });
  }
};

export default autenticarToken;
