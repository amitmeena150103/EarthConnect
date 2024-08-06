const mongoose = require("mongoose");

const initativeSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  userid: {
    ref: "user",
    type: mongoose.Schema.Types.ObjectId,
  },
  username: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Initative = new mongoose.model("Initative", initativeSchema);

module.exports = { Initative };
