// multer is for handling multipart/ form-data, which is primarily used for uploading files
const multer = require("multer");

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

module.exports = upload;
