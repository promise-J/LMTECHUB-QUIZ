import React from "react";
import AnswerPad from "../../components/answers/AnswerPad";

const Question = ({op, idx, questionNumber, quests, answers, handleAnswer}) => {

  return (
    <>
      <AnswerPad
        op={op}
        idx={idx}
        questionNumber={questionNumber}
        quests={quests}
        answers={answers}
        handleAnswer={() => handleAnswer(questionNumber, idx)}
        //   selected={selectedOption === idx}
      />
    </>
  );
};

export default Question;
