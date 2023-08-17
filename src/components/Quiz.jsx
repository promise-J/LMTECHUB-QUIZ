import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { LiaEyeSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

const Quiz = ({ quiz }) => {
  const [questionLength, setQuestionLength] = useState(0)

  useEffect(()=>{
    const getAllQuestions = async()=>{
      try {
        const res = await axios.get(`http://localhost:5000/api/quiz/questions/${quiz._id}`)
        setQuestionLength(res.data.length)
      } catch (error) {
        console.log(error)
      }
    }
    getAllQuestions()
  },[quiz?._id])


  const deleteQuiz = async (id) => {
    if (confirm("Are you sure you want to delete this quiz?")) {
    }
  };

  const viewQuiz = (id) => {
    Navigate("/");
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
