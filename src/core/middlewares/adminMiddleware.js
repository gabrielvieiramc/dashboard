const adminMiddleware = (req, res, next) => {
  const user = req.user; // Obtém o usuário autenticado do req.user

  // Verifica se o usuário está autenticado
  if (!user) {
      return res.status(401).json({ message: "Acesso negado. Faça login em /auth/login." });
  }

  // Verifica se o usuário é um administrador
  if (user.role === 'ADMIN') {
      next(); // Permite o acesso
  } else {
      res.status(403).json({ message: 'Acesso negado. Você não tem permissão de administrador.' });
  }
};

module.exports = adminMiddleware;