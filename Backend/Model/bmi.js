const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const bmiSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    required: true,
  },
  bmi: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.models.Bmi || mongoose.model("Bmi", bmiSchema);
