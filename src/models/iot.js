const mongoose = require('mongoose');
const enums = require('../constants/enum');
const constants = require('../constants/constants');
// constants

const iotSchema = mongoose.Schema(
  {
    humi: {
      type: String,
    },
    temp: {
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('iots', iotSchema);
