// import React from "react";
import PropTypes from "prop-types";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import axios from "axios";
import { deleteinitative } from "../../route";

export function Ownintitaivecard({ obj, deleteobj, val }) {
  const clicked = async () => {
    console.log("clicked");
    const { data } = await axios.delete(`${deleteinitative}/${obj._id}`);
    if (data.status) {
      deleteobj(!val);
    }
  };

  return (
    <Card className="mt-10 bg-gray-200 w-96 md:80">
      <CardHeader color="blue-gray" className=" h-full">
        <img
          src={`data:image/jpg;base64,${obj.image}`}
          alt="card-image"
          className="w-full h-80 object-cover"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2 uppercase">
          {obj.title}
        </Typography>
        <Typography>{obj.description}</Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button color="red" onClick={clicked}>
          Delete Campaing
        </Button>
      </CardFooter>
    </Card>
  );
}

Ownintitaivecard.propTypes = {
  obj: PropTypes.object,
  deleteobj: PropTypes.any,
  val: PropTypes.any,
};
