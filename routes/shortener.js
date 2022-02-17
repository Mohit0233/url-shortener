const express = require("express");
const { check } = require("express-validator");
const Shortener = require("../controllers/shortener")
const router = express.Router();

router.post("/urlShortener", 
[
    check("url").not().isEmpty().isURL().withMessage("Enter a valid url for shortening"),
    check("days")
      .isNumeric()
      .withMessage("Enter a valid number"),
  ], Shortener.urlShortener);

module.exports = router;
