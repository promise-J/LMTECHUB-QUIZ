import React, { useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { AiOutlineUserAdd } from "react-icons/ai";
import { toast } from "react-toastify";
import Toast from "../components/toast/Toast";
import axios from "axios";
import baseUrl from '../api/baseUrl'

const initialState = {
  duration: 0,
  title: "",
  candidates: [],
  candidate: "",
};

const CreateQuiz = () => {
  const [quizObject, setQuizObject] = useState(initialState);
  const { duration, title, candidates, candidate } = quizObject;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuizObject({ ...quizObject, [name]: value });
  };

  const addCandidate = () => {
      if(!candidate) return toast.error('Provide a candidate to add')
    // return console.log(candidate, 'the candidte')
    setQuizObject({
      ...quizObject,
      candidates: [...candidates, candidate],
      candidate: "",
    });
    // toast.success('Candidate added', {autoClose: 500})
    {Toast}
  };

  const removeCandidate = (idx)=>{
    const newCandidates = [...candidates]
    newCandidates.splice(idx, 1)
    setQuizObject({...quizObject, candidates: newCandidates})
    toast.success('Candidate removed', {autoClose: 500})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    delete quizObject.candidate
    try {
      const res = await axios.post(`${baseUrl}/quiz`, {...quizObject})
      toast.success('Quiz Created')
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  };

  return (
    <div className="p-3 mt-4">
      <div className="flex items-center my-2 p-3">
        <p className="me-4 font-semibold">Title: </p>
        <input
          value={title}
          name="title"
          onChange={handleChange}
          type="text"
          placeholder="Enter Quiz Title"
          className="w-1/2 p-2 outline"
        />
      </div>
      <div className="flex items-center my-2 p-3">
        <p className="me-4 font-semibold">Duration: </p>
        <input
          type="text"
          value={duration}
          name="duration"
          onChange={handleChange}
          placeholder="Enter Quiz Duration"
          className="w-1/2 p-2 outline"
        />
      </div>
      <div className="flex items-center my-2 p-3">
        <p className="me-4 font-semibold">Add Candidate: </p>
        <input
          type="text"
          value={candidate}
          name="candidate"
          onChange={handleChange}
          placeholder="Enter Candidate Email"
          className="w-1/2 p-2 outline"
        />
        <AiOutlineUserAdd onClick={addCandidate} className="ms-4" size={25} cursor={"pointer"} />
      </div>
      <p className="font-semibold text-lg">Invitees - {candidates.length < 1 && "(None yet, Add candidates for this test)"}</p>
      <ul className="p-3 flex flex-column gap-3">
        {candidates.map((c, idx) => (
          <li key={idx} className="flex items-center gap-5 p-2">
            {c}{" "}
            <span>
              <ImCancelCircle cursor={"pointer"} title="Delete Candidate" onClick={()=> removeCandidate(idx)} />
            </span>
          </li>
        ))}
      </ul>
      <button
        onClick={handleSubmit}
        className="outline py-1 px-4 bg-purple-500 text-white rounded"
      >
        Create Quiz
      </button>
    </div>
  );
};

export default CreateQuiz;
