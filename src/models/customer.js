const mongoose = require("mongoose");
const enums = require("../constants/enum");
const constants = require("../constants/constants");
// constants

const customerSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    dob: String,
    gender: {
      type: String,
      enum: enums.Gender,
      required: true,
    },
    avatarUrl: {
      type: String,
      default: constants.AVATAR_DEFAULT,
    },
    description: String,
    coverUrl: {
      type: String,
      default: constants.COVER_DEFAULT,
    },
    phoneNumber:String
  },
  { timestamps: true }
);

module.exports = mongoose.model("customers", customerSchema);
