import "./App.css";
import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Loginpage from "./pages/Loginpage";
import Homepage from "./pages/Homepage";
import Layout from "./layout/Layout";
import NotFound from "./pages/NotFound";
import StartPage from "./pages/candidates/StartPage";
import StartQuiz from "./pages/candidates/StartQuiz";
import SuccessPage from "./pages/candidates/SuccessPage";
import { useEffect, useState } from "react";
import { useUserContext } from "./context/Usercontext";
import AdminRoute from "./routing/AdminRoute";
import LoadingLogo from "./components/loading/LoadingLogo";
import QuizMissing from "./pages/QuizMissing";
import { getWebSocket } from "./context/websocket";
import QuizCompleted from "./pages/QuizCompleted";
import LoggedoutCandidate from "./pages/candidates/LoggedoutCandidate";
import {ADMIN} from './libs/user_role'
import createHttpRequest from "./api/httpRequest";
import { ROUTE_GET_USER } from "./libs/routes";
import { GET_ACTION } from "./libs/routes_actions";
import { ERROR_JWT_EXPIRED } from "./libs/error_messsge";
import { X_TOKEN } from "./libs/constants";
import RegisterPage from "./pages/RegisterPage";
import Welcome from "./pages/Welcome";


function App() {
  const { user, setUser } = useUserContext();
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const initAOS = () => {
        AOS.init({
          offset: 100,
          duration: 1500,
          easing: 'ease-in-out',
        });
      };
        initAOS()
  })

  const [token, setToken] = useState(localStorage.getItem('x-token'))


  useEffect(() => {
    const ws = getWebSocket()
    if(ws.readyState === WebSocket.OPEN){
      ws.send(JSON.stringify({type: 'init', data: {id: user?._id, role: user?.role}}))
    }
  });
  

  useEffect(() => {
    const token = localStorage.getItem("x-token");
    const getUser = async () => {
      try {
        setLoading(true);
        const {data} = await createHttpRequest(GET_ACTION, ROUTE_GET_USER, null, token)
        if(data.error=='server'){
          localStorage.removeItem(X_TOKEN);
          window.location.href = "/";
        }
        if(data.role===ADMIN){
          setUser(data);
          setToken(token);
        }
        setLoading(false);
      } catch (error) {
        if (error?.response?.data?.message === ERROR_JWT_EXPIRED) {
          localStorage.removeItem(X_TOKEN);
          window.location.href = "/";
        }
        setLoading(false);
      }
    };
    if (token) {
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
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/register" element={<RegisterPage />} />
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
