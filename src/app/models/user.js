const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class User extends Model { }
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'O campo "name" não pode ser nulo'
                    },
                    notEmpty: {
                        msg: 'O campo "name" não pode ser vazio'
                    },
                    len: {
                        args: [3, 40],
                        msg: 'O campo "name" deve ter entre 3 e 40 caracteres'
                    }
                }
            }, email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    notNull: {
                        msg: 'O campo "email" não pode ser nulo'
                    },
                    notEmpty: {
                        msg: 'O campo "email" não pode ser vazio'
                    },
                    isEmail: {
                        msg: 'Deve ser um email válido'
                    }
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: 'A senha não pode estar vazia'
                    },
                }
            },
            role: {
                type: DataTypes.ENUM('ADMIN', 'USER'),
                allowNull: false,
                validate: {
                    isIn: {
                        args: [['ADMIN', 'USER']],
                        msg: 'Role inválida'
                    }
                }
            },
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'users',
            timestamps: false
        }
    );
    return User;
}