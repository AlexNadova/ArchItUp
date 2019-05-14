const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadFiles");
const checkAuth = require("../middleware/verifyAuth");
const verifyPermission = require("../middleware/verifyPermissions");
const articleController = require("../controllers/articleController");
const config = require("../config");

// User roles
const ADMIN = config.permissionLevels.ADMIN; // High authority level
const REG_USER = config.permissionLevels.REG_USER; // Medium authority level
const VISITORS = config.permissionLevels.VISITORS; // Low authority level

router.get("/", articleController.articles_get_all);

router.post(
  "/",
  /* The single method means that we'll get one file only
   titleImages is the name of the field that is holding the file. */
  [
    checkAuth,
    upload.single("titleImage"),
    articleController.articles_create_article
  ]
);

router.get("/:articleId", [checkAuth, articleController.articles_get_article]);

router.patch("/:articleId", [
  checkAuth,
  verifyPermission.permissionLevelRequired(REG_USER),
  articleController.articles_update_article
]);

router.delete("/:articleId", [
  checkAuth,
  verifyPermission.permissionLevelRequired(REG_USER),
  articleController.articles_delete
]);

module.exports = router;
