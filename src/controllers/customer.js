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

    if (!customer) return res.badRequest(httpResponses.CUSTOMER_NOT_FOUND);

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

const createOtherCustomer = async (req, res) => {
  try {
    const { user } = req.session;
    console.log(user);
    const newModel = req.body;
    newModel.user = user._id;
    logger.debug(`[createOtherCustomer]`);
    newModel.other = true;
    const customer = await customerService.createCustomer(newModel);
    res.created(httpResponses.SUCCESS, customer);
  } catch (e) {
    logger.error(`[createOtherCustomer]`);
    return res.internalServer(e.message);
  }
};

/**
 * delete customer
 */
const deleteCustomerOther = async (req, res) => {
  try {
    const { user, customer } = req.session;
    const { id } = req.query;
    if (customer.other) {
      return res.badRequest(httpResponses.NOT_MAIN_CUSTOMER);
    }

    const deleteCustomer = await customerService.getOneCustomerByFilter({ _id: id });

    if (!deleteCustomer || !deleteCustomer.other || user._id != deleteCustomer.user) {
      return res.notFound(httpResponses.CUSTOMER_NOT_FOUND);
    }

    await customerService.deleteSoftCustomer({ _id: deleteCustomer._id });

    res.ok(httpResponses.SUCCESS);
  } catch (err) {
    logger.error(`[deleteCustomerOther] error -> ${err.message}`);
    res.internalServer(err.message);
  }
};

/*
  create stopbang
*/

const createStopBang = async (req, res) => {
  try {
    logger.debug(`[createStopBang]`);

    const { user } = req.session;
    let { snoring, tired, observed, height, pressure, weight, necksize, customer } = req.body;

    const customerExist = await customerService.getOneCustomerByFilter({ user: user._id, _id: customer });

    if (!customerExist) return res.badRequest(httpResponses.CUSTOMER_NOT_FOUND);

    await customerService.createStopBang({
      snoring: snoring == 'true',
      tired: tired == 'true',
      observed: observed == 'true',
      height: +height,
      pressure: pressure == 'true',
      weight: +weight,
      necksize: necksize == 'true',
      customer,
    });
    console.log('create ok');

    return res.created(httpResponses.SUCCESS);
  } catch (err) {
    console.log(err);
    res.internalServer(err.message);
  }
};

module.exports = {
  getAllCustomer,
  getDetailsCustomer,
  getProfile,
  createOtherCustomer,
  deleteCustomerOther,
  createStopBang,
};
