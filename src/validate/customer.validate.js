const helpers = require('../helpers/help');
const httpResponses = require('../utils/httpResponses');
const logger = require('../utils/logger');

const createCustomerValidate = (req, res, next) => {
  const newModel = req.body;
  console.log(newModel);

  if (!newModel.email && !newModel.other) {
    logger.debug(`[register] error - >${httpResponses.EMAIL_NOT_FOUND}`);
    return res.notFound(httpResponses.EMAIL_NOT_FOUND);
  }

  if (!newModel.password && !newModel.other) {
    logger.debug(`[register] error - >${httpResponses.PASSWORD_NOT_FOUND}`);
    return res.notFound(httpResponses.PASSWORD_NOT_FOUND);
  }

  if (!newModel.firstName || !newModel.lastName || !newModel.dob || !newModel.gender) {
    logger.debug(`[register] error - >${httpResponses.QUERY_INVALID}`);
    return res.notFound(httpResponses.QUERY_INVALID);
  }

  if (!helpers.checkDate(newModel.dob)) {
    logger.debug(`[register] dob - >${httpResponses.QUERY_INVALID}`);
    return res.notFound(httpResponses.QUERY_INVALID);
  }
  next();
};

const createStopBangValidate = (req, res, next) => {
  const { snoring, tired, observed, height, pressure, weight, necksize, customer } = req.body;
  if (!snoring || !tired || !observed || !height || !pressure || !weight || !necksize || !customer) {
    return res.notFound(httpResponses.QUERY_INVALID);
  }
  if (snoring != 'true' && snoring != 'false') return res.notFound(`snoring_Invalid`);
  if (tired != 'true' && tired != 'false') return res.notFound(`tired_Invalid`);
  if (observed != 'true' && observed != 'false') return res.notFound(`observed_Invalid`);
  if (pressure != 'true' && pressure != 'false') return res.notFound(`pressure_Invalid`);
  if (necksize != 'true' && necksize != 'false') return res.notFound(`necksize_Invalid`);
  if (+height == NaN) return res.notFound(`height_Invalid`);
  if (+weight == NaN) return res.notFound(`weight_Invalid`);
  next();
};

module.exports = { createCustomerValidate, createStopBangValidate };
