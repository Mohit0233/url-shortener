const CryptoJS = require("crypto-js");
const Url = require("../models/url");

module.exports.urlShortener = async (req, res) => {
  const user = req.user;
  const url = req.body.url;
  const days = req.body.days || 30;
  console.log("user", user)
  var sliced_hash = CryptoJS.MD5(url + user.id).toString().slice(0, 7);

  let url_object = await Url.findOne({ id: sliced_hash });
  var fullUrl = req.protocol + '://' + req.get('host') + "/";
  console.log("req.originalUrl", req.originalUrl)
  console.log("full url", fullUrl);

  //   todo do a limit check for a normal user so that he won't be able overuse the url shortener
  // check the expiry limit for the user 
  if (url_object) {
    res.send({ shortUrl: fullUrl + sliced_hash, url: url, expiryDate: url_object.expiryDate, message: "url already present" });
    return;
  }

  console.log(user)
  url_object = new Url({
    _id: sliced_hash,
    userId: user.id,
    url: url,
    expiryDate: new Date(new Date(new Date().setDate(new Date().getDate() + days)).setHours(0, 0, 0, 0)),
  });

  url_object = await url_object.save();

  if (url_object) res.send({shortUrl: sliced_hash, url: url, expiryDate: url_object.expiryDate});
  else res.status("401").send({ message: "Oops! something went wrong" });
};


// todo make a cron that deletes all the expired cron

