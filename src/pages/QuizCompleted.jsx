import React from "react";
import bye from '../assets/bye.jpg'


const QuizCompleted = () => {
  return (
    <div className="h-[100vh] flex justify-center items-center flex-col">
      <div className="text-3xl font-semibold">Seems you have already completed this Quiz</div>
      <img className="w-[100px] h-[100px]" src={bye} alt="bye" />
    </div>
  );
};

export default QuizCompleted;
