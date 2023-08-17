import React, { useEffect, useState } from "react";
import useSingleQuiz from "../hooks/useSingleQuiz";
import { BiEditAlt } from "react-icons/bi";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { FaListUl } from "react-icons/fa";
import useCreateQuestion from "../hooks/useCreateQuestion";
import useViewQuiz from "../hooks/useViewQuiz";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import baseUrl from "../api/baseUrl";
import { toast } from "react-toastify";
import { AiOutlineFileAdd } from "react-icons/ai";

const Singlequiz = () => {
  const navigate = useNavigate()
  const params = useParams();
  const singleQuizHook = useSingleQuiz();
  const createQuestion = useCreateQuestion();
  const viewQuiz = useViewQuiz();
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getQuiz = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${baseUrl}/quiz/${params.id}`);
        setCurrentQuiz(res.data);
        setLoading(false);
      } catch (error) {
        toast.error("Something went wrong with the server");
        console.log(error);
        setLoading(false);
      }
    };
    getQuiz();
  }, [params.id]);

  return (
    <div className="p-4 mt-3 relative">
      <div
        title="Edit question"
        onClick={() => singleQuizHook.onOpen()}
        className="absolute top-6 right-8 cursor-pointer"
      >
        <BiEditAlt size={30} />
      </div>
      <h1 className="text-4xl font-semibold">{currentQuiz?.title}</h1>
      <h6 className="text-2xl my-4 font-light">{currentQuiz?.duration} mins</h6>
      <p className="text-green-500">
        {currentQuiz?.questions?.length} Questions
      </p>
      <p className="my-3">{currentQuiz?.candidates.length} Candidates</p>
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="add candidate"
          className="my-2 outline rounded-md p-1 w-[400px]"
        />
        <AiOutlineFileAdd cursor={"pointer"} size={26} />
      </div>
      <ul className="flex flex-column gap-1 list-disc">
        {!loading && currentQuiz?.length > 0 ? (
          currentQuiz?.candidates?.map((c) => (c, idx) => {
            console.log('promise')

            return <li className="flex items-center gap-4" key={idx}>
              {c} <IoMdRemoveCircleOutline cursor={"pointer"} />
            </li>;
          })
        ) : (
          <p>Please add Candidate</p>
        )}
      </ul>
      <h6 className="text-2xl">Questions</h6>
      <div
        className="w-fit p-2 my-3 flex px-3 gap-3 cursor-pointer"
        title="Create | View"
      >
        <BiEditAlt size={16} onClick={() => navigate(`/dashboard/createQuestion/${currentQuiz._id}`)} />{" "}
        <FaListUl size={16} onClick={() => navigate(`/dashboard/viewQuestions/${currentQuiz._id}`)} />
      </div>
    </div>
  );
};

export default Singlequiz;
