import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import axios from "axios";
import { checkLike, likePost, unlikePost } from "../../route";
import Followbtn from "./followbtn";

const Postcard = ({ obj, like, setlike }) => {
  const [liked, setliked] = useState(false);
  const [image, setimage] = useState(null);
  const user = useSelector((state) => state.userinfo);

  useEffect(() => {
    setimage(obj.image);
    const checkIsLiked = async () => {
      const { data } = await axios.post(checkLike, {
        postId: obj._id,
        userId: user.id,
      });
      setliked(data.status);
    };
    checkIsLiked();
  }, [obj]);

  async function clicked() {
    const object = {
      postid: obj._id,
      userid: user.id,
    };

    if (liked) {
      await axios.post(unlikePost, object);
    } else {
      await axios.post(likePost, object);
    }
    setlike(!like);
    setliked(!liked);
  }
  return (
    <>
      <div className="bg-gray-100  rounded-lg p-6">
        <div className="bg-white border rounded-sm max-w-md">
          <div className="flex justify-between">
            <div className="flex items-center px-4 py-3">
              <IconButton onClick={() => {}} sx={{ p: 0 }}>
                <Avatar alt="Aemy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
              <div className="ml-3 ">
                <span className="text-sm font-semibold antialiased block leading-tight">
                  @ {obj.username}
                </span>
                {/* <span className="text-gray-600 text-xs block">
                Asheville, North Carolina
              </span> */}
              </div>
            </div>

            {obj.userid === user.id ? (
              <></>
            ) : (
              <div className="flex items-center px-4 py-3">
                <Followbtn
                  key={Math.random() * 100}
                  userid={user.id}
                  followingid={obj.userid}
                  like={like}
                  setlike={setlike}
                />
              </div>
            )}
          </div>
          <div className="w-full h-96 overflow-hidden flex justify-center items-center">
            <img
              className="object-cover w-full h-full"
              src={`data:image/jpg;base64,${image}`}
              alt="Uploaded"
            />
          </div>
          {/* <img src={`data:image/jpg;base64,${image}`} /> */}
          <div className="flex items-center justify-between mx-4 mt-3 mb-2">
            <div className="flex gap-5">
              {liked == true ? (
                <svg
                  onClick={clicked}
                  className="hover:cursor-pointer border-black  "
                  viewBox="2 2 20 20"
                  width="24"
                  height="24"
                  fill="red"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              ) : (
                <svg
                  onClick={clicked}
                  className="hover:cursor-pointer "
                  fill="#262626"
                  height="24"
                  viewBox="0 0 48 48"
                  width="24"
                >
                  <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                </svg>
              )}
            </div>
            <div className="flex"></div>
          </div>
          <div className="text-sm mx-4 mt-2 mb-4">{obj.description} </div>
          <div className="font-semibold text-sm mx-4 mt-2 mb-4">
            {obj.likecount} likes
          </div>
        </div>
      </div>
    </>
  );
};

Postcard.propTypes = {
  obj: PropTypes.object,
  like: PropTypes.any,
  setlike: PropTypes.any,
};

export default Postcard;
