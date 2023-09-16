import React from "react";
import { CiViewList } from "react-icons/ci";
import { VscFeedback, VscGitPullRequestCreate } from "react-icons/vsc";
import {Link} from 'react-router-dom'

const QuizReport = () => {
  return (
    <div>
        <h5 className="md:text-3xl text-xl md:text-center my-3">Manage your Quiz results</h5>
        <div className="flex-1 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <Link to={`/dashboard/quizReports/${3}`}>
          <div className="rounded-xl shadow radius-200 p-3 flex justify-center flex-col gap-3 hover:scale-105 transition duration-150 ease-in cursor-pointer">
            <h1 className="bold text-xl">Software Engineering</h1>
            <p className="text-zinc-400">
              Completed: 0
            </p>
            <p className="text-zinc-400">
              In progress: 2
            </p>
            <p className="text-zinc-400">
              Not Completed: 5
            </p>
            
          </div>
          </Link>

          <Link to={`/dashboard/quizReports/${3}`}>
          <div className="rounded-xl shadow radius-200 p-3 flex justify-center flex-col gap-3 hover:scale-105 transition duration-150 ease-in cursor-pointer">
            <h1 className="bold text-xl">Mechanical Engineering</h1>
            <p className="text-zinc-400">
              Completed: 0
            </p>
            <p className="text-zinc-400">
              In progress: 2
            </p>
            <p className="text-zinc-400">
              Not Completed: 5
            </p>
            
          </div>
          </Link>

          <Link to={`/dashboard/quizReports/${3}`}>
          <div className="rounded-xl shadow radius-200 p-3 flex justify-center flex-col gap-3 hover:scale-105 transition duration-150 ease-in cursor-pointer">
            <h1 className="bold text-xl">Super Sport</h1>
            <p className="text-zinc-400">
              Completed: 0
            </p>
            <p className="text-zinc-400">
              In progress: 2
            </p>
            <p className="text-zinc-400">
              Not Completed: 5
            </p>
            
          </div>
          </Link>
        </div>
      </div>
  );
};

export default QuizReport;
