const express = require("express");
const router = express.Router();

const UserController = require("../controllers/userController");
const verifyAuth = require("../middleware/verify-auth");

router.post("/user/signup", UserController.user_signup);

router.post("/user/login", UserController.user_login);

//router.delete("/:userId", UserController.user_delete);

router.get("/user/:userId", verifyAuth, UserController.user_get_user); //checkAuth

module.exports = router;
