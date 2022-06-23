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

module.exports = { createCustomerValidate };
