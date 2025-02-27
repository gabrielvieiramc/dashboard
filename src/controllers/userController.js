const UserService = require('../services/UserService.js');
const { ValidationError } = require('../core/errors/errors');

class UserController {
    async createUser(req, res) {
        try {
            const { name, email, password, role } = req.body;
            const adminRole = req.user.role;

            const newUser = await UserService.createUser({ name, email, password, role }, adminRole);
            return res.status(201).json(newUser);
        } catch (error) {
            return UserController._handleError(res, error);
        }
    }

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { name, email, password, role } = req.body;
            const adminRole = req.user.role;

            const updatedUser = await UserService.updateUser(id, { name, email, password, role }, adminRole);
            return res.status(200).json(updatedUser);
        } catch (error) {
            return UserController._handleError(res, error);
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const adminRole = req.user.role;

            await UserService.deleteUser(id, adminRole);
            return res.status(204).end();
        } catch (error) {
            return UserController._handleError(res, error);
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();
            return res.status(200).json(users);
        } catch (error) {
            return UserController._handleError(res, error);
        }
    }

    static _handleError(res, error) {
        if (error instanceof ValidationError) {
            return res.status(error.status || 400).json({
                message: error.message,
                field: error.field || null
            });
        }

        console.error(error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }

}

module.exports = new UserController();
