const express = require('express');
const indexRoute = express.Router();
const userRoute = require('./user');
const googleRoute = require('./google');
const customerRoute = require('./customer');
const sensorRoute = require('./sensor');
const dfRouter = require('./dialogFlow');

module.exports = indexRoute;

indexRoute.use('/users', userRoute);
indexRoute.use('/google', googleRoute);
indexRoute.use('/customers', customerRoute);
indexRoute.use('/sensors', sensorRoute);
indexRoute.use('/df', dfRouter);
