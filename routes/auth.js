const express = require("express");
const { check } = require("express-validator");
const validate = require("../middlewares/validate");
const AuthController = require("../controllers/auth");

const router = express.Router();

router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Enter a valid email address"),
    check("password")
      .not()
      .isEmpty()
      .isLength({ min: 6, max: 16 })
      .withMessage("Must be at least 6 chars long"),
  ],
  validate,
  AuthController.login
);

router.get("/token", AuthController.getToken);

module.exports = router;
