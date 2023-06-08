const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 20
    }
});

module.exports = mongoose.model("chatRooms", chatRoomSchema, "chatRooms");