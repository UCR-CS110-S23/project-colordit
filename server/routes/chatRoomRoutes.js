const { chatRoom, getAllChatRooms } = require("../controllers/chatRoomController");

const router = require("express").Router();

router.post('/chatRoom', chatRoom);
router.get('/getAllChatRooms', getAllChatRooms);

module.exports = router;