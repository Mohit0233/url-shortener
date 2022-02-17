const jwt = require("express-jwt");
const jwtW = require("jsonwebtoken");

const secretKey = "shhhhhhared-secret";

const unprotected = [ "/", "/api/login", /\/[0-9A-Za-z]{7}/];


module.exports.tokenAuth = jwt({
  secret: secretKey,
  algorithms: ["HS256"],
  getToken: function fromHeaderOrQuerystring(req) {
    if (req.headers.authorization) {
      if (
        req.headers.authorization.split(" ").length === 2 &&
        (req.headers.authorization.split(" ")[0].toLowerCase() === "token" ||
          req.header.authorization.split(" ")[0].toLowerCase() === "bearer")
      ) {
        return req.headers.authorization.split(" ")[1];
      }
      return req.header.authorization;
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  },
}).unless({ path: unprotected });

module.exports.getToken = (id, email, expiry) =>
  jwtW.sign({ id: id, email: email }, secretKey, { expiresIn: expiry });

