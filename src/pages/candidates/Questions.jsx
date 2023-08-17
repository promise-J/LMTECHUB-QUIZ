import React, { useEffect, useState } from "react";
import AnswerPad from "../../components/answers/AnswerPad";
import { BsSignStop } from "react-icons/bs";
import Option from "./Option";

const Questions = ({quests, remainingMinutes, remainingSeconds, setQuestionNumber, questionNumber, answers, setAnswers}) => {

  const newAns = answers.map(a=> a.ansIdx)

  // console.log(newAns, 'the new answer')

  const handleNext = () => {
    if (questionNumber + 1 > quests.length - 1) {
      return;
    }
    // if(answers.length)
    setQuestionNumber((num) => num + 1);
  };


  const handlePrev = () => {
    if (questionNumber < 1) {
      return;
    }
    setQuestionNumber((num) => num - 1);
  };

  const handleAnswer = (qIdx, ansIdx) => {
    setAnswers((answers) => {
      if (answers.length < 1) {
        return [{ qIdx, ansIdx }];
      }
      let ansExists = answers.some((answer) => {
        return answer["qIdx"] === qIdx;
      });
      if (ansExists) {
        let qPos = answers.findIndex((ans) => {
          return ans.qIdx === qIdx;
        });
        answers.splice(qPos, 1, { qIdx, ansIdx });
      } else {
        answers = [...answers, { qIdx, ansIdx }].sort(
          (a, b) => a.qIdx - b.qIdx
        );
      }
      return [...answers];
    });
  };

  return (
    <div className="p-5">
              <div
                className={`border-1 z-2 absolute right-12 font-bold text-5xl top-12 rounded-full p-4 ${
                  remainingMinutes > 6 ? "text-green-500" : "text-red-500"
                } ${remainingMinutes < 4 ? "animate-ping" : ""}`}
              >
                {remainingMinutes >= 0 ? (
                  remainingMinutes
                ) : (
                  <BsSignStop color="red" className="animate-pulse" />
                )}
              </div>
              {remainingMinutes >= 0 && (
                <div className="absolute right-5 bg-gray-100 font-bold text-xl top-10 rounded-full p-2">
                  {remainingSeconds}
                </div>
              )}
              <h4>
                <span className="text-5xl">{questionNumber + 1}</span>
              </h4>
              <div className="my-4 p-3">
                <h1 className="text-3xl">{quests[questionNumber]?.title}</h1>
                {/* <Questions quests={quests} questionNumber={questionNumber} /> */}
                <div className="w-3/4 my-5 py-4">
                  {quests[questionNumber]?.options?.map((op, idx) => (
                    <Option key={idx} op={op} idx={idx} questionNumber={questionNumber} quests={quests} answers={answers} handleAnswer={handleAnswer} />
                  ))}
                </div>
                <div className="border-1 w-3/4 px-4 py-3 flex justify-between">
                  <button
                    disabled={questionNumber === 0}
                    onClick={handlePrev}
                    className="outline py-1 px-4 border-green-100 rounded hover:bg-green-500 hover:text-white disabled:bg-gray-400 disabled:text-white"
                  >
                    Prev
                  </button>
                  <button
                    onClick={handleNext}
                    className="outline py-1 px-4 border-green-100 rounded hover:bg-green-500 hover:text-white"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
  );
};

export default Questions;
