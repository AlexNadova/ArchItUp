const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

exports.hasAuthValidFields = (req, res, next) => {
  const errors = [];

  if (req.body) {
    if (!req.body.email) {
      errors.push("Missing email field");
    }
    if (!req.body.password) {
      errors.push("Missing password field");
    }

    if (errors.length) {
      return res.status(400).send({ errors: errors.join(",") });
    } else {
      return next();
    }
  } else {
    return res
      .status(400)
      .send({ errors: "Missing email and password fields" });
  }
};

exports.isPasswordAndUserMatch = (req, res, next) => {
  User.findByEmail(req.body.email).then(user => {
    if (!user[0]) {
      res.status(404).send({});
    } else {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
              return res.status(401).json({
                message: "Authentication failed"
              });
            }
            if (result) {}
      // The split() method is used to split a string into an array of substrings, and returns the new array.
      const passwordFields = user[0].password.split("$");
      const salt = passwordFields[0];
      const hash = crypto
        .createHmac("sha512", salt)
        .update(req.body.password)
        .digest("base64");
      if (hash === passwordFields[1]) {
        req.body = {
          userId: user[0]._id,
          email: user[0].email,
          permissionLevel: user[0].permissionLevel,
          provider: "email",
          name: user[0].firstName + " " + user[0].lastName
        };
        return next();
      } else {
        return res.status(400).send({ errors: ["Invalid e-mail or password"] });
      }
    }
  });
};
