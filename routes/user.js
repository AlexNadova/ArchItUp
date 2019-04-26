const express = require("express");
const router = express.Router();

const UserController = require("../controllers/userController");

router.post("/user/signup", UserController.user_signup);

router.post("/user/login", UserController.user_login);

//router.delete("/:userId", UserController.user_delete);

//router.get("/user/:userId", UserController.user_find); //checkAuth

module.exports = router;
