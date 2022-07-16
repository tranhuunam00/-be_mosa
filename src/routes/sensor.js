const express = require('express');
const sensorController = require('../controllers/sensor');
const sensorValidate = require('../validate/sensor.validate');
const sensorRoute = express.Router();

var fs = require('fs');

const enums = require('../constants/enum');

sensorRoute.post('/create_accelerometer', sensorValidate.createSensorValidate, sensorController.createSensors);

sensorRoute.post('/create_accelerometer', sensorValidate.createSensorValidate, sensorController.createSensors);
sensorRoute.get('/export', sensorController.exportFileSensorData);

module.exports = sensorRoute;
