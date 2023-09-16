import axios from "axios";
import React, { useEffect, useState } from "react";
import { LiaEyeSolid } from "react-icons/lia";
import baseUrl from "../api/baseUrl";
import LoadingLogo from "../components/loading/LoadingLogo";
import { getWebSocket } from "../context/websocket";

const SingleMonitor = ({ response, quizQuestions }) => {
  const [userCandidate, setUserCandidate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseAnswer, setResponseAnswer] = useState([]);
  const [timeleft, setTimeleft] = useState(0);

  useEffect(() => {
    const ws = getWebSocket();
    if (ws.readyState === WebSocket.OPEN) {
      ws.addEventListener("message", ({ data }) => {
        data = JSON.parse(data);
        const { answers, quizId, remainingMinutes, userId } = data;
        if (userId === userCandidate?._id && quizQuestions[0].quizId._id === quizId) {
          setTimeleft(remainingMinutes);
          console.log(remainingMinutes, "from the monitor sideuuuuu");
          setResponseAnswer(answers);
        }
      });
    }
  });

  // useEffect(() => {
  //   const token = localStorage.getItem("x-token");
  //   const getUserByEmail = async () => {
  //     try {
  //       setLoading(true);
  //       const res = await axios.get(`${baseUrl}/user/${candidate}`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       setUserCandidate(res.data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getUserByEmail();
  // }, [candidate]);

  // console.log(score, 'the compute function')

  if (loading) {
    return <LoadingLogo />;
  }

  return (
    <tr className="border">
      <td className="p-2 border-black border-2 font-bold">
        {response?.email}
      </td>
      <td className="p-2 border-black border-2">{response?.score} / {quizQuestions.length}</td>
      <td className="p-2 border-black border-2">{timeleft} mins</td>
      <td className="p-2 border-black border-2 text-yellow-500 animate-pulse font-bold">
        {response.responseStatus}
      </td>
      <td className="p-2 border-black border-2">
        <LiaEyeSolid cursor={"pointer"} className="hover:scale-[1.3]" />
      </td>
    </tr>
  );
};

export default SingleMonitor;
