const jwt = require("jsonwebtoken");
const secret = require("../config");

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

module.exports = (req, res, next) => {
  try {
    // The split() method is used to split a string into an array of substrings, and returns the new array.
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, secret.security.SECRETKEY, (err, decoded) => {
      // If current token is invalid, sends a jwt expired error.
      if (err) {
        err = {
          name: "TokenExpiredError",
          message: "jwt expired"
          //expiredAt: 1408621000
        };
      } else {
        req.userData = decoded;
      }
      next();
    });
  } catch (error) {
    return res.status(401).json({
      message:
        "Auth failed. An access token is required to request this resource."
    });
  }
};
