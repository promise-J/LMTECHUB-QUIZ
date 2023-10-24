import React, { useEffect, useState } from "react";
// import { quizes } from '../data'
import baseUrl from "../api/baseUrl";
import Quiz from "../components/Quiz";
import LoadingLogo from "../components/loading/LoadingLogo";
import createHttpRequest from "../api/httpRequest";
import { GET_ACTION } from "../libs/routes_actions";
import { ROUTE_QUIZES } from "../libs/routes";
import { X_TOKEN } from "../libs/constants";

const Quizes = () => {
  const [quizes, setQuizes] = useState([]);
  const [loading, setLoading] = useState(true);

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
    : <Quiz  key={quiz._id} quiz={quiz} />
  }
  if(loading){
    return <LoadingLogo />
  }

  // if(quizes.length < 1){
  //   return (
  //   <div className="md:p-5 p-2 mt-4">
  //       <h1 className="text-center">There is no quiz to display</h1>
  //   </div>

  //   )
  // }
  
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
