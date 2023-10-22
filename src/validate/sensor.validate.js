const customerService = require('../services/customer');
const httpResponses = require('../utils/httpResponses');

const createSensorValidate = async (req, res, next) => {
  try {
    const { customer, value } = req.body;
    if (!value) {
      return res.badRequest(httpResponses.QUERY_INVALID);
    }
    if (!customer) {
      return res.notFound(httpResponses.CUSTOMER_NOT_FOUND);
    }
    next();
  } catch {
    res.internalServer(httpResponses.FAIL);
  }
};
module.exports = { createSensorValidate };
