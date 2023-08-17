import React, { useEffect, useState } from "react";

const AnswerPad = ({
  idx,
  quests,
  questionNumber,
  op,
  handleAnswer,
  answers,
  selected
}) => {
  const [currentAnswer, setCurrentAnswer] = useState(null);

  useEffect(() => {
    const result = answers.find((ans) => ans.qIdx === questionNumber + 1);
    if (result) {
      setCurrentAnswer(result);
    }
  }, [answers]);

  const uniq = answers.find(a=> a.qIdx === questionNumber)
  console.log(answers)

  // console.log(selected, 'the selected')
  // console.log(currentAnswer?.ansIdx === idx, "equality check", op);
  // console.log({questionNumber: answers}, questionNumber)

  return (
    <div
      onClick={() =>
        handleAnswer(quests[questionNumber], quests[questionNumber].id, idx)
      }
      className="cursor-pointer my-2 text-md border-1 relative"
    >
      <div className={`p-3 ${(uniq?.qIdx === questionNumber && idx=== uniq?.ansIdx) ? 'bg-green-500' : 'bg-white'} ${uniq?.qIdx === questionNumber && idx === uniq?.ansIdx ? 'text-white ease-out duration-500 scale-105' : 'text-black'}`}>{op}</div>
    </div>
  );
};

export default AnswerPad;
