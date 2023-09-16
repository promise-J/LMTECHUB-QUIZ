import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserContext } from "../../context/Usercontext";
import LoadingLogo from "../../components/loading/LoadingLogo";
import { initializeWebSocket } from "../../context/websocket";

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

  const { email, username, password } = data;

  useEffect(() => {
    initializeWebSocket();
  }, []);

  useEffect(() => {
    const quizId = params.search.split("=")[1];
    const getQuiz = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:5000/api/quiz/${quizId}`
        );
        setQuiz(data);
        const { data: daata } = await axios.get(
          `http://localhost:5000/api/quiz/questions/${quizId}`
        );
        setQuestions(daata);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
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
        setLoading(true);
        const res = await axios.post("http://localhost:5000/api/register", {
          email,
          password,
          username,
        });
        toast.success("Registered successfully! Please login", { delay: 5 });
        setAuthState(!authState);
        setData(initialState);
        setLoading(false);
      } else {
        if(!password || !email){
          return toast.error('Please enter your credentials')
        }
        setLoading(true);
        if(!quiz.candidates.includes(email)){
          return navigate('/not-invited')
        }
        if(quiz.completedCandidates.includes(email)){
          return navigate('/quiz-completed')
        }
        const res = await axios.post("http://localhost:5000/api/login", {
          email,
          password,
        });
        localStorage.setItem("x-token", res.data.token);
        toast.success("Log in successful!", { delay: 5 });
        setUser(res.data.user);
        res.data.user && sendSocketMessage(ws, 'init', {id: res.data.user._id, role: res.data.user.role})
        setLoading(false);
        setData(initialState);
      }
    } catch (error) {
      setLoading(false);
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
    navigate("/");
  };

  if (loading) {
    return <LoadingLogo />;
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
              onClick={() =>
                navigate("/start-quiz", { state: { questions, quiz, user } })
              }
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
                className="border py-1 px-4 rounded-lg"
              >
                Login
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
