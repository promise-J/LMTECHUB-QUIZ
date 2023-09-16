import React, { useEffect, useState } from "react";
// import { questions } from "../../data";
import Questions from "./Questions";
import QuestionButton from "../../components/button/QuestionButton";
import { useLocation } from "react-router-dom";

const StartQuiz = () => {
  const { state } = useLocation();
  // const minutes = 60;
  const seconds = 60;
  const [quiz, setQuiz] = useState(null);
  const [quests, setQuests] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [remainingMinutes, setRemainingMinutes] = useState(
    () => quiz?.duration - 1
  );
  const [remainingSeconds, setRemainingSeconds] = useState(seconds - 1);
  const [answers, setAnswers] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getQuestions = () => {
      setQuests(state?.questions);
      setQuiz(state?.quiz);
      setUser(state?.user);
      setRemainingMinutes(state?.quiz?.duration - 1);
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
            Time:{" "}
            <span className="text-3xl font-bold">{state?.quiz?.duration} </span>{" "}
            minutes
          </div>
          <div className="py-3 px-4 overflow-y-scroll no-scrollbar">
            <span className="text-xl font-bold">
              Welcome! {user?.username.toUpperCase()}{" "}
            </span>
            <h3 className="font-semibold mb-4">Questions ({quests.length})</h3>
            <div className="flex p-2 flex-column gap-2 border-r-green-500 border-r-2">
              {quests.map((q, idx) => (
                <QuestionButton
                  key={q._id}
                  q={q}
                  questionNumber={questionNumber}
                  setQuestionNumber={setQuestionNumber}
                  questionId={idx}
                  answers={answers}
                />
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
              quizId={quiz?._id}
              userId={user?._id}
              email={user?.email}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartQuiz;
