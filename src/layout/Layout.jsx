import React, { useEffect } from "react";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
// import useSingleQuiz from "../hooks/useSingleQuiz";
import SingleQuizModal from "../components/modal/SingleQuizModal";
import CreateQuestionModal from "../components/modal/CreateQuestionModal";
import ViewQuestionsModal from "../components/modal/ViewQuestionsModal";
import Navbar from "../components/Navbar";
import { useUserContext } from "../context/Usercontext";
import useNavbar from "../hooks/useNavbar";
import { AiOutlineHome, AiOutlineLogout } from "react-icons/ai";
import { VscGitPullRequestCreate } from "react-icons/vsc";
import { toast } from "react-toastify";
import sendSocketMessage from "../context/sendSocketMessage";
import { getWebSocket, initializeWebSocket } from "../context/websocket";
import Header from "../components/Header";

const Layout = () => {
  const navigate = useNavigate();
  const {user} = useUserContext()
  const location = useLocation()

  const params = useParams();
  const navbarHook = useNavbar();
  const { setUser } = useUserContext();

  useEffect(()=>{
    initializeWebSocket()
  },[])

  const token = localStorage.getItem('x-token')
  useEffect(() => {
    if(!token){
      return navigate('/')
    }
  }, [token, user]);


  const handleClose = () => {
    navbarHook.onClose();
  };

  const handleLogout = () => {
    const ws = getWebSocket()
    handleClose();
    setUser(null);
    user && sendSocketMessage(ws, 'logout', {id: user._id})
    localStorage.removeItem("x-token");
    navigate("/");
    toast.success("Logged out successfully", {autoClose: 2000});
  };


  return (
    <div>
      <SingleQuizModal paramData={params.id ? params : null} />
      <CreateQuestionModal />
      <ViewQuestionsModal />
      {/* <Navbar /> */}
      <Header />
      {/* <NavbarModal /> */}
      <div className="relative flex h-[100vh]">
        {/*  */}
        <div className="md:p-4 p-3 flex-1">
          <h1 className="lg:text-5xl md:text-5xl text-3xl my-3 mx-2 font-semibold mb-2">
            Welcome! {user?.username}
          </h1> 
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
