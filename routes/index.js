
const auth = require("./auth");
const shortener = require("./shortener");
const Caller = require("../controllers/caller");
const { check } = require("express-validator");

module.exports = (app) => {

  app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
  });

  app.get("/:hash", [ check("hash").custom((value, { req }) => console.log(value)),
  ], Caller.callUrl);

  app.use("/api/", auth);
  app.use("/api/", shortener);
  // app.use('/api/user', authenticate, user);
};
