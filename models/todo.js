const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      default: "NotDone",
      //using enums
      enum: ["Done", "NotDone", "InProgress"],
    },
    updated: Date,
    userId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
