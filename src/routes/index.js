const express = require('express');
const userRouter = require('./userRouter.js');
const authRouter = require('./authRouter.js');

module.exports = app => {
    app.use(express.json());
    app.use('/auth', authRouter);
    app.use('/users', userRouter);
}