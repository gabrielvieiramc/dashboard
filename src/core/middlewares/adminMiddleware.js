const adminMiddleware = (req, res, next) => {
    const user = req.user; // Obtém o usuário autenticado do req.user
  
    if (!req.user) {
      return res.status(401).json({ message: "Acesso negado. Faça login em /auth/login." });
    }
    
    // Verifica se o usuário é um administrador
    if (user && user.role === 'ADMIN') {
      next(); // Permite o acesso
    } else {
      res.status(403).json({ message: 'Acesso negado' }); // Retorna "Acesso negado" para não administradores
    }
  };
  
  module.exports = adminMiddleware;