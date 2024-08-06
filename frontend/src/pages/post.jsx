import  { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import Postcard from "../components/postcard";
import Sidebar from "../components/sidebar";
import CreatePost from "../components/createpost";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { allPost, checktoken } from "../../route";
import { useDispatch } from "react-redux";
import { setUser, setLoading } from "../features/userinfo/userinfoSlice";
import Loading from "../components/loading";
const Post = () => {
  const [choose, setchoose] = useState(0);
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
    <div className="grid grid-cols-12 bg-gray-100 ">
      <div className="col-span-3">
        <Sidebar setpage={setchoose} />
      </div>
      {choose == 1 ? (
        <div className="col-span-8 flex justify-center">
          <CreatePost setpage={setchoose} />
        </div>
      ) : (
        <div className="col-span-9 flex justify-center overflow-scroll no-scrollbar">
          <div className=" h-screen ">
            <PostList />
          </div>
        </div>
      )}
    </div>
  );
};

const PostList = () => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liked,setliked] = useState(false);
  useEffect(() => {
    const getPost = async ()=>{
      const {data} = await axios.get(allPost)
      setPost(data.post)
      setLoading(false);
    }

    getPost();

  }, [liked]);
  return (
    <>
      {loading == true ? (
        <Loading />
      ) : (
        <>
          {post.map((obj, index) => {
            return <Postcard key={index} obj = {obj} like={liked} setlike={setliked} />;
          })}
        </>
      )}
    </>
  );
};

Post.propTypes = {};

export default Post;
