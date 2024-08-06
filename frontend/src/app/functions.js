import axios from "axios";
import { useNavigate } from "react-router-dom";
import { checktoken } from "../../route";


const useValidtoken = async () => {
    const navigate = useNavigate();
  const token = localStorage.getItem("authorization");
  if (!token) {
    navigate("/signin");
    return;
  }
  const { data } = await axios.post(
    checktoken,
    {},
    { headers: { Authorization: token } }
  );
  if (!data.status) {
    navigate("/signin");
    return;
  }
};

export { useValidtoken };
