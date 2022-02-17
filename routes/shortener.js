const express = require("express");
const { check } = require("express-validator");
const Shortener = require("../controllers/shortener")
const router = express.Router();

router.post("/urlShortener",
[
    check("url", "Enter a valid url for shortening").not().isEmpty().bail().isURL(),
    check("day", "Enter a valid number").isNumeric(),
  ], Shortener.urlShortener);

module.exports = router;
