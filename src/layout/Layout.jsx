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
      return navigate('/quiz/ended')
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
    toast.success("Logged out successfully");
  };


  return (
    <div>
      <SingleQuizModal paramData={params.id ? params : null} />
      <CreateQuestionModal />
      <ViewQuestionsModal />
      <Navbar />
      {/* <NavbarModal /> */}
      <div className="mt-5 relative flex h-[100vh]">
        {/*  */}
        <div
          className={`bg-black h-full w-full absolute top-0 left-0 z-3 ${
            navbarHook.isOpen ? "md:w-1/4" : "-translate-x-full"
          }`}
        >
          <img
            src="/images.png"
            alt=""
            className="h-[32px] w-[32px] mt-5 ms-4 me-4"
          />
          <ul className="flex flex-column gap-3 py-3 text-xl">
            <li>
              <Link
                onClick={handleClose}
                className="link text-white flex py-3 item-center gap-2"
                to="/dashboard"
              >
                <AiOutlineHome /> <span className="me-5">Home</span>
              </Link>
            </li>

            <li>
              <Link
                onClick={handleClose}
                className="link text-white flex py-3 item-center gap-2"
                to="/dashboard/createquiz"
              >
                <VscGitPullRequestCreate />
                <span className="me-5">Create Quiz</span>
              </Link>
            </li>
            <li>
              <Link
                onClick={handleClose}
                className="link text-white flex py-3 item-center gap-2"
                to="/dashboard/sendfeedback"
              >
                <VscGitPullRequestCreate />
                <span className="me-5">Send Feedback</span>
              </Link>
            </li>
            <li
              onClick={handleLogout}
              className="link text-white flex py-3 item-center gap-2 cursor-pointer"
            >
              {/* <Link onClick={handleLogout} className="link text-white flex py-3 item-center gap-2" to='/'> */}
              <AiOutlineLogout />
              <span className="me-5">Logout</span>
              {/* </Link> */}
            </li>
          </ul>
        </div>
        <div className="md:p-4 p-3 flex-1">
          <h1 className="lg:text-6xl md:text-5xl text-3xl my-3 mx-2 font-semibold">
            Welcome! {user?.username}
          </h1>
          {navbarHook.isOpen && (
            <div
              onClick={navbarHook.onClose}
              className="absolute top-0 left-0 h-full w-full bg-gray-100"
            ></div>
          )}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
