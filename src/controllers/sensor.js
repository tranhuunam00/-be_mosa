const logger = require('../utils/logger');
const httpResponses = require('../utils/httpResponses');
const sensorService = require('../services/sensor');
const xlsx = require('node-xlsx');
const constants = require('../constants/constants');

const createSensors = async (req, res) => {
  try {
    logger.debug(`createSensors`);
    const { customer, value } = req.body;
    const listData = value.split('/');
    const data = listData.map((item) => {
      const [acc, time] = item.split('@');
      console.log(time);
      console.log(time);
      return {
        name: 'accelerometer',
        value: acc,
        time: new Date(time),
        customer: customer,
      };
    });
    await sensorService.createSensors(data);
    await res.created(httpResponses.SUCCESS);
  } catch (e) {
    logger.error(e.message);
    return res.internalServer(e.message);
  }
};

const exportFileSensorData = async (req, res) => {
  try {
    const sensors = await sensorService.getAllSensors();
    console.log(sensors[100]);
    const data = [constants.HEADER_SENSOR_EXPORT];
    sensors.forEach((item) => {
      data.push([item.value, item.time]);
    });

    var buffer = xlsx.build([{ name: 'mySheetName', data: data }]);

    const fileName = 'hello_world.csv';

    res.writeHead(200, {
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    const download = Buffer.from(buffer, 'base64');

    res.end(download);
  } catch (e) {
    logger.error(e.message);
    return res.internalServer(e.message);
  }
};

const deleteAllData = async (req, res) => {
  try {
    logger.debug(`[deleteALlData]`);
    await sensorService.deleteAllSensors();
    res.ok(httpResponses.SUCCESS);
  } catch (e) {
    logger.error(e.message);
    return res.internalServer(e.message);
  }
};

module.exports = { createSensors, exportFileSensorData, deleteAllData };
