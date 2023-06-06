const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userModel = require("./models/userModel");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("Connected to Database"));

app.get('/username', async (req, res) => {
    var query = await userModel.find({username: req.query.username});
    // res.send(query);
    if(query == ""){
        res.send("user not found");
    }
    else{
        res.send("user found");
    }
});

app.post('/new_user', async (req, res) => {
    const user = new userModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        isAvatarImageSet: req.body.isAvatarImageSet,
        avatarImage: req.body.avatarImage
    });

    try{
        const newUser = await user.save();
        res.json(newUser);
    }
    catch(err){
        res.json({message: err.message});
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});