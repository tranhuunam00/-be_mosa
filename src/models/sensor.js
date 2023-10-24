const mongoose = require('mongoose');
const enums = require('../constants/enum');
const constants = require('../constants/constants');
// constants

const sensorSchema = mongoose.Schema({
  // customer: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'customers',
  //   required: true,
  // },
  customer: {
    type: String,
  },
  name: {
    type: String,
  },
  value: {
    type: String,
  },
  time: {
    type: Date,
  },
});

module.exports = mongoose.model('sensors', sensorSchema);
