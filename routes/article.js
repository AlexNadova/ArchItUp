const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadFiles");
const checkAuth = require("../middleware/verifyAuth");
const articleController = require("../controllers/articleController");

router.get("/", articleController.articles_get_all);

router.post(
  "/",
  /* The single method means that we'll get one file only
   titleImages is the name of the field that is holding the file. */
  upload.single("titleImage"),
  articleController.articles_create_article
);

router.get("/:articleId", articleController.articles_get_article);

router.patch("/:articleId", articleController.articles_update_article);

router.delete("/:articleId", articleController.articles_delete);

module.exports = router;
