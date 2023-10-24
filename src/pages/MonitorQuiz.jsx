import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import baseUrl from '../api/baseUrl';
import LoadingLogo from '../components/loading/LoadingLogo';
import SingleMonitor from './SingleMonitor';
import createHttpRequest from '../api/httpRequest';
import { GET_ACTION } from '../libs/routes_actions';
import { ROUTE_QUIZ_QUESTIONS, ROUTE_QUIZ_RESPONSE } from '../libs/routes';
import { X_TOKEN } from '../libs/constants';


const MonitorQuiz = () => {
    const {state: {quizId}} = useLocation()
    const [quizQuestions, setQuizQuestions] = useState([])
    // const [quiz, setQuiz] = useState(null)
    const [responses, setResponses] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        const getQuiz = async()=>{
            const token = localStorage.getItem(X_TOKEN)
            setLoading(true)
            const resQuizQuestion = await createHttpRequest(GET_ACTION, `${ROUTE_QUIZ_QUESTIONS}/${quizId}`, {},token)
            setQuizQuestions(resQuizQuestion.data)
            // setQuiz(resQuiz.data)
            setLoading(false)
        }
        getQuiz()
    },[quizId])

    useEffect(()=>{
        const getResponse = async()=>{
            const token = localStorage.getItem(X_TOKEN)
            try {
                const res = await createHttpRequest(GET_ACTION, `${ROUTE_QUIZ_RESPONSE}/${quizId}`, {}, token)
                res && res.data && setResponses(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getResponse()
    },[quizId])


      if(loading){
        return <LoadingLogo />
      }

  return (
    <div className='md:p-5'>
        <div className="flex justify-center md:p-5">
            <table className="table-auto w-full">
                <thead>
                    <tr className='border'>
                        <th className='p-2 border-black border-2'>Candidate</th>
                        <th className='p-2 border-black border-2'>Score</th>
                        <th className='p-2 border-black border-2'>Time left</th>
                        <th className='p-2 border-black border-2'>Status</th>
                        <th className="p-2 border-black border-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        responses?.map((response, idx)=>(
                            <SingleMonitor quizQuestions={quizQuestions} key={idx} response={response} />
                        ))
                    }

                </tbody>
            </table>
        </div>
    </div>
  )
}

export default MonitorQuiz