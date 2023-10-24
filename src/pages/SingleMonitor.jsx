import { LiaEyeSolid } from "react-icons/lia";

const SingleMonitor = ({ response, quizQuestions }) => {

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
        <LiaEyeSolid cursor={"pointer"} className="hover:scale-[1.3]" />
      </td>
    </tr>
  );
};

export default SingleMonitor;
