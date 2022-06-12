const express = require('express');
const indexRoute = express.Router();
const userRoute = require('./user');
const googleRoute = require('./google');

module.exports = indexRoute;

indexRoute.use('/users', userRoute);
indexRoute.use('/google', googleRoute);
