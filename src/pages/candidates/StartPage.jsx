import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserContext } from "../../context/Usercontext";
import { initializeWebSocket } from "../../context/websocket";
import baseUrl from '../../api/baseUrl'
import {GET_ACTION, POST_ACTION, PUT_ACTION} from '../../libs/routes_actions'
import { ROUTE_QUIZ, ROUTE_LOGIN, ROUTE_QUIZ_QUESTIONS, ROUTE_REGISTER, ROUTE_RESPONSE_START } from "../../libs/routes";
import createHttpRequest from '../../api/httpRequest'
import { X_TOKEN } from "../../libs/constants";

const initialState = {
  username: "",
  email: "",
  password: "",
};



const StartPage = () => {
  const navigate = useNavigate();
  const params = useLocation();
  // const [user, setUser] = useState(null)
  const [quiz, setQuiz] = useState(null);
  const [data, setData] = useState(initialState);
  const [questions, setQuestions] = useState([]);
  const [authState, setAuthState] = useState(false);
  const { setUser, user } = useUserContext();
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  const { email, username, password } = data;

  useEffect(() => {
    initializeWebSocket();
  }, []);


  useEffect(() => {
    const token = localStorage.getItem(X_TOKEN)
    const quizId = params.search.split("=")[1];
    const getQuiz = async () => {
      try {
        setLoading(true);
       const {data} = await createHttpRequest(GET_ACTION, `${ROUTE_QUIZ}/${quizId}`)
       console.log(data,'the data')
       setQuiz(data);
       const res = await createHttpRequest(GET_ACTION, `${ROUTE_QUIZ_QUESTIONS}/${quizId}`)
         setQuestions(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error,'the error');
      }
    };
    if (quizId) {
      getQuiz();
    } else {
      console.log("no thing dey");
      // navigate('/not-invited')
    }
  }, []);

  const handleAuth = async () => {
    try {
      if (authState) {
        setAuthLoading(true);
        const res = await createHttpRequest(POST_ACTION, ROUTE_REGISTER, {email: email.toLowerCase(), password, username})
        toast.success("Registered successfully! Please login", {autoClose: 2000});
        setAuthState(!authState);
        setData(initialState);
        setAuthLoading(false);
      } else {
        if(email && !quiz.candidates.includes(email.toLowerCase())){
          return navigate('/not-invited')
        }
        if(!password || !email){
          return toast.error('Please enter your credentials')
        }
        setAuthLoading(true);
        if(quiz.completedCandidates.includes(email.toLowerCase())){
          return navigate('/quiz-completed')
        }
        const {data} = await createHttpRequest(POST_ACTION, ROUTE_LOGIN, {email: email.toLowerCase(), password})
        if(data.success){

          localStorage.setItem("x-token", data.token);
          setUser(data.user);
          res.user && sendSocketMessage(ws, 'init', {id: data.user._id, role: data.user.role})
          setAuthLoading(false);
          setData(initialState);
        }else{
          setAuthLoading(false)
          return toast.error(data?.message || 'Something went wrong')
        }
      }
    } catch (error) {
      setAuthLoading(false);
      error?.response?.data.message && toast.error(error?.response?.data.message, { delay: 5 });
    }
  };

  const handleAuthState = () => {
    setAuthState((authState) => !authState);
    setData(initialState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const logoutAndBack = () => {
    localStorage.removeItem("x-token");
    setUser(null)
    navigate("/quiz/ended");
  };

  const startQuiz = async()=>{
    const token = localStorage.getItem(X_TOKEN)
    try {
      const {data} = await createHttpRequest(PUT_ACTION, `${ROUTE_RESPONSE_START}/${quiz._id}`, {email: user.email.toLowerCase()}, token)
      if(!data.success){
        localStorage.removeItem("x-token");
        setUser(null)
        return navigate('/not-invited')
      }
      
      navigate("/start-quiz", { state: { questions, quiz, user } })
      toast.success(data.message, {autoClose: 2000})
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="py-4 px-2">
      <div className="py-2 px-4 flex justify-between">
        <button
          onClick={logoutAndBack}
          className="border absolute py-1 px-2 rounded-lg"
        >
          Exit
        </button>
        <div className="mt-5">
          {user && <h1 className="text-6xl">Welcome {user?.username},</h1>}
          <h4 className="font-bold text-4xl text-muted my-3">
            Quiz: {quiz?.title}
          </h4>
        </div>
        <div className="px-3 flex flex-column justify-center">
          <h3>Questions: </h3>
          <p className="text-2xl">{questions?.length}</p>
        </div>
        <div className="px-3 flex flex-column justify-center">
          <h3>Duration: </h3>
          <p className="text-2xl">{quiz?.duration} mins</p>
        </div>
      </div>
      <div className="p-1 flex justify-center items-center">
        <div className="w-[50%] rounded-2xl p-3 mt-3 shadow-md">
          <h3 className="font-semibold text-2xl my-2">Instructions</h3>
          <ul className="flex flex-column gap-1 list-disc ms-2">
            <li>Ensure you are logged in</li>
            <li>Do not refresh this page for any reason</li>
            <li>Make sure your internet connection is stable</li>
            <li>Malpractice is evil! We don't endorse it</li>
          </ul>
          {user && (
            <button
              onClick={startQuiz}
              className="bg-blue-300 mt-4 py-1 rounded px-5"
            >
              Start
            </button>
          )}
        </div>
      </div>
      {!user && (
        <div className="bg-rewd-300 flex py-4 justify-center">
          <div className="bg-bluew-400 p-3 flex items-center flex-column gap-4 w-[50vh]">
            {authState ? (
              <>
                <input
                  type="text"
                  onChange={handleChange}
                  name="username"
                  value={username}
                  className="border rounded-lg w-full p-2"
                  placeholder="Username"
                />
                <input
                  type="email"
                  onChange={handleChange}
                  name="email"
                  value={email}
                  className="border rounded-lg w-full p-2"
                  placeholder="Email"
                />
                <input
                  type="password"
                  onChange={handleChange}
                  name="password"
                  value={password}
                  className="border rounded-lg w-full p-2"
                  placeholder="Password"
                />
              </>
            ) : (
              <>
                <input
                  type="email"
                  onChange={handleChange}
                  name="email"
                  value={email}
                  className="border rounded-lg w-full p-2"
                  placeholder="Email"
                />
                <input
                  type="password"
                  value={password}
                  name="password"
                  onChange={handleChange}
                  className="border rounded-lg w-full p-2"
                  placeholder="Password"
                />
              </>
            )}
            {authState ? (
              <button
                onClick={handleAuth}
                className="border py-1 px-4 rounded-lg"
              >
                Sign up
              </button>
            ) : (
              <button
                onClick={handleAuth}
                className={`border py-1 px-4 rounded-lg ${authLoading && 'bg-green-500 text-white'}`}
              >
                {authLoading ? 'Loading...' : 'Login'}
              </button>
            )}
            <p
              onClick={handleAuthState}
              className="text-red-400 cursor-pointer"
            >
              {!authState
                ? "Not registered? Sign up"
                : "Already registered? Login"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartPage;
