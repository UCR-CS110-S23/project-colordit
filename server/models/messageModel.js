// Importing the Mongoose library
const mongoose = require("mongoose");

// Creating the MessageSchema
const MessageSchema = mongoose.Schema(
  {
    // Defining the message field
    message: {
      text: { type: String, required: true },
    },

    // Defining the users field
    users: Array,

    // Defining the sender field
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },

  // Adding timestamps to the schema
  {
    timestamps: true,
  }
);

// Exporting the Messages model
module.exports = mongoose.model("Messages", MessageSchema);
