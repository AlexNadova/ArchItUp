const jwt = require("jsonwebtoken");
const secret = require("../config");

module.exports = (req, res, next) => {
  try {
    /* The split() method is used to split a string into an array of substrings, and returns the new array.
    Splitting the Bearer and the white space from the token it self, then access the second segment (index 1) */
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
