const mongoose = require('mongoose');

// constants

const stopbangSchema = mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'customers',
      required: true,
    },
    snoring: {
      type: Boolean,
      required: true,
    },
    tired: {
      type: Boolean,
      required: true,
    },

    observed: {
      type: Boolean,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    pressure: {
      type: Boolean,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    necksize: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('stopbangs', stopbangSchema);
