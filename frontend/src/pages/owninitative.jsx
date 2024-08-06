import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { CardDefault } from "../components/card";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { checktoken, getIntitative } from "../../route";
import Loading from "../components/loading";
import { Ownintitaivecard } from "../components/ownintitaivecard";
import { useNavigate } from "react-router-dom";
import { setLoading, setUser } from "../features/userinfo/userinfoSlice";

const Owninitative = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Checking Token
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
      <div className="flex justify-center uppercase font-medium text-3xl  ">
        Created Initative
      </div>
      <div className="">
        <div className=" grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3">
          <ShowIntitaive />
        </div>
      </div>
    </>
  );
};

const ShowIntitaive = () => {
  const [initative, setinitative] = useState(null);
  const userInfo = useSelector((state) => state.userinfo);
  const [deleted, setdelete] = useState(false);

  useEffect(() => {
    const usersintiative = async () => {
      const { data } = await axios.get(`${getIntitative}/${userInfo.id}`);
      setinitative(data.initative);
    };
    usersintiative();
  }, [deleted]);

  return (
    <>
      {/* <Ownintitaivecard/> */}
      {initative == null ? (
        <Loading />
      ) : (
        <>
          {initative.map((obj, index) => {
            return (
              <Ownintitaivecard
                key={index}
                obj={obj}
                deleteobj={setdelete}
                val={deleted}
              />
            );
          })}
        </>
      )}
    </>
  );
};

Owninitative.propTypes = {};

export default Owninitative;
