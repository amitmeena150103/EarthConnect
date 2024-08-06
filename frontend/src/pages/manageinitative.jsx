import  { useEffect } from "react";
// import PropTypes from "prop-types";
import initaitve from "../assets/createintative.webp";
import created from "../assets/created.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { checktoken } from "../../route";
import { setLoading, setUser } from "../features/userinfo/userinfoSlice";
const route = ["/createintiative", "/ownintiative"];

const Manageinitative = () => {
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
    <section className="pb-12 pt-10 dark:bg-dark  ">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-12 max-w-[510px] text-center ">
              <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-dark dark:text-white sm:text-4xl md:text-[40px]">
                Manage Your Intaitve
              </h2>
            </div>
          </div>
        </div>

        <div className=" md:flex md:justify-center ">
          <ServiceCard
            index={0}
            title="Create own Intative"
            details="Ready to make a difference? Create initiatives, inspire change! "
            img={initaitve}
          />
          <ServiceCard
            index={1}
            title="Created Intative"
            details="Your Initiative: Take Charge for Change!"
            img={created}
          />
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ title, details, img, index }) => {
  const navigate = useNavigate();

  const clicked = () => {
    navigate(route[index]);
  };

  return (
    <>
      <div className="w-full px-4 md:w-1/3 lg:w-1/3">
        <div
          onClick={clicked}
          className="mb-9 bg-gray-200 h-full rounded-[20px]  p-10 shadow-2 hover:shadow-lg hover:bg-cyan-100 hover:cursor-pointer dark:bg-dark-2 md:px-7 xl:px-10"
        >
          <div>
            <img className="w-96 h-56 " src={img}></img>
          </div>
          <h4 className="mb-[14px] pt-6 justify-items-center text-2xl font-semibold text-dark dark:text-white">
            {title}
          </h4>
          <p className="text-body-color dark:text-dark-6">{details}</p>
        </div>
      </div>
    </>
  );
};

export default Manageinitative;
