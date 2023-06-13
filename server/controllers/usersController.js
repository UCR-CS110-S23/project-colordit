const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

var register = async (req,res,next) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        const city = req.body.birthCity;
        const data = await userModel.find({username: username});

        if (data != ""){
            return res.json({msg: "Username already in use", status: false});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const hashedCity = await bcrypt.hash(city, 10);
        const user = await userModel.create({
            username: username,
            password: hashedPassword,
            city: hashedCity
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
        const {username, password, securityAnswer} = req.body;
        const user = await userModel.find({username: username});

        if (user == ""){
            return res.json({msg: "Incorrect username, password, or security answer", status: false});
        }

        const isPasswordValid = await bcrypt.compare(password, user[0].password);

        if (!isPasswordValid){
            return res.json({msg: "Incorrect username, password, or security answer", status: false});
        }

        const isCityValid = await bcrypt.compare(securityAnswer, user[0].city);

        if (!isCityValid){
            return res.json({msg: "Incorrect username, password, or security answer", status: false});
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