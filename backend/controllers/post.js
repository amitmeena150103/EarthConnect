const { Post } = require("../DataBase/Schema/postschema");
const { User } = require("../DataBase/Schema/userschema");

const upload = async (req, res) => {
  try {
    const { userid, description, username } = req.body;
    const base64 = Buffer.from(req.file.buffer).toString("base64");
    const post = await Post.create({
      userid,
      username,
      description,
      image: base64,
    });
    res.json({
      status: true,
      post: post._id,
    });
  } catch (error) {
    console.log("post controller 17 line \n" + error);
    res.status(404).json({
      status: false,
    });
  }
};

// get all post

const getPost = async (req, res) => {
  try {
    const post = await Post.find({}).sort({ createdAt: -1 });
    res.json({
      status: true,
      post,
    });
  } catch (error) {
    res.json({
      status: false,
    });
  }
};

// increase Like in post

const likePost = async (req, res) => {
  try {
    const { postid, userid } = req.body;
    const increasePost = await Post.findByIdAndUpdate(
      postid,
      { $inc: { likecount: 1 } },
      { new: 1 }
    );

    const likepost = await User.findByIdAndUpdate(userid, {
      $push: { likedpost: postid },
    });

    res.json({
      status: true,
      like: increasePost.likecount,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
    });
  }
};

// decrese id

const unLikePost = async (req, res) => {
  try {
    const { postid, userid } = req.body;
    const increasePost = await Post.findByIdAndUpdate(
      postid,
      { $inc: { likecount: -1 } },
      { new: 1 }
    );

    const unlikepost = await User.findByIdAndUpdate(
      userid,
      {
        $pull: { likedpost: postid },
      },
      { new: 1 }
    );

    res.json({
      status: true,
      like: increasePost.likecount,
      unlikepost: unlikepost.likedpost,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
    });
  }
};


// get post 


module.exports = {unLikePost, likePost, getPost, upload };
