const jwt = require("jsonwebtoken");
const { User } = require("../DataBase/Schema/userschema");
const { default: axios } = require("axios");

const signup = async (req, res) => {
  const body = req.body;
  const user = await User.create(body);
  const userObject = user.toObject();
  delete userObject.password;
  if (user) {
    res.json({
      status: true,
      user: userObject,
      userId: user._id,
      token: await user.generateToken(),
    });
  }
};

// SignIN
const signin = async (req, res) => {
  const user = res.user;
  const token = await user.generateToken();
  const userObject = user.toObject();
  delete userObject.password;
  res.json({
    status: true,
    user: userObject,
    token,
  });
};

// Change data of Json

const getData = (req, res) => {
  const key = process.env.JWT_KEY;
  const decoded = jwt.verify(res.token, key);
  res.json({
    status: true,
    data: decoded,
  });
};

// Insert order IDs

const all = async (req, res) => {
  const data = await User.find({});
  res.json({
    data,
  });
};

const deleteUser = async (req, res) => {
  const data = await User.deleteMany({});
  res.json({
    data,
  });
};

const validOrnot = async (req, res) => {
  try {
    const key = process.env.JWT_KEY;
    const decoded = jwt.verify(res.token, key);
    res.json({
      decoded,
      status: true,
    });
  } catch (error) {
    res.json({
      status: false,
    });
    console.log(error);
  }
};

//
const checkLikedPost = async (req, res) => {
  const { postId, userId } = req.body;
  const user = await User.find({ _id: userId, likedpost: postId });
  console.log(user);
  if (user.length == 0) {
    res.json({
      status: false,
    });
  } else {
    res.json({
      status: true,
    });
  }
};

// About

const updateAbout = async (req, res) => {
  try {
    const { userid, about } = req.body;
    console.log(req.body);
    const user = await User.findByIdAndUpdate(
      userid,
      { about: about },
      { new: 1 }
    );

    res.json({
      status: true,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

// getabout

const getuser = async (req, res) => {
  try {
    const userid = req.body.id;
    const user = await User.findById(userid);
    res.json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

// checkFollower

const checkFollower = async (req, res) => {
  const { userid, followingid } = req.body;
  const user = await User.find({ _id: userid, following: followingid });

  if (user.length == 0) {
    res.json({
      status: false,
    });
  } else {
    res.json({
      status: true,
    });
  }
};

// setfollower

const setFollower = async (req, res) => {
  try {
    const { userid, followingid } = req.body;

    await User.findByIdAndUpdate(
      userid,
      {
        $push: { following: followingid },
      },
      { new: 1 }
    );
    await User.findByIdAndUpdate(
      followingid,
      {
        $push: { followers: userid },
      },
      { new: 1 }
    );

    res.json({
      status: true,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
    });
  }
};

// unsetfollower

const unsetFollower = async (req, res) => {
  try {
    const { userid, followingid } = req.body;

    await User.findByIdAndUpdate(
      userid,
      {
        $pull: { following: followingid },
      },
      { new: 1 }
    );

    await User.findByIdAndUpdate(
      followingid,
      {
        $pull: { followers: userid },
      },
      { new: 1 }
    );

    res.json({
      status: true,
    });
  } catch (error) {
    res.status(404).json({
      status: false,
    });
  }
};

module.exports = {
  checkFollower,
  setFollower,
  unsetFollower,
  updateAbout,
  checkLikedPost,
  getData,
  signin,
  signup,
  getuser,
  all,
  deleteUser,
  validOrnot,
};
