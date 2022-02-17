const Url = require("../models/url");

module.exports.callUrl = async (req, res) => {
    if (!req.params.hash) return res.status(400).json({ message: "Invalid url" });
  
    let url_object = await Url.findOne({ _id: req.params.hash });
  
    if (!url_object) {
      res.status("404").send({ message: "Invalid Url" });
    } else {
      url_object.count++;
      await url_object.save();
      res.status("302").redirect(url_object.url);
    }
  };