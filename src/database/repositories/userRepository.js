const { User } = require('../../app/models');

class UserRepository {
    async findByEmail(email) {
        return User.findOne({ where: { email } });
    }

    async existsByEmail(email) {
        const user = await this.findByEmail(email);
        return !!user;
    }

    async create(userData) {
        return User.create(userData);
    }

    async update(id, updatedData) {
        return User.update(updatedData, { where: { id } });
    }

    async findById(id) {
        return User.findByPk(id);
    }

    async delete(id) {
        return User.destroy({ where: { id } });
      }
    
      async findAll() {
        return User.findAll();
      }
}

module.exports = new UserRepository();