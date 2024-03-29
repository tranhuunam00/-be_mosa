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

const iotsCreate = async (req, res) => {
  try {
    const { humi, temp } = req.body;
    await sensorService.createIot({ humi, temp });
    await res.created(httpResponses.SUCCESS);
  } catch (e) {
    logger.error(e.message);
    return res.internalServer(e.message);
  }
};

const test = async (req, res) => {
  try {
    const datas = await sensorService.findAndPagi(
      {
        customer: '120',
      },
      3600,
      1200
    );
    let index = 0;
    let random = Math.random() * (Math.random() > 0.5 ? 1 : -1);
    const dataCreate = [];
    for (let data of datas) {
      // console.log('data', data)
      index = index + 1;
      if (index == 13) {
        random = Math.random() * (Math.random() > 0.5 ? 1 : -1);
        index = 0;
      }
      const [x, y, z] = data.value.split('%');
      const newX = (+x + random).toFixed(3);
      const newY = (+y + random).toFixed(3);
      const newZ = (+z + random).toFixed(3);

      const newValue = newX + '%' + newY + '%' + newZ;
      const time = new Date(data.time);

      time.setFullYear(new Date().getFullYear());
      time.setMonth(new Date().getMonth());
      time.setDate(new Date().getDate());

      dataCreate.push({
        name: 'accelerometer',
        value: newValue,
        time: new Date(time),
        customer: '132',
      });
    }

    await sensorService.createSensors(dataCreate);
    res.json('ok');
  } catch (e) {
    logger.error(e.message);
    return res.internalServer(e.message);
  }
};

module.exports = { createSensors, exportFileSensorData, deleteAllData, exportFileSensorDataTxt, iotsCreate, test };
