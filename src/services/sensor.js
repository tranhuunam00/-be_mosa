const Sensor = require('../models/sensor');
const Iot = require("../models/iot")

const createSensors = async (data) => {
  return await Sensor.insertMany(data);
};
const getAllSensors = async (filter = {}) => {
  return await Sensor.find(filter);
};

const deleteAllSensors = async () => {
  return await Sensor.deleteMany();
};

const createIot = async (data) => {
  return await Iot.create(data)
}

module.exports = { createSensors, getAllSensors, deleteAllSensors , createIot};
