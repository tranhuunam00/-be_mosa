const express = require('express');
const customerRoute = express.Router();
var fs = require('fs');
const { requireLogin, checkPermissions } = require('../middleware/permission');
const enums = require('../constants/enum');
const { multer } = require('../utils/multer');
//
const userController = require('../controllers/user');
const customerController = require('../controllers/customer');
// validate
const customerValidator = require('../validate/customer.validate');
//post

customerRoute.post(
  '/other',
  requireLogin,
  multer.fields([
    {
      name: 'avatar',
    },
  ]),
  customerValidator.createCustomerValidate,
  customerController.createOtherCustomer
);

customerRoute.get('/profile', requireLogin, customerController.getProfile);

customerRoute.get('/:_id', customerController.getDetailsCustomer);

customerRoute.get('/', requireLogin, checkPermissions(enums.UserRole.CUSTOMER), customerController.getAllCustomer);

customerRoute.delete(
  '/other',
  requireLogin,
  checkPermissions(enums.UserRole.CUSTOMER, enums.UserRole.ADMIN),
  customerController.deleteCustomerOther
);

module.exports = customerRoute;
