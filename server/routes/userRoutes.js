const { register, login, setAvatar, getAllUsers } = require("../controllers/usersController");
const { chatRoom } = require("../controllers/chatRoomController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post('/setAvatar/:id', setAvatar);
router.post('/chatRoom', chatRoom);
router.get('/allusers/:id', getAllUsers);


module.exports = router;