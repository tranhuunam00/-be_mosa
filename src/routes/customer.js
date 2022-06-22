const express = require('express');
const customerRoute = express.Router();
var fs = require('fs');
const { requireLogin, checkPermissions } = require('../middleware/permission');
const enums = require('../constants/enum');
//
const userController = require('../controllers/user');
const customerController = require('../controllers/customer');

//post

customerRoute.get('/profile', requireLogin, customerController.getProfile);

customerRoute.get('/:_id', customerController.getDetailsCustomer);

customerRoute.get('/', requireLogin, checkPermissions(enums.UserRole.CUSTOMER), customerController.getAllCustomer);

module.exports = customerRoute;