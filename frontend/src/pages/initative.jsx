import  { useEffect, useState } from "react";
import { CardDefault } from "../components/card";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {  checktoken, getunJoinedInitative } from "../../route";
import Loading from "../components/loading";
import { useNavigate } from "react-router-dom";
import { setLoading, setUser } from "../features/userinfo/userinfoSlice";

const Initative = () => {
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



  return (
    <>
      <div className="flex justify-center font-medium text-3xl  ">
        ALL INITATIVE
      </div>
      <div className="">
        <div className="  grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3">
          <ShowInitative />
        </div>
      </div>
    </>
  );
};

const ShowInitative = () => {
  const [allinitative, setinitative] = useState(null);
  const [joined, setjoined] = useState(false);
  const userInfo = useSelector((state) => state.userinfo);

  useEffect(() => {
    const loadInitative = async () => {
      const { data } = await axios.post(getunJoinedInitative, {
        userid: userInfo.id,
      });
      setinitative(data.initative);
    };
    loadInitative();
  }, [joined]);

  return (
    <>
      {allinitative == null ? (
        <Loading />
      ) : (
        <>
          {allinitative.map((obj, index) => {
            return (
              <CardDefault
                key={index}
                obj={obj}
                join={joined}
                set={setjoined}
              />
            );
          })}
        </>
      )}
    </>
  );
};

Initative.propTypes = {};

export default Initative;
