// Given simple user schema

const mongoose = require("mongoose");

const functions = require("./function");

const User_schema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  firstname: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  likedpost: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  joinedintiative: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Initative",
    },
  ],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  about: {
    type: String,
    require: true,
  },
});

User_schema.pre("save", functions.passTohash);

User_schema.methods.generateToken = functions.jwtToken;

User_schema.methods.checkpassword = functions.checkPass;

const User = new mongoose.model("User", User_schema);

module.exports = { User, User_schema };
