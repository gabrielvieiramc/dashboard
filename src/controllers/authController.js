const bcrypt = require('bcryptjs');
const UserRepository = require('../database/repositories/UserRepository.js');
const { generateToken } = require('../core/utils/jwtUtils');
const jwt = require('jsonwebtoken');

class AuthController {
    static async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await UserRepository.findByEmail(email);
            if (!user) {
                return res.status(401).json({ message: 'Usuário não encontrado.' });
            }
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({ message: 'Senha inválida.' });
            }
            const token = generateToken(user);

            res.cookie('authToken', token, {
                httpOnly: true, // Impede acesso via JavaScript
                secure: process.env.NODE_ENV === "production",   // Só envia em conexões HTTPS
                sameSite: 'None', 
            });

            return res.status(200).json({ message: 'Login realizado com sucesso.' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro interno do servidor.' });
        }
    }

    static async logout(req, res) {
        try {
            res.clearCookie('authToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: 'None'
            });
            return res.status(200).json({ message: 'Logout realizado com sucesso.' });


        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro interno do servidor.' });
        }
    }

    static async getUserAuthenticated(req, res) {
        try {
            const token = req.cookies.authToken;
            if (!token) {
                return res.status(401).json({ message: "Usuário não autenticado" });
            }
    
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const user = await UserRepository.findById(decoded.id); // Busca no banco
    
            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }
    
            return res.status(200).json({ 
                id: user.id, 
                name: user.name,
                email: user.email, 
                role: user.role // Retorna apenas dados essenciais
            });
    
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao obter usuário" });
        }
    }
}
module.exports = AuthController;