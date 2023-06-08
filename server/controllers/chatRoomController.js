const chatRoomModel = require("../models/chatRoomModel");

var chatRoom = async (req,res,next) => {
    try {
        const chatRoomName = req.body.chatRoomName;
        const data = await chatRoomModel.find({name: chatRoomName});

        if (data != ""){
            return res.json({msg: "Chat room name already in use", status: false});
        }

        const chatRoom = await chatRoomModel.create({
            name: chatRoomName
        });

        return res.json({status:true, chatRoom});
    } 
    catch(err) {
        console.log(err.message);
        next(err);
    }
};

var getAllChatRooms = async (req, res, next) => {
    try {
        console.log("here");
        const chatRooms = await chatRoomModel.find()
        console.log(chatRooms);
        
        return res.json({status:true, chatRooms});
    } 
    catch (ex) {
        next(ex);
    }
};

module.exports.chatRoom = chatRoom;
module.exports.getAllChatRooms = getAllChatRooms;