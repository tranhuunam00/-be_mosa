const logger = require('../utils/logger');
const httpResponses = require('../utils/httpResponses');
const sensorService = require('../services/sensor');
const xlsx = require('node-xlsx');
const constants = require('../constants/constants');
const fs = require('fs');
const path = require('path');

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
    const sensors = await sensorService.getAllSensors({
      customer: req.query.customer,
    });

    let csv = constants.HEADER_ACCELEROMETER_EXPORT;

    sensors.forEach((item) => {
      const [x, y, z] = item.value.split('%');
      // Append data rows to the CSV string
      csv += `\n${item.customer},0,${item.time},${x},${y},${z}`;
    });

    const fileName = 'accelerometer.csv'; // Set the file name with a .csv extension

    res.writeHead(200, {
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Content-Type': 'text/csv', // Set the content type to CSV
    });

    // Send the CSV string as the response
    res.end(csv);
  } catch (e) {
    logger.error(e.message);
    return res.status(500).send(e.message); // Assuming `internalServer` is a custom response function, change it to `res.status(500).send(e.message)`
  }
};

const exportFileSensorDataTxt = async (req, res) => {
  try {
    const sensors = await sensorService.getAllSensors({
      customer: req.query.customer,
    });

    fs.unlinkSync('data.txt');
    sensors.forEach((item, index) => {
      let lable = 1;
      const [x, y, z] = item.value.split('%');
      fs.appendFileSync('data.txt', `${item.customer},${lable},${item.time},${x},${y},${z};\n`);
    });
    // return res.json(data);
    const filePath = path.resolve('data.txt');
    return res.sendFile(filePath);
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

module.exports = { createSensors, exportFileSensorData, deleteAllData, exportFileSensorDataTxt };
