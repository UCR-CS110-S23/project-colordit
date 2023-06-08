const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const chatRoomRoutes = require("./routes/chatRoomRoutes");
// const messageRoutes = require("./routes/messages");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/auth", chatRoomRoutes);
// app.use("/api/messages", messageRoutes);
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("Connected to Database"));

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});