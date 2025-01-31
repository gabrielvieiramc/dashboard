const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const path = require('path');

// Carrega as variáveis de ambiente de produção
dotenv.config({ path: '.env.production' });

// Configura a conexão com o banco de dados usando as variáveis de ambiente de produção
const sequelize = new Sequelize(
  process.env.MYSQL_NAME,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: process.env.MYSQL_DIALECT || 'mysql',
    pool: {
      max: parseInt(process.env.DB_POOL_MAX, 10) || 5,
      min: parseInt(process.env.DB_POOL_MIN, 10) || 0,
      acquire: parseInt(process.env.DB_POOL_ACQUIRE, 10) || 30000,
      idle: parseInt(process.env.DB_POOL_IDLE, 10) || 10000,
    },
  }
);

// Testa a conexão com o banco de dados
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the production database has been established successfully.');
    return true;
  } catch (error) {
    console.error('Unable to connect to the production database:', error);
    throw error;
  } finally {
    await sequelize.close();
  }
}

module.exports = testConnection;