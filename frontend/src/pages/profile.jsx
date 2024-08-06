import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import axios from "axios";
import { getuser, updateabout } from "../../route";
import { toast } from "react-toastify";
import Followbtn from "../components/followbtn";

const ProfileComponent = () => {
  const [openSettings, setOpenSettings] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState("No about : Give Some Input");
  const [editValue, setEditValue] = useState(bio);
  const [updatedsuser, setupdateduser] = useState(null);
  const user = useSelector((state) => state.userinfo);

  useEffect(() => {
    const getabout = async () => {
      const { data } = await axios.post(getuser, { id: user.id });
      setupdateduser(data.user);
      if (data.user.about !== undefined) {
        setBio(data.user.about);
      }
    };
    getabout();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditValue(bio);
  };

  const handleSaveClick = async () => {
    setBio(editValue);
    setIsEditing(false);

    const { data } = await axios.patch(updateabout, {
      userid: user.id,
      about: editValue,
    });
    if (data.status) {
      toast.success("Successfully Updates");
    } else {
      toast.error("Error Occured");
    }
  };

  return (
    <>
      {updatedsuser == null ? (
        <></>
      ) : (
        <div className="h-full bg-gray-200 p-8">
          <div className="rounded-lg bg-white pb-8 shadow-xl">
            <div className="h-[250px] w-full">
              <img
                src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
                className="h-full w-full rounded-tl-lg rounded-tr-lg"
              />
            </div>
            <div className="-mt-20 flex flex-col items-center">
              <IconButton onClick={() => {}} sx={{ p: 0 }}>
                <Avatar
                  alt={user.firstname.toUpperCase()}
                  src="/static/images/avatar/2.jpg"
                  sx={{ width: 150, height: 150,fontSize: 60 }}
                />
              </IconButton>
              <div className="mt-2 flex items-center space-x-2">
                <p className="text-2xl">
                  {user.firstname.toUpperCase().slice(0, 1) +
                    user.firstname.toLowerCase().slice(1) +
                    " " +
                    user.lastname.toUpperCase().slice(0, 1) +
                    user.lastname.toLowerCase().slice(1)}
                </p>
                <span className="rounded-full bg-blue-500 p-1" title="Verified">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-2.5 w-2.5 text-gray-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="4"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </span>
              </div>
              <p className="text-gray-700">@{user.username}</p>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-4 border-t border-gray-100 px-12 pt-4 pb-6 text-sm">
              <div className="text-center">
                <p className="font-bold text-gray-700 text-xl">
                  {updatedsuser.followers.length}
                </p>
                <p className="text-gray-700 text-xl">Followers</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-gray-700 text-xl">
                  {updatedsuser.following.length}
                </p>
                <p className="text-gray-700 text-xl">Following</p>
              </div>
            </div>
            <div className="px-12 text-center text-sm">
              {isEditing ? (
                <div className="flex items-center space-x-2">
                  <textarea
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="w-full border rounded p-2"
                  />
                  <button
                    onClick={handleSaveClick}
                    className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleEditClick}
                    className="rounded bg-gray-200 p-2"
                    title="Edit"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.232 5.232l3.536 3.536M9 13.5L15.232 7.268a1 1 0 011.415 0l3.536 3.536a1 1 0 010 1.415L13.5 18H9v-4.5z"
                      ></path>
                    </svg>
                  </button>
                  <p className="text-gray-700 text-xl">{bio}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileComponent;
