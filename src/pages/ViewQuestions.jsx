import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import LoadingLogo from "../components/loading/LoadingLogo";
import createHttpRequest from "../api/httpRequest";
import { GET_ACTION } from "../libs/routes_actions";
import { ROUTE_QUIZ_QUESTIONS } from "../libs/routes";
import { X_TOKEN } from "../libs/constants";

const ViewQuestions = () => {
  const { id: quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getQuestions = async () => {
      const token = localStorage.getItem(X_TOKEN)
      try {
        setLoading(true)
        const res = await createHttpRequest(GET_ACTION, `${ROUTE_QUIZ_QUESTIONS}/${quizId}`, {}, token)
        setQuestions(res.data);
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    };
    getQuestions();
  }, [quizId]);

  if(loading){
    return <LoadingLogo />
  }


  return (
    <div className="mx-3 my-4 p-3">
      {questions?.length > 0 ? questions.map((q) => (
        <div key={q._id} className="p-2 flex items-center justify-between border-b border-gray-5 pb-3">
          <h6 className="font-semibold text-lg">{q?.title}</h6>
          <div className="flex items-center gap-10">
            <p>{q?.score} marks</p>
            <div className="flex gap-2">
              <AiOutlineEdit cursor={"pointer"} onClick={()=> navigate(`/dashboard/editQuestion/${quizId}`, {state: q})} size={20} />
              <RiDeleteBinLine cursor={"pointer"} size={20} />
            </div>
          </div>
        </div>
      ))
      : 
      <p>No question. create questions. <button className="bg-blue-300 py-1 px-2 rounded ms-3" onClick={()=> navigate(`/dashboard/createQuestion/${quizId}`)}>Create Question here</button> </p>
    }
    </div>
  );
};

export default ViewQuestions;
