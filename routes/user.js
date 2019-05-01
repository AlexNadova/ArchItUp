const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const verifyAuth = require("../middleware/verifyAuth");
const verifyPermission = require("../middleware/verifyPermissions");
const config = require("../config");

// Users on the system
const ADMIN = config.permissionLevels.ADMIN; // High authority level
const REGISTERED = config.permissionLevels.REG_USER; // Medium authority level
const NORMAL = config.permissionLevels.NORMAL_USER; // Low authority level

router.post("/user/signup", UserController.user_signup);

router.post("/user/login", UserController.user_login);

router.get("/user/:userId", UserController.user_get_user); //checkAuth

router.get("/users", [
  //verifyAuth.verifyJWT,
  verifyPermission.minimumPermissionLevelRequired(REGISTERED),
  UserController.user_get_all
]);

router.patch("/user/:userId", UserController.user_update);

router.delete("/user/:userId", UserController.user_delete);

module.exports = router;
