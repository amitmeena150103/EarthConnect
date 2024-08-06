const { Initative } = require("../DataBase/Schema/initative");
const { User } = require("../DataBase/Schema/userschema");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

// Create Initative
const createInitaive = async (req, res) => {
  const { description, userid, username, title } = req.body;
  const base64 = Buffer.from(req.file.buffer).toString("base64");
  const body = {
    description,
    userid,
    username,
    title,
    image: base64,
  };
  const initative = await Initative.create(body);
  res.json({
    status: true,
    initative: initative._id,
  });
};

// Get all Initative of User Id

const usersInitaive = async (req, res) => {
  try {
    const id = req.params.id;
    const initative = await Initative.find({ userid: id });
    res.json({
      status: true,
      initative,
    });
  } catch (error) {
    res.json({
      status: false,
    });
  }
};

// delete initative

const deleteInitative = async (req, res) => {
  try {
    const id = req.params.id;
    await Initative.deleteOne({ _id: id });
    res.json({
      status: true,
      msg: "deleted successfull",
    });
  } catch (e) {
    res.json({
      status: false,
    });
  }
};

// all intiative except own

const allIntiative = async (req, res) => {
  try {
    const id = req.params.id;
    const allintiative = await Initative.find({ userid: { $ne: id } });
    res.json({
      status: true,
      allintiative: allintiative,
    });
  } catch (error) {
    res.json({
      status: false,
    });
    console.log(error);
  }
};

// Join Initative

const joinIntiative = async (req, res) => {
  try {
    const { userid, initativeid } = req.body;
    const update = await User.findByIdAndUpdate(
      userid,
      {
        $push: { joinedintiative: initativeid },
      },
      { new: 1 }
    );
    console.log(update);
    res.json({
      status: true,
      joined: update.joinedintiative,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
    });
  }
};

// UnJoin Initative

const unjoinIntiative = async (req, res) => {
  try {
    const { userid, initativeid } = req.body;
    const update = await User.findByIdAndUpdate(
      userid,
      {
        $pull: { joinedintiative: initativeid },
      },
      { new: 1 }
    );
    res.json({
      status: true,
      joined: update.joinedintiative,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
    });
  }
};

// getunJoinedInitative
const getunJoinedInitative = async (req, res) => {
  const id = req.body.userid;
  const user = await User.findById(id);
  const arr = user.joinedintiative;
  const objectid = ObjectId.createFromHexString(id);
  const initative = await Initative.aggregate([
    {
      $match: {
        userid: {
          $ne: objectid,
        },
        _id: {
          $nin: arr,
        },
      },
    },
  ]).sort({ createdAt: -1 });
  res.json({
    status: true,
    initative: initative,
  });
};

// joined Intiative
const joinedIntiative = async (req, res) => {
  try {
    const id = req.body.userid;
    const user = await User.findById(id);
    const arr = user.joinedintiative;
    const intitave = await Initative.find({ _id: { $in: arr } });
    res.json({
      status: true,
      intitave,
    });
  } catch (error) {
    res.json({
      status: false,
    });
    console.log(error);
  }
};

module.exports = {
  joinedIntiative,
  getunJoinedInitative,
  unjoinIntiative,
  joinIntiative,
  allIntiative,
  deleteInitative,
  usersInitaive,
  createInitaive,
};
