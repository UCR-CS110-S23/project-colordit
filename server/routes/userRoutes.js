const { register, getAllUsers } = require("../controllers/usersController");

const router = require("express").Router();

router.post("/register", register);


router.get('/allusers/:id', getAllUsers)

module.exports = router;

