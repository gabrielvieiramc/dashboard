'use strict';

const bcrypt = require('bcrypt');
require('dotenv').config();


module.exports = {
  async up(queryInterface, Sequelize) {
    const adminName = process.env.ADMIN_NAME;
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminName || !adminEmail || !adminPassword) {
      throw new Error('ADMIN_NAME, ADMIN_EMAIL, and ADMIN_PASSWORD must be set');
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await queryInterface.bulkInsert('users', [
      {
        name: adminName,
        email: adminEmail,
        password: hashedPassword,
        role: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    const adminEmail = process.env.ADMIN_EMAIL;
    await queryInterface.bulkDelete('users', { email: adminEmail });
  },
};
