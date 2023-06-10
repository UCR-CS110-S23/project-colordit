const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    message: {
      type: String, 
      required: true
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    like: {
      type: Boolean,
      default: false,
      required: true
    }
  }
);

module.exports = mongoose.model("messages", MessageSchema, "messages");
