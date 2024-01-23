const express = require('express');
const sensorController = require('../controllers/sensor');
const sensorValidate = require('../validate/sensor.validate');
const sensorRoute = express.Router();

var fs = require('fs');

const enums = require('../constants/enum');

sensorRoute.post('/create_accelerometer', sensorValidate.createSensorValidate, sensorController.createSensors);

sensorRoute.get('/export/accelerometer', sensorController.exportFileSensorData);
sensorRoute.get('/export/accelerometer_txt', sensorController.exportFileSensorDataTxt);

sensorRoute.delete('/all', sensorController.deleteAllData);

sensorRoute.post('/iots', sensorController.iotsCreate);

sensorRoute.get('/test', sensorController.test);



module.exports = sensorRoute;
