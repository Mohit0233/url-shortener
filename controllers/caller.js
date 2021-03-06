const Url = require("../models/url");
const { validationResult } = require("express-validator");

module.exports.callUrl = async (req, res) => {
  const errors = validationResult(req).errors;
  if (errors.length > 0) {
    return res.send(errors);
  }

  if (!req.params.hash) return res.status(400).json({ message: "Invalid url" });

  let url_object = await Url.findOne({ hash: req.params.hash });
  if (!url_object) {
    res.status("404").send({ message: "Invalid Url" });
  } else {
    url_object.count++;
    await url_object.save();
    res.status("302").redirect(url_object.url);
  }
};
