const bcrypt = require('bcrypt');
const UserRepository = require('../database/repositories/userRepository');
const { ValidationError } = require('../core/errors/errors');

class UserService {
    async createUser(userData, adminRole) {
        this._validateAdminRole(adminRole);
        const emailExists = await UserRepository.existsByEmail(userData.email);
        if (emailExists) {
            throw new ValidationError('Email já cadastrado');
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);

        return UserRepository.create({
            ...userData,
            password: hashedPassword
        });
    }

    async updateUser(id, userData, adminRole) {
        this._validateAdminRole(adminRole);

        const user = await UserRepository.findById(id);
        if (!user) {
            throw new ValidationError('Usuário não encontrado');
        }

        if (userData.name) user.name = userData.name;

        if (userData.email) {
            const emailExists = await UserRepository.existsByEmail(userData.email);
            if (emailExists) {
                throw new ValidationError('Email já cadastrado');
            }
            user.email = userData.email;
        }

        if (updateRole.role) {
            const validRoles = ['ADMIN', 'USER'];
            if (!validRoles.includes(userData.role)) {
                throw new ValidationError('Role inválida');
            }
            user.role = userData.role;
        }

        if (userData.password) {
            user.password = await bcrypt.hash(userData.password, 10);
        }

        return UserRepository.update(userId, user);
    }

    async deleteUser(id, adminRole) {
        this._validateAdminRole(adminRole);

        const user = await UserRepository.findById(id);
        if (!user) {
            throw new ValidationError('Usuário não encontrado');
        }

        return UserRepository.delete(id);
    }

    async getAllUsers() {
        const users = await UserRepository.findAll();
        return users;
    }

    _validateAdminRole(role) {
        if (role !== 'ADMIN') {
            throw new ValidationError('Ação permitida somente para administradores.');
        }
    }
}
module.exports = new UserService();
