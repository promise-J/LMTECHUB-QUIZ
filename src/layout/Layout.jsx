import React from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
// import useSingleQuiz from "../hooks/useSingleQuiz";
import SingleQuizModal from "../components/modal/SingleQuizModal";
import CreateQuestionModal from "../components/modal/CreateQuestionModal";
import ViewQuestionsModal from "../components/modal/ViewQuestionsModal";

const Layout = () => {

  const params = useParams()

  return (
      <div>
      <SingleQuizModal paramData={params.id ? params : null} />
      <CreateQuestionModal />
      <ViewQuestionsModal />
      <div className="md:p-3 p-3">
        <div className="md:p-4 p-1">
          <h1 className="lg:text-6xl md:text-5xl text-3xl my-3 mx-2 font-semibold">
            Welcome! Promise
          </h1>
          <div className="ms-2 md:text-lg text-md">
            <NavLink
              style={({ isActive }) => ({
                color: isActive && "purple",
                textDecoration: isActive && "underline",
              })}
              to="/dashboard"
            >
              Home
            </NavLink>{" "}
            | {"  "}
            <NavLink
              style={({ isActive }) => ({
                color: isActive && "purple",
                textDecoration: isActive && "underline",
              })}
              to="/dashboard/createquiz"
            >
              Create Quiz
            </NavLink>{" "}
            | {"  "}
            <NavLink
              style={({ isActive }) => ({
                color: isActive && "purple",
                textDecoration: isActive && "underline",
              })}
              to="/dashboard/viewquiz"
            >
              View Quiz
            </NavLink>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
