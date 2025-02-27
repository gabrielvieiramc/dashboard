const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const corsOptions = require('../../config/corsConfig');
module.exports = app => {
    app.use(express.json());
    app.use(cookieParser());
    app.use(cors(corsOptions));
    app.use(helmet());
};