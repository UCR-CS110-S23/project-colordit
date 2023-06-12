const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 20
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    city: {
        type: String,
        required: true
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false
    },
    avatarImage: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model("users", userSchema, "users");