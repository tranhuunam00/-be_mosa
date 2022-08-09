const Sensor = require('../models/sensor');

const createSensors = async (data) => {
  return await Sensor.insertMany(data);
};
const getAllSensors = async (filter = {}) => {
  return await Sensor.find(filter);
};

const deleteAllSensors = async () => {
  return await Sensor.deleteMany();
};

module.exports = { createSensors, getAllSensors, deleteAllSensors };
