// Importing the Message model
const Messages = require("../models/messageModel");

<<<<<<< HEAD
// Handling the getMessages request
module.exports.getAllMessages = async (req, res, next) => {
  try {
    // Extracting 'from' and 'to' from the request body
    const { from, to } = req.body;

    // Finding messages that match the users
    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    // Projecting the required fields for the response
    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });

    // Sending the projected messages as a JSON response
    res.json(projectedMessages);
  } catch (ex) {
    // Passing the error to the error handling middleware
    next(ex);
  }
};

=======
>>>>>>> a58863afb8bc399bbca32465d35b9cb2a186b775
// Handling the addMessage request
module.exports.addMessage = async (req, res, next) => {
  try {
    // Extracting 'from', 'to', and 'message' from the request body
    const { from, to, message } = req.body;

    // Creating a new message document
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    // Checking if the message was added successfully
    if (data) {
      return res.json({ msg: "Message added successfully." });
    } else {
      return res.json({ msg: "Failed to add message to the database" });
    }
  } catch (ex) {
    // Passing the error to the error handling middleware
    next(ex);
  }
};

// Handling the getMessages request
module.exports.getAllMessages = async (req, res, next) => {
  try {
    // Extracting 'from' and 'to' from the request body
    const { from, to } = req.body;

    // Finding messages that match the users
    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    // Projecting the required fields for the response
    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });

    // Sending the projected messages as a JSON response
    res.json(projectedMessages);
  } catch (ex) {
    // Passing the error to the error handling middleware
    next(ex);
  }
};