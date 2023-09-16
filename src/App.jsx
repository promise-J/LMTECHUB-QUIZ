import "./App.css";
import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import Loginpage from "./pages/Loginpage";
import Homepage from "./pages/Homepage";
import Layout from "./layout/Layout";
import NotFound from "./pages/NotFound";
import StartPage from "./pages/candidates/StartPage";
import StartQuiz from "./pages/candidates/StartQuiz";
import SuccessPage from "./pages/candidates/SuccessPage";
import { useEffect, useState } from "react";
import { useUserContext } from "./context/Usercontext";
import axios from "axios";
import AdminRoute from "./routing/AdminRoute";
import LoadingLogo from "./components/loading/LoadingLogo";
import QuizMissing from "./pages/QuizMissing";
import { getWebSocket } from "./context/websocket";
import LastRouteAccess from "./routing/LastRouteAccess";
import QuizCompleted from "./pages/QuizCompleted";
import LoggedoutCandidate from "./pages/candidates/LoggedoutCandidate";

function App() {
  const { user, setUser } = useUserContext();
  const [loading, setLoading] = useState(false);
  const URL_LINK = 'http://localhost:5173'


  // useEffect(() => {
  //   function initSocket() {
  //     const socket = new WebSocket("ws://localhost:5000");
  //     // setWebSocket(socket);
  //     socket.onopen = () => {
  //       socket.send(JSON.stringify({ type: 'init', data: {id: user?._id, role: user?.role}}));
  //     };

  //     return () => {
  //       socket.onclose = () => {
  //         // setWebSocket(null);
  //       };
  //     };
  //   }
  //   user && initSocket()
  // }, []);

  useEffect(() => {
    const ws = getWebSocket()
    if(ws.readyState === WebSocket.OPEN){
      ws.send(JSON.stringify({type: 'init', data: {id: user?._id, role: user?.role}}))
    }
  });
  
  
  // useEffect(()=>{
  //   if(user){
  //     let pathname = localStorage.getItem('lastPathname')
  //     pathname = (pathname===undefined || !pathname) ? '/' : pathname
  //     console.log(URL_LINK+pathname)
  //     window.location.href = URL_LINK + pathname
  //   }
  // },[localStorage.getItem('lastPathname'), localStorage.getItem('x-token')])

  useEffect(() => {
    const token = localStorage.getItem("x-token");
    if (token) {
      const getUser = async () => {
        try {
          setLoading(true);
          const { data } = await axios.get("http://localhost:5000/api/user", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(data);
          // navigate(localStorage.getItem('lastPathname'))
          setToken(token);
          setLoading(false);
        } catch (error) {
          if (error?.response?.data?.message === "jwt expired") {
            localStorage.removeItem("x-token");
            window.location.href = "/";
          }
          // console.log(error?.response?.data.message, "the error");
          setLoading(false);
        }
      };
      getUser();

      return () => {
        setUser(null);
      };
    }
  }, []);

  

  if (loading) {
    return <LoadingLogo />;
  }

  return (
    <Router>
        <LastRouteAccess />
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="getting-started" element={<StartPage />} />
        <Route path="start-quiz" element={<StartQuiz />} />
        <Route path="not-invited" element={<QuizMissing />} />
        <Route path="quiz-completed" element={<QuizCompleted />} />
        <Route path="quiz/success" element={<SuccessPage />} />
        <Route path="quiz/ended" element={<LoggedoutCandidate />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Homepage />} />
          {/* <AdminRoute index component={<Homepage />} /> */}
          {/* <Route index element={<NotFound />} /> */}
          <Route path="*" element={<AdminRoute />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
