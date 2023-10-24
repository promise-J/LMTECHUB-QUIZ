import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { GrClose } from "react-icons/gr";
import useNavbar from "../../hooks/useNavbar";
import { Link } from "react-router-dom";
import createHttpRequest from '../../api/httpRequest'
import {GET_ACTION} from '../../libs/routes_actions'
import { ROUTE_GET_QUIZ } from "../../libs/routes";

const SingleQuizModal = ({ paramData }) => {
  const [quiz, setQuiz] = useState(null);
  const [newQuiz, setNewQuiz] = useState({
    candidate: "",
    duration: "",
    title: "",
  });
  const { title, candidate, duration } = newQuiz;

  const navbarHook = useNavbar();
  useEffect(() => {
    if (paramData && paramData.id) {
      const getQuiz = async () => {
        try {
          const res = await createHttpRequest(GET_ACTION, `${ROUTE_GET_QUIZ}/${paramData.id}`);
          const { title, duration, candidates } = res.data;
          setQuiz({ title, duration, candidates, candidate: "" });
        } catch (error) {
          console.log(error);
        }
      };
      getQuiz();
    }
  }, [paramData]);

  // const displayCandidates = (quiz)=>{
  //   return quiz?.candidates?.map(c=>(c, idx)=>(
  //     <p>{c}</p>
  //   ))
  // }

  const handleSave = (e) => {
    e.preventDefault();
    console.log(newQuiz, quiz?.candidates);
  };

  const cancelButton = () => (
    <button
      className="absolute bottom-12 left-20 text-red-500 border-none py-1 px-4 hover:bg-red-500 hover:text-white outline-none"
      onClick={() => navbarHook.onClose()}
    >
      Close
    </button>
  );

  const proceedButton = () => (
    <button
      onClick={handleSave}
      className="absolute bottom-12 right-20 text-blue-500 border-none py-1 px-4 hover:bg-blue-500 hover:text-white"
    >
      Save
    </button>
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    setNewQuiz({ ...newQuiz, [name]: value });
  };

  const bodyContent = (
    <div className="bg-red-300 absolute w-[100%] h-[100vh]">
      <GrClose className="absolute top-10 right-3" />
      <h1 className="my-4">LMTechub</h1>
      <ul>
        <li>
          <Link to='/dashboard/home' onClick={()=> navbarHook.onClose()} className="link">Home</Link>
        </li>
        <li>
          <Link to='/dashboard/viewquiz' onClick={()=> navbarHook.onClose()} className="link">View quizes</Link>
        </li>
        <li>
          <Link to='/dashboard/createquiz' onClick={()=> navbarHook.onClose()} className="link">Create Quiz</Link>
        </li>
      </ul>
    </div>
  );

  return (
    <Modal
      isOpen={navbarHook.isOpen}
      onClose={navbarHook.onClose}
      cancelButton={cancelButton}
      bodyContent={bodyContent}
      proceedButton={proceedButton}
      lone
    />
  );
};

export default SingleQuizModal;
