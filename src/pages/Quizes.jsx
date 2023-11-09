import React, { useEffect, useState } from "react";
// import { quizes } from '../data'
import baseUrl from "../api/baseUrl";
import Quiz from "../components/Quiz";
import LoadingLogo from "../components/loading/LoadingLogo";
import createHttpRequest from "../api/httpRequest";
import { GET_ACTION } from "../libs/routes_actions";
import { ROUTE_QUIZES } from "../libs/routes";
import { X_TOKEN } from "../libs/constants";
import { Link } from "react-router-dom";

const Quizes = () => {
  const [quizes, setQuizes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [quizPerPage] = useState(3);


  const indexOfLastQuiz = currentPage * quizPerPage;
  const indexOfFirstQuiz = indexOfLastQuiz - quizPerPage;
  const currentPosts = quizes.slice(indexOfFirstQuiz, indexOfLastQuiz);

  useEffect(() => {
    const getQuizes = async () => {
      const token = localStorage.getItem(X_TOKEN)
      try {
        setLoading(true)
        const res = await createHttpRequest(GET_ACTION, ROUTE_QUIZES, {}, token)
        setQuizes(res.data);
        setLoading(false)
      } catch (error) {
        console.log(error, "the error");
        setLoading(false)
      }
    };
    getQuizes();
  }, []);

  
  const displayQuiz = (quiz)=>{
    return loading ? <p>Loading...</p>
    //  <QuizLoading key={quiz._id} /> 
    : <Quiz  key={quiz._id} quizes={quizes} setQuizes={setQuizes} quiz={quiz} />
  }
  if(loading){
    return <LoadingLogo />
  }

  if(quizes.length < 1){
    return <div className="md:p-5 p-2 mt-4">
             <div className="grid gap-5">
               <h4 className="text-center">There is no quiz yet. <Link to={'/dashboard/createquiz'}>Create Quiz</Link></h4>
             </div>
           </div>
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
