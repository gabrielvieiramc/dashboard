const bcrypt = require('bcrypt');
const UserRepository = require('../database/repositories/userRepository');
const { ValidationError } = require('../core/errors/errors');
const UserDTO = require('../models/dtos/userDTO');


class UserService {
    async createUser(userData, adminRole) {
        this._validateAdminRole(adminRole);
        const emailExists = await UserRepository.existsByEmail(userData.email);
        if (emailExists) {
            throw new ValidationError('Email já cadastrado');
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const user = await UserRepository.create({
            ...userData,
            password: hashedPassword
        });
        return new UserDTO(user);
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

        if (userData.role) {
            const validRoles = ['ADMIN', 'USER'];
            if (!validRoles.includes(userData.role)) {
                throw new ValidationError('Role inválida');
            }
            user.role = userData.role;
        }

        if (userData.password) {
            user.password = await bcrypt.hash(userData.password, 10);
        }

        await UserRepository.update(userId, user);

        return new UserDTO(user);
    }

    async deleteUser(id, adminRole) {
        this._validateAdminRole(adminRole);

        const user = await UserRepository.findById(id);
        if (!user) {
            throw new ValidationError('Usuário não encontrado');
        }

        return UserRepository.delete(id);
    }

    async getAllUsers(adminRole) {
        this._validateAdminRole(adminRole);
        const users = await UserRepository.findAll();
        return users.map(user => new UserDTO(user));
    }

    _validateAdminRole(role) {
        if (role !== 'ADMIN') {
            throw new ValidationError('Ação permitida somente para administradores.');
        }
    }
}
module.exports = new UserService();
