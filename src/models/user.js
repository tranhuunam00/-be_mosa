const mongoose = require("mongoose");

// constants
const { UserRole } = require("../constants/enum");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: UserRole,
      required: true,
      default: "ADMIN",
    },
    isConfirm: { default: false, type: Boolean },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
