import React, { useEffect } from "react";

const QuestionButton = ({q, questionNumber,setQuestionNumber, questionId}) => {


  return (
    <button
      onClick={() => setQuestionNumber(questionId)}
      className={`border hover:bg-green-500 hover:text-white py-3 rounded ${
        questionId === questionNumber ? "bg-green-500 text-white" : ""
      }
     disabled:bg-gray-100 disabled:text-black
    `}
    >
      {questionId + 1}
    </button>
  );
};

export default QuestionButton;
