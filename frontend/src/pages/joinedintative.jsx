import { useEffect, useState } from "react";
import { Joindedcard } from "../components/joindedcard";
import Loading from "../components/loading";
import axios from "axios";
import { checktoken, joinedIntiative } from "../../route";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoading, setUser } from "../features/userinfo/userinfoSlice";
import propTypes from "prop-types";
const Joinedintative = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const validatetoken = async () => {
      const token = localStorage.getItem("authorization");
      if (!token) {
        navigate("/signin");
        return;
      }
      const { data } = await axios.post(
        checktoken,
        {},
        { headers: { authorization: token } }
      );
      if (!data.status) {
        navigate("/signin");
        localStorage.removeItem("authorization");
        return;
      } else {
        const userdata = data.decoded;
        dispatch(setLoading(true));
        dispatch(setUser(userdata));
        dispatch(setLoading(false));
      }
    };
    validatetoken();
  }, [dispatch]);

  const user = useSelector((state) => state.userinfo);
  return (
    <>
      <div className="flex justify-center font-medium text-3xl  ">
        JOINED INITATIVE
      </div>
      <div className="">
        <div className="  grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3">
          <Alljoinedcard user={user} />
        </div>
      </div>
    </>
  );
};

const Alljoinedcard = ({ user }) => {
  const [joined, setjoined] = useState(null);
  const [change, setchange] = useState(false);

  useEffect(() => {
    const getjoinedposts = async () => {
      const { data } = await axios.post(joinedIntiative, {
        userid: user.id,
      });
      setjoined(data.intitave);
    };
    getjoinedposts();
  }, [change,user]);

  return (
    <>
      {joined == null ? (
        <Loading />
      ) : (
        <>
          {joined.map((obj, index) => {
            return (
              <Joindedcard
                key={index}
                change={change}
                setchange={setchange}
                obj={obj}
                userid={user.id}
              />
            );
          })}
        </>
      )}
    </>
  );
};

Joinedintative.propTypes = {};
Alljoinedcard.propTypes = {
  user: propTypes.any,
};

export default Joinedintative;
