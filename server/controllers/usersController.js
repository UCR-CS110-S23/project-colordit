const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const fetch = require("node-fetch");

var register = async (req,res,next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const usernameCheck = await fetch("http://localhost:3000/username?username=" + username)
        const data = await usernameCheck.json()

        if (data == "user found"){
            return res.json({msg: "Username already in use", status: false});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            username: username,
            password: hashedPassword
        });

        delete user.password;
        return res.json({ status: true, user });
    } 
    catch(err) {
        console.log(err.message);
        next(err);
    }
};

var login = async (req,res,next) => {
    try {
        const {username, password} = req.body;

        const user = await User.findOne({ username });
        if (!user)
            return res.json({msg: "Incorrect username or password", status: false});

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid)
            return res.json({msg: "Incorrect username or password", status: false});

        delete user.password;

        return res.json({ status: true, user });
    } 
    catch(ex) {
        next(ex);
    }
};

var getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({_id: { $ne:req.params.id } }).select([
            "username",
            "avatarImage",
            "_id"
        ]);
        return res.json(users);
    } 
    catch (ex) {
        next(ex);
    }
};

module.exports.register = register;
module.exports.getAllUsers = getAllUsers;
module.exports.login = login;