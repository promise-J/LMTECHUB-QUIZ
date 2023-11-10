import React, { useEffect, useState } from "react";
import { BsSignStop } from "react-icons/bs";
import Option from "./Option";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/Usercontext";
import LoadingLogo from "../../components/loading/LoadingLogo";
import createHttpRequest from '../../api/httpRequest'
import {POST_ACTION, PUT_ACTION} from '../../libs/routes_actions'
import { ROUTE_RESPONSE_QUIZ, ROUTE_RESPONSE_UPDATE_TIME } from "../../libs/routes";
import { X_TOKEN } from "../../libs/constants";

const Questions = ({
  quests,
  remainingMinutes,
  remainingSeconds,
  setQuestionNumber,
  questionNumber,
  answers,
  setAnswers,
  userId,
  quizId,
  email,
}) => {
  const navigate = useNavigate();
  const { setUser } = useUserContext();
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'ArrowRight') {
        handleNext()
      }else if(event.key === 'ArrowLeft'){
        handlePrev()
      }else if(event.key === 'Enter'){
        setQuestionNumber(quests.length - 1) && handleNext()
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  async function autoSubmit(response) {
    try {
      const token = localStorage.getItem(X_TOKEN)
      await createHttpRequest(PUT_ACTION, `${ROUTE_RESPONSE_UPDATE_TIME}/${quizId}`, {timeLeft: 0, email}, token)
      const res = await createHttpRequest(POST_ACTION, `${ROUTE_RESPONSE_QUIZ}/${quizId}`, {response, userId, email}, token)
      setLoading(false);
      console.log(res.data, "from auto submit");
      toast.success("Your response has been sent", {autoClose: 2000});
      navigate("/quiz/success", { state: {} });
      localStorage.removeItem("x-token");
      localStorage.removeItem("quiz-refresh");
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
  }, [remainingMinutes]);

  useEffect(() => {
    const response = figureAnswers();
    if (remainingMinutes < 0) {
      toast.success("Your time is up. You will now submit automatically"), {autoClose: 2000};
      autoSubmit(response);
    }
  }, [remainingSeconds]);

  // isRefreshed && autoSubmit()

  function figureAnswers() {
    const res = quests.map((_) => null);
    for (let i = 0; i < answers.length; i++) {
      res[answers[i].qIdx] = answers[i].ansIdx;
    }
    return res;
  }

  const handleNext = async () => {
    const token = localStorage.getItem(X_TOKEN)
    if (questionNumber + 1 > quests.length - 1) {
      const response = answers.map((a) => a.ansIdx);
      if (answers.length < quests.length) {
        return toast.error("Please attempt all questions", { delay: 500 });
      }
      try {
        if (
          confirm(
            "Are you sure you want to submit? You can not undo this action"
          )
        ) {
          const {data} = await createHttpRequest(POST_ACTION, `${ROUTE_RESPONSE_QUIZ}/${quizId}`, {response, userId, email}, token)
          if(!data.success){
            localStorage.removeItem("x-token");
            setUser(null);
            navigate("/quiz/ended");
            return toast.error(data.message)
          }
          setLoading(true);
          toast.success("Your response has been sent", {autoClose: 2000});
          setLoading(false);
          navigate("/quiz/success", { state: {} });
          localStorage.removeItem("x-token");
          setUser(null);
        }
      } catch (error) {
        if (error?.response?.data) {
          return toast.error(error?.response?.data);
        }
        toast.error(error?.response?.data.message);
      }
      return;
    }

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
      // const newAns = [...answers].map((a) => a.ansIdx);
      const updateTime = async (response) => {
        const token = localStorage.getItem(X_TOKEN)
        try {
          await createHttpRequest(PUT_ACTION, `${ROUTE_RESPONSE_UPDATE_TIME}/${quizId}`, {timeLeft: remainingMinutes, email, userResponse: response}, token)
        } catch (error) {
          console.log(error);
        }
      };
      updateTime([...answers].map(a=> a.ansIdx));
      return [...answers];
    });
  };

  if (loading) {
    return <LoadingLogo />;
  }

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
        <span className="text-5xl">{questionNumber + 1}</span> /
        <span className="text-lg font-bold">{answers.length} attempted</span>
      </h4>
      <div className="my-4 p-3">
        <h1 className="text-3xl">{quests && quests[questionNumber]?.title}</h1>
        {/* <Questions quests={quests} questionNumber={questionNumber} /> */}
        <div className="w-3/4 my-5 py-4">
          {quests &&
            quests[questionNumber]?.options?.map((op, idx) => (
              <Option
                key={idx}
                op={op}
                idx={idx}
                questionNumber={questionNumber}
                quests={quests}
                answers={answers}
                handleAnswer={handleAnswer}
              />
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
            // disabled={quests.length <= questionNumber + 1}
            onClick={handleNext}
            className="outline py-1 px-4 border-green-100 rounded hover:bg-green-500 hover:text-white disabled:bg-gray-400 disabled:text-white"
          >
            {quests?.length <= questionNumber + 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questions;
