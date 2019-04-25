const express = require("express");
const router = express.Router();

const UserController = require("../controllers/userController");

router.post("/user/signup", UserController.user_signup);

router.post("/user/login", UserController.user_login);

module.exports = router;
