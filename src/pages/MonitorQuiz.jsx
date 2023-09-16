import React, { useEffect, useState } from 'react'
import { LiaEyeSolid } from "react-icons/lia";
import { getWebSocket } from '../context/websocket';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import baseUrl from '../api/baseUrl';
import LoadingLogo from '../components/loading/LoadingLogo';
import SingleMonitor from './SingleMonitor';


const MonitorQuiz = () => {
    const [responseAnswer, setResponseAnswer] = useState([])
    const {state: {quizId}} = useLocation()
    const [quizQuestions, setQuizQuestions] = useState([])
    const [quiz, setQuiz] = useState(null)
    const [responses, setResponses] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        const getQuiz = async()=>{
            setLoading(true)
            const resQuizQuestion = await axios.get(`${baseUrl}/quiz/questions/${quizId}`)
            const resQuiz = await axios.get(`${baseUrl}/quiz/${quizId}`)
            setQuizQuestions(resQuizQuestion.data)
            setQuiz(resQuiz.data)
            setLoading(false)
        }
        getQuiz()
    },[quizId])

    useEffect(()=>{
        const getResponse = async()=>{
            try {
                const res = await axios.get(`${baseUrl}/quiz/response/${quizId}`)
                setResponses(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getResponse()
    },[quizId])

    // useEffect(()=>{
    //     const ws = getWebSocket()
    //     if(ws.readyState === WebSocket.OPEN){
    //       ws.addEventListener('message', ({data})=>{
    //         data = JSON.parse(data)
    //         const {answers} = data
    //         console.log(answers)
    //         setResponseAnswer(answers)
    //       })
    //     }
    //   })

    //   const res = computeResult(quizQuestions, responseAnswer)
    //   console.log(res, 'the compute function')

    //   function computeResult(actualAnswers, userAnswers){
    //     let correctly = 0
    //     actualAnswers.forEach((answer, idx)=>{
    //         if(answer.correctOption === userAnswers[idx]){
    //             correctly++
    //         }
    //     })
    //     return correctly
    //   }

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