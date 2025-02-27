require('dotenv').config();
console.log('Ambiente atual:', process.env.NODE_ENV);

const express = require('express');
const { connectDB } = require('./src/config/connectDB');
const routes = require('./src/routes');
const configureMiddlewares = require('./src/core/middlewares');

const app = express();

connectDB();

configureMiddlewares(app);
routes(app);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;