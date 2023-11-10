import React, { useRef, useState } from "react";
import { VscPass } from "react-icons/vsc";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import baseUrl from "../api/baseUrl";
import createHttpRequest from "../api/httpRequest";
import { PUT_ACTION } from "../libs/routes_actions";
import { ROUTE_QUESTION } from "../libs/routes";
import { X_TOKEN } from "../libs/constants";

const EditQuestion = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [addedOptions, setAddedOptions] = useState(false);
  const location = useLocation();
  const fetchedData = location.state;
  const initialState = {
      questionType: fetchedData?.questionType,
      questionId: fetchedData?._id,
      score: fetchedData?.score,
      title: fetchedData?.title,
      option1: fetchedData?.options[0],
      option2: fetchedData?.options[1],
      option3: fetchedData?.options[2],
      option4: fetchedData?.options[3],
      theory_value: fetchedData?.theory,
      subobjective_value: fetchedData?.theory,
      prevCorrectOption: fetchedData?.correctOption,
      options: fetchedData?.options,
      correctOption: fetchedData?.correctOption
    };
    

    const [questionData, setQuestionData] = useState(initialState);

  const {
    title,
    score,
    questionType,
    options,
    option1,
    option2,
    option3,
    option4,
    correctOption,
    theory_value,
    subobjective_value,
    questionId
  } = questionData;



  const ulRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionData({ ...questionData, [name]: value });
  };

  const handleSubmit = async (e) => {
    const token = localStorage.getItem(X_TOKEN)
    e.preventDefault();
    try {
      await createHttpRequest(PUT_ACTION, `${ROUTE_QUESTION}/${questionId}`, {
        quizId: id,
        options,
        correctOption,
        score,
        questionType,
        title,
      }, token)
      setQuestionData(initialState);
      toast.success("Question edited!", {autoClose: 2000});
      navigate(`/dashboard/viewQuestions/${id}`)
    } catch (error) {
      toast.error(error?.response?.data?.message)
      console.log(error);
    }
  };

  const addOptions = () => {
    if (!option1 || !option2 || !option3 || !option4) {
      return toast.error("Enter the options fields");
    }
    const optionsArr = [option1, option2, option3, option4];
    setQuestionData({ ...questionData, options: [...optionsArr] });
    setAddedOptions(true);
    toast.success("Options synced! You can proceed to create the question", {autoClose: 2000});
  };

  return (
    <div className="mx-1 md:mx-5 my-4 p-3">
      <div className="py-2 flex gap-1 justify-center my-2 flex-column">
        <h1 className="text-5xl font-bold">Quiz: {fetchedData?.quizId?.title}</h1>
        <h1 className="text-4xl">Edit question</h1>
        <h6 className="text-xl">Question Type: </h6>
        <div className="p-1 flex gap-1">
          <div className="flex  gap-1 flex-1 items-center">
            <VscPass size={30} fill="green" fontWeight={600} />
            <label htmlFor="">{fetchedData.questionType}</label>
            {/* <input
              className="cursor-pointer"
              defaultChecked
              type="radio"
            /> */}
          </div>
        </div>
      </div>
      <div className="py-2 flex gap-5 items-center my-2">
        <h6 className="text-xl">Score: </h6>
        <input
          type="number"
          placeholder="Enter Score"
          className="border outline-none rounded py-1 px-2 w-[100%] md:w-1/2"
          name="score"
          value={score}
          onChange={handleChange}
        />
      </div>
      <div className="py-2 flex gap-5 items-center my-2">
        <h6 className="text-xl">Title: </h6>
        <input
          type="text"
          placeholder="Enter Question"
          className="border outline-none rounded py-1 px-2 w-[100%] md:w-1/2"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </div>
      <div className="py-2 flex gap-1 justify-center my-2 flex-column">
        {/* Questions type check starts */}
        {
          questionType === 'objective' ?
        <>
        <h6 className="text-xl">Options: </h6>
        <ul className="py-3" ref={ulRef}>
          <div className="my-2">
            <li className="flex items-center">
              <input
                type="radio"
                name="correctOption"
                defaultChecked={correctOption=== 0}
                value={0}
                id="correctOption1"
                className="me-3 option-input"
                onChange={handleChange}
              />
              <label htmlFor="correctOption1"></label>
              <span className="me-4">A.</span>{" "}
              <input
                type="text"
                className="py-1 px-2 border outline w-[100%] md:w-1/2"
                placeholder="option one"
                name="option1"
                value={option1}
                onChange={handleChange}
              />
                {correctOption === 0 && <VscPass size={20} fill="green" fontWeight={600} className="ms-5 mt-2" /> }
            </li>
          </div>
          <div className="my-2">
            <li className="flex items-center">
              <input
                type="radio"
                name="correctOption"
                value={1}
                defaultChecked={correctOption=== 1}
                id="correctOption2"
                className="me-3 option-input"
                onChange={handleChange}
              />
              <label htmlFor="correctOption2"></label>
              <span className="me-4">B.</span>{" "}
              <input
                type="text"
                className="py-1 px-2 border outline w-[100%] md:w-1/2"
                placeholder="option two"
                name="option2"
                value={option2}
                onChange={handleChange}
              />
                {correctOption === 1 && <VscPass size={20} fill="green" fontWeight={600} className="ms-5 mt-2" />}

            </li>
          </div>
          <div className="my-2">
            <li className="flex items-center">
              <input
                type="radio"
                name="correctOption"
                value={2}
                defaultChecked={correctOption=== 2}
                id="correctOption3"
                className="me-3 option-input"
                onChange={handleChange}
              />
              <label htmlFor="correctOption3"></label>
              <span className="me-4">C.</span>{" "}
              <input
                type="text"
                className="py-1 px-2 border outline w-[100%] md:w-1/2"
                placeholder="option three"
                name="option3"
                value={option3}
                onChange={handleChange}
              />
                {correctOption === 2 && <VscPass size={20} fill="green" fontWeight={600} className="ms-5 mt-2" />}
            </li>
          </div>
          <div className="my-2">
            <li className="flex items-center">
              <input
                type="radio"
                name="correctOption"
                value={3}
                defaultChecked={correctOption=== 3}
                id="correctOption4"
                className="me-3 option-input"
                onChange={handleChange}
                />
              <label htmlFor="correctOption4"></label>
              <span className="me-4">D.</span>{" "}
              <input
                type="text"
                className="py-1 px-2 border outline w-[100%] md:w-1/2"
                placeholder="option four"
                name="option4"
                value={option4}
                onChange={handleChange}
                />
                {correctOption === 3 && <VscPass size={20} fill="green" fontWeight={600} className="ms-5 mt-2" />}
            </li>
          </div>
        </ul>
        </> : 
        questionType === 'theory' ?
        <>
        <label>Theory's answer</label>
        <input type="text" className="border outline-none rounded py-1 px-2 w-[100%] md:w-1/2" placeholder="Enter your answer" value={theory_value} name="theory_value" onChange={handleChange} />
       </> :
       questionType === 'subobjective' ?
          <>
          <label>Subobjective's answer</label>
          <input type="text" className="border outline-none rounded py-1 px-2 w-[100%] md:w-1/2" placeholder="Enter your answer" value={subobjective_value} name="subobjective_value" onChange={handleChange} />
            </>: 
        null
        }
        {/* Questions type check starts */}

        {(!addedOptions && questionType == 'objective') ? (
          <button className="bg-gray-200 hover:bg-gray-100 w-fit py-1 px-2 rounded" onClick={handleSubmit}> Edit</button>
          ) : (!addedOptions && questionType === 'theory') ? (
            <button className="bg-gray-200 hover:bg-gray-100 w-fit py-1 px-2 rounded" onClick={handleSubmit}> Edit</button>
          ) : (addedOptions && questionType == 'objective') ?
          (
            <button className="bg-gray-200 hover:bg-gray-100 w-fit py-1 px-2 rounded animate-pulse" onClick={addOptions}> Sync Options</button>
          ) :
           null
           }
      </div>
    </div>
  );
};

export default EditQuestion;
