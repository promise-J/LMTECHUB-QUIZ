import React from "react";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
    const navigate = useNavigate()
    
  return (
    <div className="py-4 px-2">
      <div className="py-2 px-4 flex justify-between">
        <div className="">
          <h1 className="text-6xl">Welcome Martins,</h1>
          <h4 className="font-bold text-4xl text-muted my-3">
            Quiz: Software engineering II
          </h4>
        </div>
        <div className="px-3 flex flex-column justify-center">
          <h3>Questions: </h3>
          <p className="text-2xl">40</p>
        </div>
        <div className="px-3 flex flex-column justify-center">
          <h3>Duration: </h3>
          <p className="text-2xl">40 mins</p>
        </div>
      </div>
      <div className="p-4 flex justify-center items-center">
        <div className="w-[50%] rounded-2xl p-3 mt-5 shadow-md">
            <h3 className="font-semibold text-2xl my-2">Instructions</h3>
            <ul className="flex flex-column gap-1 list-disc ms-2">
                <li>Do not refresh this page for any reason</li>
                <li>Make sure your internet connection is stable</li>
                <li>Malpractice is evil! We don't endorse it</li>
            </ul>
            <button onClick={()=> navigate('/start-quiz')} className="bg-blue-300 mt-4 py-1 rounded px-5">Start</button>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
