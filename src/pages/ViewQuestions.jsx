import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import LoadingLogo from "../components/loading/LoadingLogo";
import createHttpRequest from "../api/httpRequest";
import { DELETE_ACTION, GET_ACTION } from "../libs/routes_actions";
import { ROUTE_QUESTION, ROUTE_QUIZ_QUESTIONS } from "../libs/routes";
import { X_TOKEN } from "../libs/constants";
import { toast } from "react-toastify";

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

  const handleDelete = async(id)=>{
    const token = localStorage.getItem(X_TOKEN)
    if(confirm('Are you sure you want to delete this question?')){
      const {data} = await createHttpRequest(DELETE_ACTION, `${ROUTE_QUESTION}/${id}`, {}, token)
      if(data.success){
        const newQuestions = questions.filter(q=> q._id != id)
        setQuestions(newQuestions)
        toast.success(data.message, {autoClose: 2000})
      }else{
        toast.error(data.message)
      }
    }
  }

  if(loading){
    return <LoadingLogo />
  }


  return (
    <div className="mx-3 my-4 p-3">
      <button onClick={()=> navigate(`/dashboard/createQuestion/${quizId}`)} className="border py-1 px-4">Add</button>
      {questions?.length > 0 ? questions.map((q) => (
        <div key={q._id} className="p-2 flex items-center justify-between border-b border-gray-5 pb-3">
          <h6 className="font-semibold text-lg">{q?.title} <span className="font-light text-sm">({q?.questionType})</span></h6>
          <div className="flex items-center gap-10">
            <p>{q?.score} marks</p>
            <div className="flex gap-2">
              <AiOutlineEdit cursor={"pointer"} onClick={()=> navigate(`/dashboard/editQuestion/${quizId}`, {state: q})} size={20} />
              <RiDeleteBinLine onClick={()=> handleDelete(q._id)} cursor={"pointer"} size={20} />
            </div>
          </div>
        </div>
      ))
      : 
      <p>No question. create questions. <button className="border py-1 px-2 rounded ms-3" onClick={()=> navigate(`/dashboard/createQuestion/${quizId}`)}>Create Question here</button> </p>
    }
    </div>
  );
};

export default ViewQuestions;
