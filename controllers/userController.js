const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config");

const User = require("../models/userModel");

exports.user_signup = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        /* Bcrypt: https://github.com/kelektiv/node.bcrypt.js/#usage
        1. param: request.body.password is the password to be encrypted 
        2. param: 10 is the salt to be used in the encryption  */

        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              dateOfBirth: req.body.dateOfBirth,
              country: req.body.country,
              city: req.body.city,
              permissionLevel: req.permissionLevel,
              email: req.body.email,
              password: hash,
              phone: req.body.phone,
              fieldOfFocus: req.body.fieldOfFocus,
              education: req.body.education,
              workExperience: req.body.workExperience,
              description: req.body.description
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
};

exports.user_login = (req, res, next) => {
  /* User.find will make an array of all the users to find, but of course there is only one user when login.
  You can also use User.findOne this will make sure you don't get an array but just one user. */
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Authentication failed"
        });
      }
      /* To check a password: https://github.com/kelektiv/node.bcrypt.js/#to-check-a-password
      request.body.password is the plain text password, that the user types in.
      user[0].password is the hashed password to compare the plain text password to.
      Returns true if both passwords hashes to the same. If they were hashed withe the same algorithm */
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Authentication failed"
          });
        }
        if (result) {
          // Generate the token. Header, Payload and Signature.
          const token = jwt.sign(
            {
              // Token's Payload
              email: user[0].email,
              userId: user[0]._id,
              permissionLevel: user[0].permissionLevel
            },
            // Token's PrivateKey (secret)
            config.security.SECRETKEY,
            {
              // The token will expire: 1h = 1 hour
              expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: "Authentication successful",
            token: token
          });
        }
        res.status(401).json({
          message: "Authentication failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

// Get user by Id.
exports.user_get_user = (req, res, next) => {
  const id = req.params.userId;
  User.findById(id)
    .select(
      "_id firstName lastName dateOfBirth country city permissionLevel email password phone fieldOfFocus education workExperience description"
    )
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          user: doc,
          users: {
            type: "GET",
            url: "http://localhost:4000/api/users"
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.user_get_all = (req, res, next) => {
  User.find()
    .select(
      "_id firstName lastName dateOfBirth country city permissionLevel email password phone fieldOfFocus education workExperience description"
    )
    .exec()
    .then(docs => {
      console.log("From database (all users)", docs);
      const response = {
        count: docs.length,
        users: docs.map(doc => {
          return {
            _id: doc._id,
            firstName: doc.firstName,
            lastName: doc.lastName,
            dateOfBirth: doc.dateOfBirth,
            country: doc.country,
            city: doc.city,
            permissionLevel: doc.permissionLevel,
            email: doc.email,
            password: doc.password,
            phone: doc.phone,
            fieldOfFocus: doc.fieldOfFocus,
            education: doc.education,
            workExperience: doc.workExperience,
            description: doc.description,
            request: {
              type: "GET",
              url: "http://localhost:4000/api/user/" + doc._id
            }
          };
        })
      };

      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

// Update user
exports.user_update = (req, res, next) => {
  // Get user Id
  const id = req.params.userId;
  // An empty JavaScript object.
  const updateOps = {};
  // Loop through all the operations (that are requested) of the request body.
  for (const ops of req.body) {
    updateOps[ops.propFirstName] = ops.value;
    updateOps[ops.propLastName] = ops.value;
    updateOps[ops.propDateOfBirth] = ops.value;
    updateOps[ops.propCountry] = ops.value;
    updateOps[ops.propCity] = ops.value;
    //updateOps[ops.propEmail] = ops.value;
    updateOps[ops.propPassword] = ops.value;
    updateOps[ops.propPhone] = ops.value;
    updateOps[ops.propFieldOfFocus] = ops.value;
    updateOps[ops.propEducation] = ops.value;
    updateOps[ops.propWorkExperience] = ops.value;
    updateOps[ops.propDescription] = ops.value;
  }
  User.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result); // <-- Remove when done
      res.status(200).json({
        message: "User updated",
        request: {
          type: "GET",
          url: "http://localhost:4000/api/user/" + id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.user_delete = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
