const logger = require('../utils/logger');
const httpResponses = require('../utils/httpResponses');
const sensorService = require('../services/sensor');

const createSensors = async (req, res) => {
  try {
    logger.debug(`createSensors`);
    const { customer, value } = req.body;
    const listData = value.split('/');
    const data = listData.map((item) => {
      const [acc, time] = item.split('@');
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
module.exports = { createSensors };
