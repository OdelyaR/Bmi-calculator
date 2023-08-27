const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "admin", "agent"],
    default: "user",
  },
  bmi: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.genrateToken = function () {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET);
};

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
