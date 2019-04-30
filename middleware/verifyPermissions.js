// middleware for doing role-based permissions

const jwt = require("jsonwebtoken"),
  secret = require("../config")["security.SECRETKEY"]; //security.SECRETKEY
  const User = require("../models/userModel");

const ADMIN_PERMISSION = 4096;

exports.minimumPermissionLevelRequired = (required_permission_level) => {
  return (req, res, next) => {
    const user_permission_level = parseInt(req.jwt.permissionLevel);
    //const user_id = req.jwt.user_id;
    if (user_permission_level & required_permission_level) {
      return next();
    } else {
      return res.status(403).send("You do not have authority to access this data");
    }
  };
};

exports.onlySameUserOrAdminCanDoThisAction = (req, res, next) => {
  const user_permission_level = parseInt(req.jwt.permissionLevel);
  const userId = req.jwt.userId;
  if (req.params && req.params.userId && userId === req.params.userId) {
    return next();
  } else {
    if (user_permission_level & ADMIN_PERMISSION) {
      return next();
    } else {
      return res.status(403).send();
    }
  }
};

exports.sameUserCantDoThisAction = (req, res, next) => {
  const userId = req.jwt.userId;

  if (req.params.userId !== userId) {
    return next();
  } else {
    return res.status(400).send();
  }
};
