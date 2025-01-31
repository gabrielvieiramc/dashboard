const { ValidationError: SequelizeValidationError } = require('sequelize');
const bcrypt = require('bcrypt');
const UserRepository = require('../database/repositories/userRepository');
const { ValidationError } = require('../core/errors/errors');
const UserResponseDto = require('../dtos/userResponseDto');

class UserService {
    async createUser(userData, adminRole) {
        this._validateAdminRole(adminRole);
        try {
            const emailExists = await UserRepository.existsByEmail(userData.email);
            if (emailExists) {
                throw new ValidationError('Email já cadastrado', 'email');
            }

            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const user = await UserRepository.create({
                ...userData,
                password: hashedPassword
            });

            return new UserResponseDto(user.id, user.email, user.name, user.role);
        } catch (error) {
            this._handleSequelizeError(error); // Intercepta erros do Sequelize
        }
    }

    async updateUser(id, userData, adminRole) {
        this._validateAdminRole(adminRole);

        try {
            const user = await UserRepository.findById(id);
            if (!user) {
                throw new ValidationError('Usuário não encontrado', 'id');
            }

            const updatedData = {};
            if (userData.name) updatedData.name = userData.name;
            if (userData.email) {
                const emailExists = await UserRepository.existsByEmail(userData.email);
                if (emailExists) {
                    throw new ValidationError('Email já cadastrado', 'email');
                }
                updatedData.email = userData.email;
            }
            if (userData.role) this._validateRole(userData.role);
            if (userData.password) {
                updatedData.password = await bcrypt.hash(userData.password, 10);
            }

            await UserRepository.update(id, updatedData);
            const updatedUser = await UserRepository.findById(id);
            return new UserResponseDto(updatedUser.id, updatedUser.email, updatedUser.name, updatedUser.role);
        } catch (error) {
            this._handleSequelizeError(error); // Intercepta erros do Sequelize
        }
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
        return users.map(user => new UserResponseDto(user.id, user.email, user.name, user.role));
    }

    _handleSequelizeError(error) {
        if (error instanceof SequelizeValidationError) {
            const validationErrors = error.errors.map(err => new ValidationError(err.message, err.path));
            throw validationErrors[0]; // Lança o primeiro erro (ou adapte para enviar todos)
        }
        throw error; // Repassa outros erros
    }

    _validateAdminRole(role) {
        if (role !== 'ADMIN') {
            throw new ValidationError('Ação permitida somente para administradores.');
        }
    }
}
module.exports = new UserService();