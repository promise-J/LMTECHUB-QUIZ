import React from "react";
import { CiViewList } from "react-icons/ci";
import { VscFeedback, VscGitPullRequestCreate } from "react-icons/vsc";
import {Link} from 'react-router-dom'

const Homepage = () => {
  return (
    <div>
        <h5 className="md:text-3xl text-xl md:text-center my-3">Manage your Organisation</h5>
        <div className="flex-1 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Link to='/dashboard/viewquiz'>
          <div className="rounded-xl shadow radius-200 p-4 flex justify-center flex-col gap-3 hover:scale-105 transition duration-150 ease-in cursor-pointer">
            <h1 className="bold text-xl">View Quizes</h1>
            <p className="text-zinc-400">See all your quizzes</p>
            <button className="bg-purple-200 flex rounded-md py-1 items-center w-fit px-2">
              {" "}
              <CiViewList size={35} />
            </button>
          </div>
          </Link>
          <Link to='/dashboard/createquiz'>
          <div className="rounded-xl shadow radius-200 p-4 flex justify-center flex-col gap-3 hover:scale-105 transition duration-150 ease-in cursor-pointer">
            <h1 className="bold text-xl">Create Quiz</h1>
            <p className="text-zinc-400">Start a quiz and send invites</p>
            <button className="bg-purple-200 flex rounded-md py-1 items-center w-fit px-2">
              {" "}
              <VscGitPullRequestCreate size={35} />
            </button>
          </div>
          </Link>

          <Link to='/dashboard/sendfeedback'>
          <div className="rounded-xl shadow radius-200 p-4 flex justify-center flex-col gap-3 hover:scale-105 transition duration-150 ease-in cursor-pointer">
            <h1 className="bold text-xl">Send Feedback</h1>
            <p className="text-zinc-400">
              Send your feedback to make is better
            </p>
            <button className="bg-purple-200 flex rounded-md py-1 items-center w-fit px-2">
              {" "}
              <VscFeedback size={35} />
            </button>
          </div>
          </Link>
        </div>
      </div>
  );
};

export default Homepage;
