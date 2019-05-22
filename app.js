const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const database = require("./db/mongoDB");

const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const articleRouter = require("./routes/article");

const app = express();

// Get MongoConnection
database.connectWithCallback();

app.use(logger("dev"));
// /uploads is where all the saved files can be retrieved. And makes the upload folder public 
app.use("/uploads", express.static("uploads"));
// use express.json and express.urlencoded so we can get info from POST and/or URL parameters
// Parses the text as JSON and exposes the resulting object on req.body.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/", indexRouter);
app.use("/api", userRouter);
app.use("/api/article", articleRouter);

// Handling Errors pass app.use.
app.use((req, res, next) => {
  const error = new Error("Not found, tdo - Status 404");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
