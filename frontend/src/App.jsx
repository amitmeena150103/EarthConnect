import "./App.css";
import ResponsiveAppBar from "./components/responsiveAppBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/signup";
import SignInSide from "./pages/signin";
import Initative from "./pages/initative";
import Joinedintative from "./pages/joinedintative";
import Manageinitative from "./pages/manageinitative";
import Post from "./pages/post";
import CreateInitative from "./pages/createinitative";
import Owninitative from "./pages/owninitative";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileComponent from "./pages/profile";
 
function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <ResponsiveAppBar />
          <Routes>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/signin" element={<SignInSide />}></Route>
            <Route path="/allintiative" element={<Initative />}></Route>
            <Route path="/joinedintiative" element={<Joinedintative />}></Route>
            <Route path="/manage" element={<Manageinitative />}></Route>
            <Route path="/post" element={<Post />}></Route>
            <Route path="/create" element={<Post />}></Route>
            <Route path="/" element={<Post />}></Route>
            <Route path="/createintiative" element={<CreateInitative />}></Route>
            <Route path="/ownintiative" element={<Owninitative />}></Route>
            <Route path="/profile" element={<ProfileComponent />}></Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
