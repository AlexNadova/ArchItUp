const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const database = require("./db/mongoDB");

const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");

const app = express();

// Get MongoConnection
database.connectWithCallback();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/user", userRouter);

// Handling Errors pass app.use.
app.use((req, res, next) => {
  const error = new Error("Not found, tdo - Status 404?");
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
