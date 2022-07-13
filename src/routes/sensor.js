const express = require("express");

const sensorRoute = express.Router();

var fs = require("fs");

const enums = require("../constants/enum");

sensorRoute.get("/return-calender", googleController.getTokenGoogleAPi);


module.exports = sensorRoute;
