import React from 'react'
import { useNavigate } from 'react-router-dom'

const SuccessPage = () => {
    const navigate = useNavigate()

    const logout = ()=>{
      localStorage.removeItem('x-token')
      navigate('/quiz/ended', {state: {}})
    }

  return (
    <div className='p-4 h-[100vh] flex items-center justify-center'>
        <div className="p-5 w-2/4 shadow-md">
            <h1 className='text-4xl font-bold'>Your response has been sent for this Quiz. Your result will be out within 24 hours</h1>
            <button onClick={logout} className='border py-1 px-3 my-3 rounded-lg bg-blue-400 text-white'>Return to Homepage</button>
        </div>
    </div>
  )
}

export default SuccessPage