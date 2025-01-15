const express = require('express');
const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes');
const app = express();
require('dotenv').config();

app.use(express.json());

app.use('/auth', authRoutes);

app.use('/users', userRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
