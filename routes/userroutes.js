const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
//public
router.post("/register", UserController.userRegister);
router.post("/login", UserController.userLogin);

//private (auth)

module.exports = router;
