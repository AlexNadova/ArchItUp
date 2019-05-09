const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const checkAuth = require("../middleware/verifyAuth");
const verifyPermission = require("../middleware/verifyPermissions");
const upload = require("../middleware/uploadFiles");
const config = require("../config");

// Users on the system
const ADMIN = config.permissionLevels.ADMIN; // High authority level
const REG_USER = config.permissionLevels.REG_USER; // Medium authority level
const VISITORS = config.permissionLevels.VISITORS; // Low authority level

router.post(
  "/user/signup",
  upload.single("userImage"),
  UserController.user_signup
);

router.post("/user/login", UserController.user_login);

router.get("/user/:userId", [UserController.user_get_user]); //checkAuth

router.get("/users", [
  checkAuth,
  verifyPermission.minimumPermissionLevelRequired(ADMIN),
  UserController.user_get_all
]);

router.patch("/user/:userId", [checkAuth, UserController.user_update]); // Same user only and Admin

router.delete("/user/:userId", [checkAuth, UserController.user_delete]); // Same user only and Admin

module.exports = router;
