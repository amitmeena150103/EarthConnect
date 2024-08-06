const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  description: {
    type: String,
  },
  userid: {
    ref: "user",
    type: mongoose.Schema.Types.ObjectId,
  },
  username : {
    type : String,
    required : true
  },
  image: {
    type: String,
  },
  likecount : {
    type : Number,
    default : 0
  },
  createdAt : {
    type : Date,
    default : Date.now
  }
});

const Post = new mongoose.model("Post", postSchema);

module.exports = { Post };
