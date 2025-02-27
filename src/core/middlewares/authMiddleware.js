const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.authToken; // Obtém o token do header

    if (!token) {
        return res.status(401).json({ message: 'Acesso não autorizado: token ausente.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Verifica o token
        req.user = decoded; // Define o usuário autenticado no req.user
        next();
    } catch {
        return res.status(401).json({ message: 'Token inválido ou expirado.' });
    }
};

module.exports = authMiddleware;