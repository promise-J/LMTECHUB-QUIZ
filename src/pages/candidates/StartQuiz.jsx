import React, { useEffect, useState } from "react";
import { questions } from "../../data";
import Questions from "./Questions";

const StartQuiz = () => {
  const minutes = 60;
  const seconds = 60;
  const [quests, setQuests] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [remainingMinutes, setRemainingMinutes] = useState(minutes - 1);
  const [remainingSeconds, setRemainingSeconds] = useState(seconds - 1);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const getQuestions = () => {
      setQuests(questions);
      // setCurrentQuestion(quests[questionNumber]);
    };
    getQuestions();
  }, []);

  useEffect(() => {
    // const interval = setInterval(() => {
    //   if (remainingMinutes > 0) {
    //     setRemainingMinutes((prevMinutes) => prevMinutes - 1);
    //   }
    // }, 60000); // 60000 milliseconds = 1 minute
    if (remainingSeconds < 0) {
      setRemainingMinutes((m) => m - 1);
      setRemainingSeconds(seconds - 1);
    }

    // return () => {
    //   clearInterval(interval);
    // };
  }, [remainingSeconds]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (remainingMinutes >= 0) {
        setRemainingSeconds((prevSecond) => prevSecond - 1);
      }
    }, 1000); // 60000 milliseconds = 1 minute

    return () => {
      clearInterval(interval);
    };
  }, [remainingSeconds, remainingMinutes]);

  // console.log(answers.length, questionNumber + 1)


  return (
    <div className="p-4">
      <div>
        <div className="flex gap-3 p-3 max-h-[90vh] relative">
          <div className="absolute left-[30%] top-20">
            Time: <span className="text-3xl font-bold">8 </span> minutes
          </div>
          <div className="py-3 px-4 overflow-y-scroll no-scrollbar">
            <h3 className="font-semibold mb-4">Questions ({quests.length})</h3>
            <div className="flex p-2 flex-column gap-2 border-r-green-500 border-r-2">
              {questions.map((q) => (
                <button
                  onClick={() => setQuestionNumber(q.id - 1)}
                  // disabled={
                  //   // !(questionNumber + 1) === 1 || !((questionNumber + 1) - answers.length === 1)
                  // }
                  key={q.id}
                  className={`border hover:bg-green-500 hover:text-white py-3 rounded ${
                    q.id === questionNumber + 1 ? "bg-green-500 text-white" : ""
                  }
                   disabled:bg-gray-100 disabled:text-black
                  `}
                >
                  {q.id}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 p-5">
            <Questions
              answers={answers}
              setAnswers={setAnswers}
              remainingMinutes={remainingMinutes}
              quests={quests}
              remainingSeconds={remainingSeconds}
              questionNumber={questionNumber}
              setQuestionNumber={setQuestionNumber}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartQuiz;
