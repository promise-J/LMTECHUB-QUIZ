import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loginpage from "./pages/Loginpage";
import Homepage from "./pages/Homepage";
import Layout from "./layout/Layout";
import Quizes from "./pages/Quizes";
import CreateQuiz from "./pages/CreateQuiz";
import Feedback from "./pages/Feedback";
import Singlequiz from "./pages/Singlequiz";
import CreateQuestion from "./pages/CreateQuestion";
import NotFound from "./pages/NotFound";
import ViewQuestions from "./pages/ViewQuestions";
import EditQuestion from "./pages/EditQuestion";
import StartPage from "./pages/candidates/startPage";
import StartQuiz from "./pages/candidates/StartQuiz";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="getting-started" element={<StartPage />} />
        <Route path="start-quiz" element={<StartQuiz />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="createquiz" element={<CreateQuiz />} />
          <Route path="viewquiz" element={<Quizes />} />
          <Route path="sendfeedback" element={<Feedback />} />
          <Route path="viewquiz/:id" element={<Singlequiz />} />
          <Route path="createQuestion/:id" element={<CreateQuestion />} />
          <Route path="editQuestion/:id" element={<EditQuestion />} />
          <Route path="viewQuestions/:id" element={<ViewQuestions />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
