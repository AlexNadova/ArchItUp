const express = require("express");
const router = express.Router();

const UserController = require("../controllers/userController");
const verifyAuth = require("../middleware/verify-auth");
const permission = require("../middleware/verifyPermissions");

router.post("/user/signup", UserController.user_signup);

router.post("/user/login", UserController.user_login);

//router.delete("/:userId", UserController.user_delete);

router.get("/user/:userId", UserController.user_get_user); //checkAuth

router.get("/users", UserController.user_get_all);

module.exports = router;
