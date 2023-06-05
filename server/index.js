const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes)

mongoose.connect('mongodb+srv://slee827:OMp4Dnb0MBQVUcBz@colordit.wuf0kzx.mongodb.net/',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB Connection Successful");
})
.catch((err) => {
    console.log(err.message);
});

const server = app.listen(process.env.PORT,()=> {
    console.log(`Server Started on Port ${process.env.PORT}`);
})