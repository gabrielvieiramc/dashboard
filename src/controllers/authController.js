const bcrypt = require('bcryptjs');
const UserRepository = require('../database/repositories/userRepository');
const { generateToken } = require('../core/utils/jwtUtils');
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
            return res.status(200).json({ token });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro interno do servidor.' });
        }
    }
}
module.exports = AuthController;