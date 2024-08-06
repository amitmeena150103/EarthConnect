import React from "react";
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
import { unjoinintiative } from "../../route";
import { toast } from "react-toastify";

export function Joindedcard({ obj, change, setchange, userid }) {
  const clicked = async () => {
    const { data } = await axios.post(unjoinintiative, {
      userid,
      initativeid: obj._id,
    });
    if(data.status){
      toast.success("Successfully UnJoined")
      setchange(!change)
    }else{
      toast.error("Error Occured")
    }
  };

  return (
    <Card className="mt-10 bg-gray-200 w-96 md:80">
      <CardHeader color="blue-gray" className="">
        <img
          src={`data:image/jpg;base64,${obj.image}`}
          alt="card-image"
          className="w-full h-52 object-cover"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {obj.title}
        </Typography>
        <Typography>{obj.description}</Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button onClick={clicked} className="bg-red-500 text-sm">
          Unjoin Campaing
        </Button>
      </CardFooter>
    </Card>
  );
}

Joindedcard.propTypes = {};
