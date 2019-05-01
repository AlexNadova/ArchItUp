// middleware for doing role-based permissions

const jwt = require("jsonwebtoken"),
 secret = require("../config")["SECRETKEY"]; //security.SECRETKEY

const ADMIN_PERMISSION = 4096;

const tryTok = jwt.permissionLevel;
const parTok = parseInt(jwt.permissionLevel);
console.log("Token: " + tryTok);
console.log("ParseInt Token: " + parTok);
console.log("SecretKey: " + secret);
console.log("JWT: " + jwt);

exports.minimumPermissionLevelRequired = required_permission_level => {
  return (req, res, next) => {
    const user_permission_level = 4; //parseInt(req.jwt.permissionLevel);
    //const user_id = req.jwt.user_id;
    if (user_permission_level & required_permission_level) {
      return next();
    } else {
      return res
        .status(403)
        .send("You do not have authority to access this data - " + " request: " + req + " - response: " + res);
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
