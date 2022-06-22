const pdf = require('../helpers/pdf/pdf');
const logger = require('../utils/logger');
const httpResponses = require('../utils/httpResponses');

//
const templateHelper = require('../helpers/template');
const mailerHelper = require('../helpers/mailer');
const constants = require('../constants/constants');
const enums = require('../constants/enum');
const helpers = require('../helpers/help');
//
const authService = require('../services/auth');
const userService = require('../services/user');
const securityService = require('../services/security');
const customerService = require('../services/customer');
//

/**
 * get all
 */
const getAllCustomer = async (req, res) => {
  try {
    res.json('oki');
  } catch (err) {
    logger.error(`[getAllCustomer] error -> ${err.message}`);
    res.internalServer(err.message);
  }
};

/**
 * get all
 */

const getDetailsCustomer = async (req, res) => {
  try {
    const { _id } = req.params;
    logger.info(`[getDetailsCustomer]  Id  -> ${_id}`);
    const customer = await customerService.getDetailsCustomer(_id);
    logger.debug(`[getDetailsCustomer] ${httpResponses.SUCCESS}`);
    res.ok(httpResponses.SUCCESS, customer);
  } catch (e) {
    logger.error(`[getDetailsCustomer]`);
    return res.internalServer(e.message);
  }
};

/**
 * get all
 */

const getProfile = async (req, res) => {
  try {
    const { user } = req.session;
    logger.info(`[getProfile]  Id  -> ${user._id}`);
    const customer = await customerService.getProfile(user._id);
    logger.debug(`[getProfile] ${httpResponses.SUCCESS}`);
    res.ok(httpResponses.SUCCESS, customer);
  } catch (e) {
    logger.error(`[getProfile]`);
    return res.internalServer(e.message);
  }
};

module.exports = {
  getAllCustomer,
  getDetailsCustomer,
  getProfile,
};