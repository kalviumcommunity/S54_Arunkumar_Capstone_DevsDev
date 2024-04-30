const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    trim: true,
  },
  savedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "inputdatas" }],
  likedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "inputdatas" }]
});

// Model of userSchema
const userModel = new mongoose.model("userdatas", userSchema);

module.exports = {
  userModel,
};