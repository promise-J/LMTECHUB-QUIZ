import React, { useEffect, useState } from "react";
import useSingleQuiz from "../hooks/useSingleQuiz";
import { BiEditAlt } from "react-icons/bi";
import { FaListUl } from "react-icons/fa";
import useCreateQuestion from "../hooks/useCreateQuestion";
import useViewQuiz from "../hooks/useViewQuiz";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import baseUrl from "../api/baseUrl";
import { toast } from "react-toastify";
import { AiOutlineFileAdd } from "react-icons/ai";
import LoadingLogo from "../components/loading/LoadingLogo";
import { useUserContext } from "../context/Usercontext";
import isEmail from "../utils/emailValidator";

const Singlequiz = () => {
  const navigate = useNavigate();
  const params = useParams();
  const singleQuizHook = useSingleQuiz();
  const createQuestion = useCreateQuestion();
  const viewQuiz = useViewQuiz();
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ duration: "", title: "" });
  const [candidate, setCandidate] = useState("");
  const { title, duration } = data;

  useEffect(() => {
    const getQuiz = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${baseUrl}/quiz/${params.id}`);
        setData({ duration: res.data.duration, title: res.data.title });
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

  const handleCandidate = (e)=>{
    setCandidate(e.target.value)
  }

  const emailCheck = (email)=>{
    const regex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/
    regex.test()
  }


  const handleAddCandidate = async () => {
    const token = localStorage.getItem('x-token')
    const regex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/
    const emailIsValid = regex.test(candidate)
    if(!emailIsValid){
      return toast.error('Please enter a valid email')
    }
    try {
      // const res = await axios.put(`http://localhost:5000/api/quiz/addCandidate/${params.id}`, {headers: {Authorization: `Bearer ${token}`}})
      const res = await axios.put(`http://localhost:5000/api/quiz/addCandidate/${params.id}`, {candidate: candidate.trim()}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(res.data.message);
      setCandidate('')
      navigate('/dashboard/viewquiz')
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  if (loading) {
    return <LoadingLogo />;
  }

  return (
    <div className="p-4 mt-3 relative">
      {/* <div
        title="Edit question"
        onClick={() => singleQuizHook.onOpen()}
        className="absolute top-6 right-8 cursor-pointer"
      >
        <BiEditAlt size={30} />
      </div> */}
      <input
        className="border block my-3 p-2 w-1/2"
        type="text"
        value={title}
        name="title"
        onChange={handleChange}
      />
      <input
        className="border my-3 p-2 w-1/2"
        type="number"
        value={duration}
        name="duration"
        onChange={handleChange}
      />{" "}
      <span>minutes</span>
      {/* <h1 className="text-4xl font-semibold">{currentQuiz?.title}</h1> */}
      {/* <h6 className="text-2xl my-4 font-light">{currentQuiz?.duration} mins</h6> */}
      <p className="text-green-500">
        {currentQuiz?.questions?.length} Questions
      </p>
      <p className="my-3">{currentQuiz?.candidates.length} Candidates</p>
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="add candidate's email e.g martha@gmail.com "
          name="candidate"
          onChange={handleCandidate}
          value={candidate}
          className="my-2 outline rounded-md p-1 w-1/2"
        />
        
          <AiOutlineFileAdd
          cursor={"pointer"}
          size={26}
          onClick={handleAddCandidate}
          />
      </div>
      <ul className="flex flex-column gap-1 list-disc">
        {/* {!loading && currentQuiz?.length > 0 ? (
          currentQuiz?.candidates?.map((c) => (c, idx) => {
            console.log('promise')

            return <li className="flex items-center gap-4" key={idx}>
              {c} <IoMdRemoveCircleOutline cursor={"pointer"} />
            </li>;
          })
        ) : (
          <p>Please add Candidate</p>
        )} */}
      </ul>
      <h6 className="text-2xl">Questions</h6>
      <div
        className="w-fit p-2 my-3 flex px-3 gap-3 cursor-pointer"
        title="Create | View"
      >
        <BiEditAlt
          size={16}
          onClick={() =>
            navigate(`/dashboard/createQuestion/${currentQuiz._id}`)
          }
        />{" "}
        <FaListUl
          size={16}
          onClick={() =>
            navigate(`/dashboard/viewQuestions/${currentQuiz._id}`)
          }
        />
        <button onClick={()=> navigate('/dashboard/monitorquiz', {state: {quizId: currentQuiz._id}})} className="animate-pulse text-green-400 font-bold ml-4">Monitor Quiz</button>
      </div>
    </div>
  );
};

export default Singlequiz;
