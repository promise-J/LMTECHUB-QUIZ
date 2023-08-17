import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Loginpage = () => {

  const navigate = useNavigate()

  const handleLogin = (type)=>{
    if(type==='admin'){
      navigate('/dashboard')
    }else{
      navigate('/getting-started')
    }
    //  <Navigate to={'/dashboard'} />
  }

  return (
    <div className="md:p-4">
      <h1 className="font-bold text-3xl text-center my-5 text-sky-300">
        LMTechub Quiz Application
      </h1>
      <div className="md:p-4 flex flex-col md:flex-row justify-around gap-8 md:gap-2">
        <div className="flex-1 md:ps-4">
          <h1 className="text-2xl font-semibold mb-3 text-center">
            For Company
          </h1>
          <div className="p-2">
            <div className="shadow-md rounded md:p-6 md:mt-5  flex flex-col gap-1 md:gap-4 items-center">
              <div className="relative w-full md:w-3/4 p-1">
                <input id="input-email1" type="text" className="h-9 w-[100%] outline-none login-input border-bottom" />
                <label htmlFor="input-email1" className="absolute top-3 left-3 text-gray-500 text-sm">Email</label>
              </div>
              <div className="relative w-full md:w-3/4 p-1">
                <input id="input-password1" type="text" className="h-9 w-[100%] outline-none p-2 login-input border-bottom" />
                <label htmlFor="input-password1" className="absolute top-3 left-3 text-gray-500 text-sm">Password</label>
              </div>
              <div className="relative w-full md:w-3/4 p-1">
                <button onClick={()=> handleLogin('admin')} className="cursor-pointer w-full p-1 bg-green-300 border-none outline-none">Login</button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 md:ps-4">
          <h1 className="text-2xl font-semibold mb-3 text-center">
            For Candidate
          </h1>
          <div className="p-2">
            <div className="rounded shadow-md md:p-6 md:mt-5 flex flex-col gap-1 md:gap-4 items-center">
              <div className="relative w-full md:w-3/4 p-1">
                <input id="input-email2" type="text" className="h-9 w-[100%] outline-none login-input border-bottom" />
                <label htmlFor="input-email2" className="absolute top-3 left-3 text-gray-500 text-sm">Email</label>
              </div>
              <div className="relative w-full md:w-3/4 p-1">
                <input id="input-password2" type="text" className="h-9 w-[100%] outline-none p-2 login-input border-bottom" />
                <label htmlFor="input-password2" className="absolute top-3 left-3 text-gray-500 text-sm">Password</label>
              </div>
              <div className="relative w-full md:w-3/4 p-1">
                <button onClick={()=> handleLogin('candidate')} className="cursor-pointer w-full p-1 bg-green-300 border-none outline-none">Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;