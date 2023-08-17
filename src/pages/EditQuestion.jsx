import axios from "axios";
import React, { useRef, useState } from "react";
import { GrFormAdd } from "react-icons/gr";
import { VscPass } from "react-icons/vsc";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditQuestion = () => {
  const { id } = useParams();
  const [addedOptions, setAddedOptions] = useState(false);
  const location = useLocation();
  const fetchedData = location.state;
  const initialState = {
      questionType: fetchedData?.questionType,
      score: fetchedData?.score,
      title: fetchedData?.title,
      option1: fetchedData?.options[0],
      option2: fetchedData?.options[1],
      option3: fetchedData?.options[2],
      option4: fetchedData?.options[3],
      prevCorrectOption: fetchedData?.correctOption,
      options: fetchedData?.options,
      correctOption: ''
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
    prevCorrectOption
  } = questionData;


  const ulRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionData({ ...questionData, [name]: value });
    console.log(correctOption,'the correct option')
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/question", {
        quizId: id,
        options,
        correctOption,
        score,
        questionType,
        title,
      });
      setQuestionData(initialState);
      toast.success("Question created!");
    } catch (error) {
      console.log(error);
    }
  };

  const addOptions = () => {
    if (!option1 || !option2 || !option3 || !option4 || !correctOption) {
      return toast.error("Enter the required fields");
    }
    const optionsArr = [option1, option2, option3, option4];
    setQuestionData({ ...questionData, options: [...optionsArr] });
    setAddedOptions(true);
    toast.success("Options synced! You can proceed to create the question");
  };

  return (
    <div className="mx-1 md:mx-5 my-4 p-3">
      <div className="py-2 flex gap-1 justify-center my-2 flex-column">
        <h1 className="text-5xl font-bold">Quiz: {fetchedData?.quizId?.title}</h1>
        <h1 className="text-4xl">Edit question</h1>
        <h6 className="text-xl">Question Type: </h6>
        <div className="p-1 flex justify-around gap-1">
          <div className="flex flex-column gap-1 flex-1 items-center">
          {questionType === 'objective' && <VscPass size={30} fill="green" fontWeight={600} />}
            <label htmlFor="">Objective</label>
            <input
              className="cursor-pointer"
              name="questionType"
              type="radio"
              value="objective"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-column gap-1 flex-1 items-center">
            {questionType === 'theory' && <VscPass size={30} fill="green" fontWeight={600} />}
            <label htmlFor="">Theory</label>
            <input
              className="cursor-pointer"
              name="questionType"
              type="radio"
              value="theory"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-column gap-1 flex-1 items-center">
          {questionType === 'sub_objective' && <VscPass size={30} fill="green" fontWeight={600} />}
            <label htmlFor="">Sub Theory</label>
            <input
              className="cursor-pointer"
              name="questionType"
              type="radio"
              value="sub_objective"
              onChange={handleChange}
            />
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
        <h6 className="text-xl">Options: </h6>
        <ul className="py-3" ref={ulRef}>
          <div className="my-2">
            <li className="flex items-center">
              <input
                type="radio"
                name="correctOption"
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
                {(!correctOption && prevCorrectOption === 0) || correctOption === 0 && <VscPass size={20} fill="green" fontWeight={600} className="ms-5 mt-2" /> }
            </li>
          </div>
          <div className="my-2">
            <li className="flex items-center">
              <input
                type="radio"
                name="correctOption"
                value={1}
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
        {addedOptions ? (
          <button
            className="bg-purple-100 w-fit py-1 px-2 rounded"
            onClick={handleSubmit}
          >
            Create
          </button>
        ) : (
          <button
            className="bg-purple-100 w-fit py-1 px-2 rounded"
            onClick={addOptions}
          >
            Add Options
          </button>
        )}
      </div>
    </div>
  );
};

export default EditQuestion;
