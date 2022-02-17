const jwtMiddleware = require("../middlewares/jwt");
const User = require("../models/user");

exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Make sure this account doesn't already exist
  let user = await User.findOne({ email });

  if (user) {

    if (!user.comparePassword(password)) return res.status(401).json({message: 'Invalid email or password'});

    const token = jwtMiddleware.getToken(user._id, email, "7d");

    return res.status(200).json({
      mail: email,
      password: password,
      token: token,
      message: "User logged in 😀",
    });
  }

  user = new User({ ...req.body });

  const user_ = await user.save();
  if (user_) {
  const token = jwtMiddleware.getToken(id, email, "7d");
  res.send({
    email: email,
    password: password,
    token: token,
    message: "New User logged in ❤️",
  });
} else {
  res.status(501).send({
    message: "something went wrong"
  })
}
};

module.exports.getToken = (err, req, res) => {

  console.log("err", err)
  if (err.name === 'UnauthorizedError') {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
  const token = jwtMiddleware.getToken(user.id, user.email, "7d");

  res.send(token);
}


// so there will be url send by the user and we have to create an md5  for the respected data and check if the data is
// check if the data is able to be encrypted or not if the data is encrypted then the things go good so there will a service which will handle this
// so there can be two things done here
