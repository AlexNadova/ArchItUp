// middleware for doing role-based permissions

const jwt = require("jsonwebtoken");
const secret = require("../config"); //["security"]; //security.SECRETKEY

const ADMIN_PERMISSION = 4096;

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
          //TODO: REMEMBER TO DELETE: > + user_permission_level + " " + required_permission_level <
          "You do not have authority to access this data " + user_permission_level + " " + required_permission_level
        );
    }
  };
};

exports.onlySameUserOrAdminCanDoThisAction = (req, res, next) => {
  const user_permission_level = parseInt(req.jwt.permissionLevel);
  const userId = req.jwt.userId;
  if (req.params && req.params.userId && userId === req.params.userId) {
    return next();
  } else {
    /*uses Bitwise Operators for permission (bit masking)
    https://abdulapopoola.com/2016/05/30/understanding-bit-masks/ */
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
