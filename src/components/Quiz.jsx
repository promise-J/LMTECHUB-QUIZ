import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { LiaEyeSolid } from "react-icons/lia";
import { Link, useNavigate } from "react-router-dom";
import createHttpRequest from "../api/httpRequest";
import { DELETE_ACTION, GET_ACTION } from "../libs/routes_actions";
import {ROUTE_QUIZ_QUESTIONS} from '../libs/routes'
import { X_TOKEN } from "../libs/constants";
import { ROUTE_QUIZ } from "../libs/routes";

const Quiz = ({ quiz, quizes, setQuizes }) => {
  const [questionLength, setQuestionLength] = useState(0)
  const navigate = useNavigate()

  useEffect(()=>{
    const getAllQuestions = async()=>{
      const token = localStorage.getItem(X_TOKEN)
      try {
        const res = await createHttpRequest(GET_ACTION, `${ROUTE_QUIZ_QUESTIONS}/${quiz._id}`, {}, token)
        setQuestionLength(res.data.length)
      } catch (error) {
        console.log(error)
      }
    }
    getAllQuestions()
  },[quiz?._id])


  const deleteQuiz = async (id) => {
    if (confirm("Are you sure you want to delete this quiz?")) {
      const newQuizState = quizes.filter(quiz=> quiz._id !== id)
      setQuizes(newQuizState)
      const token = localStorage.getItem(X_TOKEN)
      const res = await createHttpRequest(DELETE_ACTION, `${ROUTE_QUIZ}/${quiz?._id}`, {}, token)
      navigate('/dashboard/viewquiz')
    }
  };

  return (
    <div
    //   key={quiz._id}
      className="shadow-md hover:bg-gray-100 cursor-pointer p-3 rounded-lg transition duration-150 relative"
    >
      <h1 className="semibold text-4xl my-3">
        {quiz.title.length > 12 ? quiz.title.slice(0, 12) + "..." : quiz.title}
      </h1>
      <p>Duration: {quiz.duration} minutes</p>
      <p>Questions: {questionLength}</p>
      {
        <Link to={`${quiz._id}`}>
          <LiaEyeSolid className="absolute bottom-3 right-10 hover:scale-150 hover:fill-green-500" />
        </Link>
      }
      <AiOutlineDelete
        className="absolute bottom-3 right-3 hover:scale-150 hover:fill-red-500"
        onClick={() => deleteQuiz(quiz._id)}
      />
    </div>
  );
};

export default Quiz;
