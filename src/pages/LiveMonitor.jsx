import React, { useEffect, useState } from 'react'
import {FcCheckmark} from 'react-icons/fc'
import {ImCancelCircle} from 'react-icons/im'
import { useLocation, useParams } from 'react-router-dom'
import createHttpRequest from '../api/httpRequest'
import { GET_ACTION } from '../libs/routes_actions'
import { ROUTE_RESPONSE } from '../libs/routes'

const LiveMonitor = () => {
    const {state: {quizQuestions}} = useLocation()
    const {responseId} = useParams()
    const [response, setResponse] = useState([])
    const [timeLeft, setTimeLeft] = useState(0)
    const [candidate, setCandidate] = useState('')

    useEffect(()=>{
        const getResponse = async ()=>{
            const {data: {message}} = await createHttpRequest(GET_ACTION, `${ROUTE_RESPONSE}/${responseId}`)
            setResponse(message.response)
            setTimeLeft(message.timeLeft)
            setCandidate(message.email)
        }
        getResponse()
    },[responseId])

    function displayRating(userValue, actualValue){
        if(userValue){
            const result = userValue == actualValue ? <FcCheckmark className='ms-4' /> : <ImCancelCircle fill='red' className='ms-4' />
            return result
        }
        return null
    }

  return (
    <div className='p-2 md:p-4 flex justify-center'>
        <div className='w-full md:w-2/3 p-3 shadow shadow-md'>
            <h5 className='text-center'>Report on {candidate}</h5>
            <p>Time remaining: {timeLeft} minutes</p>
            {
                quizQuestions.map((q, i)=>(
            <div key={q._id} className='mb-4'>
                <h3>{q.title}</h3>
                
                <p>Correct Answer - {q.options[q.correctOption]}</p>
                <p className='flex'>User's Choice - {q.options[response[i]]} {displayRating(q.options[response[i]], q.options[q.correctOption])} </p>
            </div>

                ))
            }
        </div>
    </div>
  )
}

export default LiveMonitor