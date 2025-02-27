const db = require('../app/models'); // Ajuste o caminho conforme a estrutura do seu projeto

// Função para conectar ao banco de dados
const connectDB = async () => {
  try {
    await db.sequelize.authenticate();
    console.log(`Conectado ao banco de dados (${process.env.NODE_ENV || 'development'}) com sucesso.`);
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    process.exit(1);
  }
};

module.exports = { sequelize: db.sequelize, connectDB };