const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const chatRoomRoutes = require("./routes/chatRoomRoutes");
const messageRoutes = require("./routes/messagesRoutes");
const socket = require("socket.io");
const session = require('express-session');
const app = express();
require("dotenv").config();

app.use(cors({origin: 'http://localhost:3000', credentials:true }));
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
        origin: '*',
    }
});

const sessionMiddleware = session({
    resave: false, // Whether to save the session to the store on every request
    saveUninitialized: false, // Whether to save uninitialized sessions to the store
    secret: process.env.SESSION_SECRET,
});

app.use(sessionMiddleware);

io.use((socket, next) => {
    console.log("socket io middleware")
    sessionMiddleware(socket.request, {}, next);
});
  
io.use((socket, next) => {
    if (socket.request.session && socket.request.session.authenticated) {
        next();
    } 
    else {
        console.log("unauthorized")
        next(new Error('unauthorized'));
    }
});

io.on("connection", (socket) => {
    socket.on("disconnect", () => {
        console.log("user Disconnected")
    });
    
    socket.on("chat message", (data) => {
        console.log("got the message", data.message);
        console.log(data.room);
        io.to(data.room).emit("chat message", data);
    });
    
    socket.on("join", (data) => {
        socket.join(data.room);
        room = data.room
        userName = data.username
        console.log(`user is joined to room ${data.room}`)
    });
});