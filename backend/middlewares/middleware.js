const { User } = require("../DataBase/Schema/userschema");

const signin_middleware = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (!user) {
    res.status(404).json({
      status: false,
      msg: "No user Exist",
    });
    return;
  }
  const boolean = await user.checkpassword(password);
  if (!boolean) {
    res.status(404).json({
      status: false,
      msg: "Incorrect Password",
    });
    return;
  }
  res.user = user;
  next();
};

const signup_middleware = async (req, res, next) => {
  const { username } = req.body;
  const user = await User.findOne({ username : username });
  if (user) {
    res.status(404).json({
      status: false,
      msg: "User Already Exist",
    });
    return;
  }
  const email = await User.findOne({ email : username });
  if (email) {
    res.status(404).json({
      status: false,
      msg: "User Already Exist",
    });
    return;
  }
  next();
};

const check_token = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (bearerToken) {
    const token = bearerToken.split(" ")[1];
    res.token = token;
    next();
    return;
  }
  res.status(404).json({
    status: false,
    msg: "No token Exist",
  });
};

module.exports = { check_token, signin_middleware, signup_middleware };
