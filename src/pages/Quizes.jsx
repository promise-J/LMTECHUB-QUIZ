import React, { useEffect, useState } from "react";
// import { quizes } from '../data'
import { Link } from "react-router-dom";
import axios from "axios";
import baseUrl from "../api/baseUrl";
import QuizLoading from "../components/loading/QuizLoading";
import Quiz from "../components/Quiz";
import LoadingLogo from "../components/loading/LoadingLogo";

const Quizes = () => {
  const [quizes, setQuizes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getQuizes = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${baseUrl}/quizes`);
        setQuizes(res.data);
        setLoading(false)
      } catch (error) {
        console.log(error, "the error");
        setLoading(false)
      }
    };
    getQuizes();
  }, []);

  if(loading){
    return <LoadingLogo />
  }

  const displayQuiz = (quiz)=>{
    return loading ? <p>Loading...</p>
    //  <QuizLoading key={quiz._id} /> 
     : <Quiz  key={quiz._id} quiz={quiz} />
  }

  return (
    <div className="md:p-5 p-2 mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {quizes.map((quiz) => displayQuiz(quiz)
            )}
      </div>
    </div>
  );
};
// <Link to={`${quiz._id}`} key={quiz._id}>
// </Link>

export default Quizes;
