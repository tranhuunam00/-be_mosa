const express = require('express');
const { detectIntent } = require('../services/df');
const dfRouter = express.Router();

dfRouter.get('/', async (req, res) => {
  const value = await detectIntent('vi', req.query.text, '111');
  res.json(value);
});

module.exports = dfRouter;
