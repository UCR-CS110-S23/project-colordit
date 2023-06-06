const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);
require("dotenv").config();

const uri = "mongodb+srv://tpast001:1TRzWpMTnMtBi1cm@userinformation.8cfdfty.mongodb.net/?retryWrites=true&w=majority";

async function connect(){
    try{
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    }
    catch (err){
        console.error(err);
    }
}

connect();

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});