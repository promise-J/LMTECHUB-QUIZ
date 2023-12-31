import React, { useState } from "react";
import { toast } from "react-toastify";
import baseUrl from '../api/baseUrl'
import { useNavigate } from "react-router-dom";
import LoadingLogo from "../components/loading/LoadingLogo";
import createHttpRequest from "../api/httpRequest";
import { POST_ACTION } from "../libs/routes_actions";
import { ROUTE_QUIZ } from "../libs/routes";
import { X_TOKEN } from "../libs/constants";

const initialState = {
  duration: 0,
  title: "",
};

const CreateQuiz = () => {
  const navigate = useNavigate()
  const [quizObject, setQuizObject] = useState(initialState);
  const { duration, title, candidates, candidate } = quizObject;
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizObject({ ...quizObject, [name]: value });
  };

  const handleSubmit = async (e) => {
    const token = localStorage.getItem(X_TOKEN)
    e.preventDefault();
    delete quizObject.candidate
    try {
      setLoading(true)
      const res = await createHttpRequest(POST_ACTION, ROUTE_QUIZ, {...quizObject}, token)

      setLoading(false)
      toast.success('Quiz Created', {autoClose: 2000})
      navigate('/dashboard/viewquiz')
    } catch (error) {
      toast.error(error?.response?.data?.message)
      setLoading(false)
    }
  };

  if(loading){
    return <LoadingLogo />
  }



  return (
    <div className="p-3 mt-4 flex justify-center">
      <div className="w-full md:w-1/2 p-3">
      <div className="flex flex-column justify-center my-2 py-3">
        <p className="me-4 font-semibold">Title: </p>
        <input
          value={title}
          name="title"
          onChange={handleChange}
          type="text"
          placeholder="Enter Quiz Title"
          className="w-1/2 p-2 border w-full"
        />
      </div>
      <div className="flex flex-column justify-center my-2 py-3">
        <p className="me-4 font-semibold">Duration: </p>
        <input
          type="text"
          value={duration}
          name="duration"
          onChange={handleChange}
          placeholder="e.g 20 (in minutes)"
          className="w-1/2 p-2 border w-full"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="py-2 px-4 bg-gray-200 hover:bg-gray-100 rounded w-full my-3"
      >
        Create Quiz
      </button>
    </div>
    </div>
  );
};

export default CreateQuiz;
