import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";

const ViewQuestions = () => {
  const { id: quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/quiz/questions/${quizId}`
        );
        setQuestions(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getQuestions();
  }, [quizId]);


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
      <p>No question. create questions. <button className="bg-blue-300 py-1 px-2 rounded ms-3" onClick={()=> navigate(`/dashboard/createQuestion/${id}`)}>Create Question here</button> </p>
    }
    </div>
  );
};

export default ViewQuestions;
