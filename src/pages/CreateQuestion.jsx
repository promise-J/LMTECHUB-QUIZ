import React, { useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import createHttpRequest from "../api/httpRequest";
import { POST_ACTION } from "../libs/routes_actions";
import { ROUTE_POST_QUESTION } from "../libs/routes";
import { X_TOKEN } from "../libs/constants";

const initialState = {
  questionType: "",
  score: 0,
  title: "",
  option1: "",
  option2: "",
  option3: "",
  option4: "",
  correctOption: "",
  options: [],
};

const CreateQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [questionData, setQuestionData] = useState(initialState);
  const [addedOptions, setAddedOptions] = useState(false);
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
  } = questionData;

  const ulRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionData({ ...questionData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem(X_TOKEN)
    try {
      const res = await createHttpRequest(POST_ACTION, ROUTE_POST_QUESTION, {
        quizId: id,
        options,
        correctOption,
        score,
        questionType,
        title,
      }, token);
      setQuestionData(initialState);
      setAddedOptions(false)
      toast.success("Question created!");
      navigate(`/dashboard/viewquiz/${id}`)
    } catch (error) {
      toast.error("Something went wrong. Try again!");
      console.log(error);
    }
  };

  const addOptions = () => {
    if (!questionType || !title || !score) {
      return toast.error("Please enter a score, title and question type");
    }
    if (!option1 || !option2 || !option3 || !option4) {
      return toast.error("Enter the options field");
    }
    if (!correctOption) {
      return toast.error(
        "Indicate the correct answer by checking the box beside the correct option"
      );
    }
    const optionsArr = [option1, option2, option3, option4];
    setQuestionData({ ...questionData, options: [...optionsArr] });
    setAddedOptions(true);
    toast.success("Options synced! You can proceed to create the question");
    const opts = [];
    opts[0] = option1;
    opts[1] = option2;
    opts[2] = option3;
    opts[3] = option4;
    setQuestionData({ ...questionData, options: opts });
  };

  return (
    <div className="mx-1 md:mx-5 my-4 p-3">
      <div className="py-2 flex gap-1 justify-center my-2 flex-column">
        <h6 className="text-xl">Question Type: </h6>
        <div className="p-1 flex justify-around gap-1">
          <div className="flex flex-column gap-1 flex-1 items-center">
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
            </li>
          </div>
        </ul>
        {addedOptions ? (
          <button
            className="bg-purple-400 w-fit py-1 px-2 rounded"
            onClick={handleSubmit}
          >
            Create
          </button>
        ) : (
          <button
            className="bg-purple-400 w-fit py-1 px-2 rounded animate-pulse"
            onClick={addOptions}
          >
            Sync Options
          </button>
        )}
        <Link to={`/dashboard/viewquiz/${id}`} style={{marginTop: '15px'}}>Return to Quiz</Link>
      </div>
    </div>
  );
};

export default CreateQuestion;
