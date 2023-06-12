const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

var register = async (req,res,next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const data = await userModel.find({username: username});

        if (data != ""){
            return res.json({msg: "Username already in use", status: false});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            username: username,
            password: hashedPassword
        });

        delete user.password;
        return res.json({ status: true, user: user });
    } 
    catch(err) {
        console.log(err.message);
        next(err);
    }
};

var login = async (req,res,next) => {
    try {
        const {username, password} = req.body;
        const user = await userModel.find({username: username});

        if (user == ""){
            return res.json({msg: "Incorrect username or password", status: false});
        }

        const isPasswordValid = await bcrypt.compare(password, user[0].password);

        if (!isPasswordValid){
            return res.json({msg: "Incorrect username or password", status: false});
        }

        delete user.password;
        return res.json({ status: true, user: user[0] });
    } 
    catch(err) {
        console.log(err.message);
        next(err);
    }
};

var setAvatar = async (req,res,next) => {
    try{

        const userId = req.params.id;
        const avatarImage = req.body.image;
        await userModel.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage: avatarImage
        });
        
        return res.json({isSet: true, image: avatarImage});
    }
    catch(err){
        console.log(err.message);
        next(err);
    }
};

module.exports.register = register;
module.exports.login = login;
module.exports.setAvatar = setAvatar;