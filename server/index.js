const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const chatRoomRoutes = require("./routes/chatRoomRoutes");
const messageRoutes = require("./routes/messagesRoutes");
const socket = require("socket.io");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/auth", chatRoomRoutes);
app.use("/api/messages", messageRoutes);

mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("Connected to Database"));

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});

const io = socket(server, {
    cors: {
        origin:"http://localhost:3001",
        credentials: true,
    }
});

global.chatGroups = new Map();

io.on("connection", (socket) => {
    global.chatSocket= socket;

    socket.on("add-user", (userId) => {
        chatGroups.set(userId, socket.id);
        console.log("chatGroups", chatGroups);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = data;
        if(sendUserSocket) {
            console.log("data.message", data.message);
            socket.to(sendUserSocket).emit("msg-received", data.message);
        }
    });
});
