import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import CreateQuiz from "../pages/CreateQuiz";
import QuizReport from "../pages/QuizReport";
import SingleReport from "../pages/SingleReport";
import Quizes from "../pages/Quizes";
import Feedback from "../pages/Feedback";
import Singlequiz from "../pages/Singlequiz";
import CreateQuestion from "../pages/CreateQuestion";
import EditQuestion from "../pages/EditQuestion";
import ViewQuestions from "../pages/ViewQuestions";
import NotFound from "../pages/NotFound";
import { useUserContext } from "../context/Usercontext";
import MonitorQuiz from "../pages/monitorQuiz";
import LiveMonitor from "../pages/LiveMonitor";

const AdminRoute = ({ component: Component, ...rest }) => {
  const {user} = useUserContext()
  useEffect(() => {
    const token = localStorage.getItem('x-token')
    if (!token || user?.role !== 'admin') {
      // navigate("/");
    }
  });
  return (
    <Routes>
      <Route path="createquiz" element={<CreateQuiz />} />
      <Route path="monitorquiz" element={<MonitorQuiz />} />
      <Route path="quizReports" element={<QuizReport />} />
      <Route path="quizReports/:id" element={<SingleReport />} />
      <Route path="viewquiz" element={<Quizes />} />
      <Route path="sendfeedback" element={<Feedback />} />
      <Route path="viewquiz/:id" element={<Singlequiz />} />
      <Route path="createQuestion/:id" element={<CreateQuestion />} />
      <Route path="editQuestion/:id" element={<EditQuestion />} />
      <Route path="viewQuestions/:id" element={<ViewQuestions />} />
      <Route path="live-monitor/:responseId" element={<LiveMonitor />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AdminRoute;
