const customerService = require('../services/customer');
const httpResponses = require('../utils/httpResponses');

const createSensorValidate = async (req, res, next) => {
  try {
    const { customer, value } = req.body;
    if (!value) {
      res.badRequest(httpResponses.QUERY_INVALID);
    }
    if (customer) {
      const existCustomer = await customerService.getOneCustomerByFilter({ _id: customer });
      if (!existCustomer) {
        res.notFound(httpResponses.CUSTOMER_NOT_FOUND);
      }
    }
    next();
  } catch {
    res.internalServer(httpResponses.FAIL);
  }
};
module.exports = { createSensorValidate };
