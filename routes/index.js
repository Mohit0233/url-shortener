
const auth = require("./auth");
const shortener = require("./shortener");
const Caller = require("../controllers/caller");
const { check } = require("express-validator");

module.exports = (app) => {

  app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
  });

  app.get("/:hash([0-9A-Za-z]{7})", Caller.callUrl);

  app.use("/api/", auth);
  app.use("/api/", shortener);
  // app.use('/api/user', authenticate, user);
};
