import { LiaEyeSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

const SingleMonitor = ({ response, quizQuestions }) => {
  const navigate = useNavigate()

  const handleNavigate = (response)=>{
    navigate(`/dashboard/live-monitor/${response._id}`, {state: {quizQuestions, response}})
  }

  return (
    <tr className="border">
      <td className="p-2 border-black border-2 font-bold">
        {response?.email}
      </td>
      <td className="p-2 border-black border-2">{response?.score} / {quizQuestions.length}</td>
      <td className="p-2 border-black border-2">{(!['COMPLETED', 'IN-PROGRESS'].includes(response?.responseStatus) && response?.timeLeft === 0) ? 'N/A' : response?.timeLeft + 'mins'}</td>
      <td className={`p-2 border-black border-2 ${response.responseStatus === 'COMPLETED' ? 'text-green-500' : response.responseStatus === 'IN-PROGRESS' ? 'text-yellow-500' : 'text-red-500'} ${response.responseStatus === 'IN-PROGRESS' && 'animate-pulse'} font-bold`}>
        {response.responseStatus}
      </td>
      <td className="p-2 border-black border-2">
          <LiaEyeSolid onClick={()=> handleNavigate(response)} cursor={"pointer"} className="hover:scale-[1.3]" />
      </td>
    </tr>
  );
};

export default SingleMonitor;
