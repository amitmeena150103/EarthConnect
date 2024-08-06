import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import axios from "axios";
import { joinintiative } from "../../route";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export function CardDefault({ obj, join, set }) {
  const user = useSelector((state) => state.userinfo);

  const clicked = async () => {
    const { data } = await axios.post(joinintiative, {
      userid: user.id,
      initativeid: obj._id,
    });
    if (data.status) {
      toast.success("Successfully Joined")
      set(!join);
    }else{
      toast.error("Not able To Joined")

    }
   
  };

  return (
    <Card className="mt-10 bg-gray-200 w-96 md:80">
      <CardHeader color="blue-gray" className="">
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
      <CardFooter className="pt-0 space-x-12">
        <Button onClick={clicked}>Join Campaing</Button>
      </CardFooter>
    </Card>
  );
}
