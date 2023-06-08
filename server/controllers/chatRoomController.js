const chatRoomModel = require("../models/chatRoomModel");

var chatRoom = async (req,res,next) => {
    try {
        const chatRoomName = req.body.chatRoomName;
        const data = await chatRoomModel.find({name: chatRoomName});

        if (data != ""){
            return res.json({msg: "Chat room name already in use", status: false});
        }

        const user = await chatRoomModel.create({
            name: chatRoomName
        });

        return res.json({status:true});
    } 
    catch(err) {
        console.log(err.message);
        next(err);
    }
};

module.exports.chatRoom = chatRoom;