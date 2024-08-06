const mainroute = "https://earthconnect.onrender.com";

const userroute = `${mainroute}/api/v1/user`;
const postroute = `${mainroute}/api/v1/post`;
const initativeroute = `${mainroute}/api/v1/initative`;

const signup = `${userroute}/signup`;
const checktoken = `${userroute}/checktoken`;
const signin = `${userroute}/signin`;
const checkLike = `${userroute}/checklike`;
const updateabout = `${userroute}/updateabout`;
const getuser = `${userroute}/getuser`;
const follow = `${userroute}/follow`;
const unfollow = `${userroute}/unfollow`;
const checkfollow = `${userroute}/checkfollow`;

const upload = `${postroute}/upload`;
const allPost = `${postroute}/getpost`;
const likePost = `${postroute}/likepost`;
const unlikePost = `${postroute}/unlikepost`;

const createIntitative = `${initativeroute}/createinitaive`;
const getIntitative = `${initativeroute}/userinitative`;
const deleteinitative = `${initativeroute}/deleteinitative`;
const allInitative = `${initativeroute}/allinitative`;
const getunJoinedInitative = `${initativeroute}/getunJoinedInitative`;
const joinintiative = `${initativeroute}/joinintiative`;
const unjoinintiative = `${initativeroute}/unjoinintiative`;
const joinedIntiative = `${initativeroute}/joinedIntiative`;

export {
  follow,
  unfollow,
  checkfollow,
  getuser,
  updateabout,
  joinedIntiative,
  unjoinintiative,
  joinintiative,
  getunJoinedInitative,
  allInitative,
  deleteinitative,
  getIntitative,
  createIntitative,
  likePost,
  unlikePost,
  checkLike,
  signup,
  checktoken,
  signin,
  upload,
  allPost,
};
