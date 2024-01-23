const Sensor = require('../models/sensor');
const Iot = require('../models/iot');

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
  return await Iot.create(data);
};

const findAndPagi = async (filter = {}, offset = 0, limit = 10) => {
  return await Sensor.find(filter).skip(offset).limit(limit);
};

module.exports = { createSensors, getAllSensors, deleteAllSensors, createIot, findAndPagi };
