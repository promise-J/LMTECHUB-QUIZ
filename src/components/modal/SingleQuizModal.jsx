import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import useSingleQuiz from "../../hooks/useSingleQuiz";
import createHttpRequest from '../../api/httpRequest'
import { ROUTE_GET_QUIZ } from "../../libs/routes";
import {GET_ACTION} from '../../libs/routes_actions'

const SingleQuizModal = ({ paramData }) => {
  const [quiz, setQuiz] = useState(null);
  const [newQuiz, setNewQuiz] = useState({
    candidate: "",
    duration: "",
    title: "",
  });
  const { title, candidate, duration } = newQuiz;

  const singleQuizHook = useSingleQuiz();
  useEffect(() => {
    if (paramData && paramData.id) {
      const getQuiz = async () => {
        try {
          const res = await createHttpRequest(GET_ACTION, `${ROUTE_GET_QUIZ}/${paramData.id}`)
          const { title, duration, candidates } = res.data;
          setQuiz({ title, duration, candidates, candidate: "" });
        } catch (error) {
          console.log(error);
        }
      };
      getQuiz();
    }
  }, [paramData]);

  const handleSave = (e) => {
    e.preventDefault();
    console.log(newQuiz, quiz?.candidates);
  };

  const cancelButton = () => (
    <button
      className="absolute bottom-12 left-20 text-red-500 border-none py-1 px-4 hover:bg-red-500 hover:text-white outline-none"
      onClick={() => singleQuizHook.onClose()}
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
    <div className="mx-5 my-4 p-3">
      <div className="py-2 flex gap-5 items-center my-2">
        <h6 className="text-xl">Title:</h6>
        <input
          name="title"
          value={title}
          onChange={handleChange}
          type="text"
          placeholder={quiz?.title}
          className="border outline-none rounded py-1 px-2 w-1/2"
        />
      </div>
      <div className="py-2 flex gap-5 items-center my-2">
        <h6 className="text-xl">Duration: </h6>
        <input
          name="duration"
          value={duration}
          onChange={handleChange}
          type="number"
          placeholder={quiz?.duration}
          className="border outline-none rounded py-1 px-2 w-1/2"
        />
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={singleQuizHook.isOpen}
      onClose={singleQuizHook.onClose}
      cancelButton={cancelButton}
      title="Edit Quiz"
      bodyContent={bodyContent}
      proceedButton={proceedButton}
    />
  );
};

export default SingleQuizModal;
