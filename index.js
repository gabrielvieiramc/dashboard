console.log('Ambiente atual:', process.env.NODE_ENV);

const testConnection = require('./src/config/testConnectionProd');

const express = require('express');
const cors = require('cors');
const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes');
const app = express();
require('dotenv').config();

(async () => {
  try {
    const resultConnection = await testConnection();
    console.log('Conexão com o banco de dados bem-sucedida:', resultConnection);
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
    process.exit(1); // Encerra a aplicação em caso de erro na conexão
  }
})();

const corsOptions = {
  origin: ['https://dashboardmc.azurewebsites.net', 'http://localhost:5173'], // Domínios permitidos
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitidos
  credentials: true, // Permite cookies/sessões compartilhadas
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;