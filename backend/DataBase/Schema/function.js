const jwt = require("jsonwebtoken");
const bs = require("bcryptjs");
const salt = bs.genSalt(10);

// Generate hash
async function generateHash(pass) {
  const salt_ = await salt;
  const password = await bs.hash(pass, salt_);
  return password;
}

// Password to HashConvert
const passTohash = async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    next();
  }
  const password = await generateHash(user.password);
  console.log("sgdawhaw");
  user.password = password;
};

// Provide JWT Token

const jwtToken = async function (next) {
  const obj = {
    id: this._id.toString(),
    email: this.email,
    username: this.username,
    firstname : this.firstname,
    lastname : this.lastName
  };
  const key = process.env.JWT_KEY;
  try {
    return jwt.sign(obj, key, { expiresIn: "30d" });
  } catch (error) {
    console.log(error);
  }
};

// Check Password

const checkPass = async function (password) {
  const boolean = await bs.compare(password, this.password);
  return boolean;
};

module.exports = { jwtToken, passTohash,checkPass };
