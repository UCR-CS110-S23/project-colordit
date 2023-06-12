const Messages = require("../models/messageModel");

addMessage = async (req, res, next) => {
  try {
    const { user, room, message, like } = req.body;

    const data = await Messages.create({
      message: message,
      room: room,
      user: user,
      like: like
    });

    if (data) {
      return res.json({ msg: "Message added successfully." });
    } 
    else {
      return res.json({ msg: "Failed to add message to the database" });
    }
  } 
  catch (ex) {
    console.log(err.message);
    next(ex);
  }
};

getAllMessages = async (req, res, next) => {
  try {
    const { room } = req.body;

    const messages = await Messages.find({
      room: room
    });

    // console.log(messages);

    const projectedMessages = messages.map((msg) => {
      return msg.message;
    });

    res.json({messages});
  } 
  catch (err) {
    console.log(err.message);
    next(err);
  }
};

updateMessage = async (req, res, next) => {
  try {
    const { message, id } = req.body;

    console.log(message, id);

    const thing = await Messages.findByIdAndUpdate(id, {
      message: message
    });

    console.log(thing);

    console.log("here");
  }
  catch (err) {
    console.log(err.message);
    next(err);
  }
}

module.exports.addMessage = addMessage;
module.exports.getAllMessages = getAllMessages;
module.exports.updateMessage = updateMessage;