import React from 'react'
import bye from '../../assets/bye.jpg'

const LoggedoutCandidate = () => {
  return (
    <div className='h-[100vh] flex justify-center items-center flex-col'>
      <div className='text-3xl font-semibold'>Thank you for your time</div>
      <img className='w-[100px] h-[100px]' src={bye} alt='bye' />
    </div>
  )
}

export default LoggedoutCandidate