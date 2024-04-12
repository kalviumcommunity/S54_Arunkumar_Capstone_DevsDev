const mongoose = require("mongoose");

// Schema for saved data from user
const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    trim: true,
  },
  likedproducts: [
    {
      username: {
        type: String,
        required: true,
        trim: true,
      },
      pfp: {
        type: String,
        required: true,
        trim: true,
        validate: {
          validator: function (v) {
            // Regular expression to validate URL format
            return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
          },
          message: (props) => `${props.value} is not a valid URL!`,
        },
      },
      community: {
        type: String,
        required: true,
        trim: true,
      },

      title: {
        required: true,
        type: String,
        trim: true,
      },

      description: {
        required: true,
        type: String,
        trim: true,
      },
      data: {
        required: true,
        type: [String],
      },

      date: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ]
});

// Model of userSchema
const userModel = new mongoose.model("userdatas", userSchema);

module.exports = {
  userModel,
};
