const jwt = require("jsonwebtoken"),
  secret = require("../config") //.SECRETKEY;

exports.verifyJWT = (req, res, next) => {
  if (req.headers["authorization"]) {
    try {
      const authorization = req.headers["authorization"].split(" ");
      if (authorization[0] !== "Bearer") {
        return res.status(401).send();
      } else {
        req.jwt = jwt.verify(authorization[1], secret);
        return next();
      }
    } catch (err) {
      // 403 for a valid request with an invalid token, or valid token with invalid permissions
      return res.status(403).send();
    }
  } else {
    // 401 for an invalid request
    return res.status(401).send("Auth failed " + req);
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
