import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { checkfollow, follow, unfollow } from "../../route";
import { toast } from "react-toastify";

const Followbtn = ({ userid, followingid,like,setlike }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const checkbtn = async () => {
      const { data } = await axios.post(checkfollow, {
        userid,
        followingid,
      });

      if (data.status) {
        setIsFollowing(true);
      }
    };

    checkbtn();
  }, [userid,followingid]);

  const handleButtonClick = async () => {
    if (isFollowing) {
      const { data } = await axios.post(unfollow, { userid, followingid });
      if (data.status) {
        toast.success("Successful UnFollowed");
      }
      setIsFollowing(!isFollowing);
    } else {
      const { data } = await axios.post(follow, { userid, followingid });
      if (data.status) {
        toast.success("Successful Followed");
      }
      setIsFollowing(!isFollowing);
    }
    setlike(!like)
  };

  return (
    <button
      onClick={handleButtonClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-md focus:outline-none ${
        isFollowing ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
      }`}
    >
      {isFollowing ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>Following</span>
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
          <span>Follow</span>
        </>
      )}
    </button>
  );
};

Followbtn.propTypes = {};

export default Followbtn;
