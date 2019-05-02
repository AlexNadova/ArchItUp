// middleware for doing role-based permissions

const jwt = require("jsonwebtoken");
const secret = require("../config"); //["security"]; //security.SECRETKEY

const ADMIN_PERMISSION = 4096;

/* exports.minimumPermissionLevelRequired = required_permission_level => {
  return (req, res, next) => {
    const user_permission_level = parseInt(req.jwt.permissionLevel); // req.jwt.permissionLevel
    //const user_id = req.jwt.user_id;
    if (user_permission_level & required_permission_level) {
      return next();
    } else {
      return res
        .status(403)
        .send("You do not have authority to access this data - " + " request: " + req + " - response: " + res);
    }
  };
}; */

exports.minimumPermissionLevelRequired = required_permission_level => {
  return (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    const user_permission_level = parseInt(jwt.verify(token, secret.security.SECRETKEY).permissionLevel);
    //const user_id = req.jwt.user_id;
    if (user_permission_level & required_permission_level) {
      return next();
    } else {
      return res
        .status(403)
        .send(
          "You do not have authority to access this data " + user_permission_level + " " + required_permission_level
        );
    }
  };
};

/* module.exports = (req, res, next) => {
  try {
    // The split() method is used to split a string into an array of substrings, and returns the new array.
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, secret.security.SECRETKEY);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed, missing access token"
    });
  }
}; */

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
