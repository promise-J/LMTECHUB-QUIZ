import React, { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { FaListUl } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AiOutlineFileAdd } from "react-icons/ai";
import LoadingLogo from "../components/loading/LoadingLogo";
import createHttpRequest from '../api/httpRequest'
import {GET_ACTION, PUT_ACTION} from '../libs/routes_actions'
import { ROUTE_ADD_CANDIDATE, ROUTE_GET_QUIZ } from "../libs/routes";
import { X_TOKEN } from "../libs/constants";

const Singlequiz = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ duration: "", title: "" });
  const [candidate, setCandidate] = useState("");
  const { title, duration } = data;

  useEffect(() => {
    const getQuiz = async () => {
      const token = localStorage.getItem(X_TOKEN)
      try {
        setLoading(true);
        const res = await createHttpRequest(GET_ACTION, `${ROUTE_GET_QUIZ}/${params.id}`, {}, token);
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

  const handleRemoveCandidate = async(candidate)=> {
    try {
      const token = localStorage.getItem(X_TOKEN)
      if(confirm('Are you sure you want to remove this candidate?')){
        const res = await createHttpRequest(PUT_ACTION, `${ROUTE_ADD_CANDIDATE}/${params.id}`, {candidate: candidate.trim()}, token)
        console.log(res,' from remove')
        toast.success(res.data.message)
        navigate(`/dashboard/viewquiz/${params.id}`)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleAddCandidate = async () => {
    const token = localStorage.getItem(X_TOKEN)
    const regex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/
    const emailIsValid = regex.test(candidate)
    if(!emailIsValid){
      return toast.error('Please enter a valid email')
    }
    try {
      const res = await createHttpRequest(PUT_ACTION, `${ROUTE_ADD_CANDIDATE}/${params.id}`, {candidate: candidate.trim()}, token)
      toast.success(res.data.message);
      setCandidate('')
      navigate('/dashboard/viewquiz')
    } catch (error) {
      console.log('the add can err');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleQuizUpdate = async()=>{
    try {
      const token = localStorage.getItem(X_TOKEN)
      const {data} = await createHttpRequest(PUT_ACTION, `${ROUTE_GET_QUIZ}/${params.id}`, {duration, title}, token)
      console.log(data)
      if(data.success){
        toast.success('Quiz update successful')
        navigate('/dashboard/viewquiz')
      }else{
        toast.error(data.error)
      }
    } catch (error) {
      console.log('error')
    }
  }

  if (loading) {
    return <LoadingLogo />;
  }


  return (
    <div className="p-4 mt-3 relative">
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
      <button onClick={handleQuizUpdate} className="d-block my-3 border p-2 bg-gray-200 rounded">Update Quiz</button>
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
          <ul>
            {
              currentQuiz?.candidates.map((c, idx)=>(
                <li key={idx} className='flex items-center my-1'> <AiOutlineDelete onClick={()=> handleRemoveCandidate(c)} className='me-4' /> <span className='me-4'>{c}</span> </li>
              ))
            }
          </ul>
      <ul className="flex flex-column gap-1 list-disc">
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
        <button onClick={()=> navigate('/dashboard/monitorquiz', {state: {quizId: currentQuiz?._id}})} className="animate-pulse font-bold ml-4">Monitor Quiz</button>
        
      </div>
    </div>
  );
};

export default Singlequiz;
