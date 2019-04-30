const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = (req, res, next) => {
  if (req.headers["authorization"]) {
    try {
      const authorization = req.headers["authorization"].split(" ");
      if (authorization[0] !== "Bearer") {
        return res.status(401).send();
      } else {
        req.jwt = jwt.verify(authorization[1], config.security.SECRETKEY);
        return next();
      }
    } catch (err) {
      // 403 for a valid request with an invalid token, or valid token with invalid permissions
      return res.status(403).send();
    }
  } else {
    // 401 for an invalid request
    return res.status(401).send("Auth failed");
  }
};

/* const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, config.security.SECRETKEY);
      req.userData = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        message: "Auth failed"
      });
    } */
