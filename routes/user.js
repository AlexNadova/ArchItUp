const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const checkAuth = require("../middleware/verifyAuth");
const verifyPermission = require("../middleware/verifyPermissions");
const upload = require("../middleware/uploadFiles");
const config = require("../config");

// User roles
const ADMIN = config.permissionLevels.ADMIN;
const REG_USER = config.permissionLevels.REG_USER;
const VISITORS = config.permissionLevels.VISITORS;

router.post(
  "/user/signup",
  //upload.single("userImage"),
  UserController.user_signup
);

router.post("/user/login", UserController.user_login);

router.get("/user/:userId", [checkAuth, UserController.user_get_user]);

router.get("/users", [
  checkAuth,
  verifyPermission.permissionLevelRequired(ADMIN),
  UserController.user_get_all
]);

router.patch("/user/:userId", [
  checkAuth,
  verifyPermission.permissionLevelRequired(REG_USER),
  UserController.user_update
]);

router.delete("/user/:userId", [
  checkAuth,
  verifyPermission.permissionLevelRequired(REG_USER),
  UserController.user_delete
]);

module.exports = router;
