const { addMessage, getAllMessages , updateMessage} = require("../controllers/messageController");
const router = require("express").Router();

router.post("/addMessage", addMessage);
router.post("/getAllMessages", getAllMessages);
router.post("/updateMessage", updateMessage);

module.exports = router;
