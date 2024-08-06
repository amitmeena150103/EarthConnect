import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { UserCircleIcon, InboxIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ setpage }) {
  const [open, setOpen] = React.useState(0);
  const navigate = useNavigate();
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card className="h-[calc(100vh-2rem)] w-full  max-w-[5rem] md:max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray" className="hidden md:block">
          Sidebar
        </Typography>
      </div>
      <List>
        <div className="flex ">
          <ListItemPrefix
            onClick={() => {
              setpage(1);
            }}
          >
            <InboxIcon className="h-10 w-10 md:h-7 md:w-7  hover:cursor-pointer" />
          </ListItemPrefix>
          <ListItem
            onClick={() => {
              setpage(1);
            }}
            className="text-lg hidden md:block"
          >
            Create Post
            {/* <ListItemSuffix >
            <Chip
              value="14"
              size="sm"
              variant="ghost"
              color="blue-gray"
              className="rounded-full"
            />
          </ListItemSuffix> */}
          </ListItem>
        </div>
        <div className="flex py-5">
          <ListItemPrefix
            onClick={() => {
              navigate("/profile");
            }}
          >
            <UserCircleIcon className="h-10 w-10 md:h-7 md:w-7 hover:cursor-pointer" />
          </ListItemPrefix>
          <ListItem
            onClick={() => {
              navigate("/profile");
            }}
            className="text-lg hidden md:block "
          >
            Profile
          </ListItem>
        </div>
        {/* <ListItem className="text-lg">
          <ListItemPrefix>
            <PowerIcon className="h-7 w-7" />
          </ListItemPrefix>
          Log Out
        </ListItem> */}
      </List>
    </Card>
  );
}
