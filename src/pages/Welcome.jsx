import React from 'react'
import Header from '../components/Header'
import welcomeImg from '/candidate.jpeg'
import { useNavigate } from 'react-router-dom'
import CountUpHook from '../components/CountUpHook'
import {BsHouses} from 'react-icons/bs'
import {BiBadge} from 'react-icons/bi'
import {GrUserWorker} from 'react-icons/gr'

const Welcome = () => {
  const navigate = useNavigate()
  return (
    <div className=''>
     <Header />
     <div className='md:p-5 p-3'>
      <div className='flex gap-3 p-2 welcome-header'>
        <div className='flex-1 p-3 flex flex-col justify-center'>
          <div className=''>
          <h1 data-aos="fade-down-left"  style={{lineHeight: '1.3'}} className='md:text-5xl lg:text-6xl'>Number one platform for Testing. Where Interviewer meets Interviewee.</h1>
          <p style={{lineHeight: '2'}} className='text-xl my-3 text-red-500' data-aos='fade-up'>What else can you ask for? We are committed to serving you. We provide a conducive, secured and robust environment.
             We know how fraustrating other platforms can be that's why we got you covered
          </p>
          <button data-aos='slide-left' style={{backgroundColor: 'rgb(245,158,10)'}} onClick={()=> navigate('/login')} className='py-2 md:py-4 px-4 rounded text-white mt-3 ' >Getting Started</button>
        </div>
        </div>
        <div className='flex-1' data-aos='zoom-in'>
          <img src={welcomeImg} alt="welcome" className='h-auto w-full' />
        </div>
      </div>
     </div>
     <div className="md:p-5 p-3">
       <h1 className='text-center my-4'>What you should know about us</h1>
       <div className='p-3 flex flex-wrap gap-1 md:gap-5'>
        <div data-aos='slide-up' className='flex-1 flex p-5 justify-center flex-col items-center '>
          <BsHouses size={30} className='mb-3' data-aos='fade-down-left' />
          <h4>Companies</h4>
        <CountUpHook name={'counter'} end={400} />
        </div>
        <div data-aos='slide-up' className='flex-1 flex p-5 justify-center flex-col items-center'>
          <GrUserWorker size={30} className='mb-3' data-aos='fade-down-left' />
          <h4>Candidates</h4>
        <CountUpHook name={'counter1'} end={300} />
        </div>
        <div data-aos='slide-up' className='flex-1 flex p-5 justify-center flex-col items-center'>
          <BiBadge size={30} className='mb-3' data-aos='fade-down-left' />
          <h4>Hires</h4>
        <CountUpHook name={'counter2'} end={200} />
        </div>
        
       </div>
     </div>
     <div className="w-full h-[80vh] bg-cover bg-center" style={{backgroundImage: 'url(/company.jpeg)'}}>

     </div>
     <footer className='p-5 grid md:grid-cols-4 grid-cols-1 sm:grid-cols-2 gap-1 lg:grid-cols-5 gap-5 md:gap-3'>
       <div className='gap-2 flex flex-col items-center'>
        <span>Contact us</span>
        <span>About us</span>
        <span>What we are saying</span>
       </div>
       <div className='gap-2 flex flex-col items-center'>
        <span>About us</span>
        <span>Contact us</span>
        <span>Handle now</span>
       </div>
       <div className='gap-2 flex flex-col items-center'>
        <span>About us</span>
        <span>Contact us</span>
        <span>Policy and Privacy</span>
       </div>
       <div className='gap-2 flex flex-col items-center'>
        <span>What we are saying</span>
        <span>Contact us</span>
        <span>About us</span>
       </div>
       <div className='gap-2 flex flex-col items-center'>
        <span>Up for you</span>
        <span>About us</span>
        <span>Contact us</span>
       </div>
     </footer>
    </div>
  )
}

export default Welcome