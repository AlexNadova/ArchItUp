const express = require("express");
const router = express.Router();
// multer is for handling multipart/ form-data, which is primarily used for uploading files
const multer = require("multer");
const checkAuth = require("../middleware/verifyAuth");
const articleController = require("../controllers/articleController");

// Store all files in /uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // Where to store the file
    cb(null, "./uploads/");
  },
  // What the file name shall be.
  filename: function(req, file, cb) {
    //cb(null, new Date().toISOString() + file.originalname);
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // if jpeg or png it will be stored
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    // For all other incoming file types, will be rejected
    cb(null, false);
  }
};

// Storing all incoming files
const upload = multer({
  storage: storage,
  // Limiting the size of the file
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

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
