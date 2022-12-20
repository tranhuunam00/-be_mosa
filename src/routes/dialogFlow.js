const express = require('express');

const dialogflow = require('dialogflow');
const uuid = require('uuid');
const config = require('../config/google/key_df');

const dfRouter = express.Router();

const enums = require('../constants/enum');

dfRouter.get('/get', (req, res) => {
  res.json('ok');
});

module.exports = dfRouter;
