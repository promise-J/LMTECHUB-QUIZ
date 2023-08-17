import axios from "axios";
import React, { useRef, useState } from "react";
import { GrFormAdd } from "react-icons/gr";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

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
    const {id} = useParams()
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

  //   const addOption = () => {
  //     if (confirm("Are you sure you want to add an option?")) {
  //       if (ulRef.current) {
  //         const divEl = document.createElement("div");
  //         const spanEl = document.createElement("span");
  //         const liEl = document.createElement("li");
  //         spanEl.innerText = "F.";
  //         const inputEl = document.createElement("input");
  //         spanEl.setAttribute("className", "me-4");
  //         inputEl.setAttribute("type", "text");
  //         inputEl.setAttribute("placeholder", "option new");
  //         spanEl.classList.add("me-4");
  //         inputEl.classList.add("py-1");
  //         inputEl.classList.add("px-2");
  //         inputEl.classList.add("border");
  //         inputEl.classList.add("outline");
  //         inputEl.classList.add("w-1/2");
  //         divEl.classList.add("my-2");
  //         liEl.appendChild(spanEl);
  //         liEl.appendChild(inputEl);
  //         divEl.appendChild(liEl);
  //         ulRef.current.appendChild(divEl);
  //         //     const el = `
  //         //     <div className="my-2">
  //         //     <li>
  //         //       <span className="me-4">A.</span> <input type="text" className="py-1 px-2 border outline w-1/2" placeholder="option one" />
  //         //     </li>
  //         //   </div>
  //         // `
  //       }
  //     }
  //   };

  //   const bodyContent = (
  //     <div className="mx-5 my-4 p-3">
  //       <div className="py-2 flex gap-1 justify-center my-2 flex-column">
  //         <h6 className="text-xl">Question Type: </h6>
  //         <div className="p-1 flex justify-around">
  //           <div className="flex flex-column gap-1">
  //             <label htmlFor="">Objective</label>
  //             <input
  //               className="cursor-pointer"
  //               name="question-type"
  //               type="radio"
  //             />
  //           </div>
  //           <div className="flex flex-column gap-1">
  //             <label htmlFor="">Theory</label>
  //             <input
  //               className="cursor-pointer"
  //               name="question-type"
  //               type="radio"
  //             />
  //           </div>
  //           <div className="flex flex-column gap-1">
  //             <label htmlFor="">Sub Theory</label>
  //             <input
  //               className="cursor-pointer"
  //               name="question-type"
  //               type="radio"
  //             />
  //           </div>
  //         </div>
  //       </div>
  //       <div className="py-2 flex gap-5 items-center my-2">
  //         <h6 className="text-xl">Score: </h6>
  //         <input
  //           type="number"
  //           placeholder="Enter Score"
  //           className="border outline-none rounded py-1 px-2 w-1/2"
  //         />
  //       </div>
  //       <div className="py-2 flex gap-5 items-center my-2">
  //         <h6 className="text-xl">Title: </h6>
  //         <input
  //           type="number"
  //           placeholder="Enter Question"
  //           className="border outline-none rounded py-1 px-2 w-1/2"
  //         />
  //       </div>
  //       <div className="py-2 flex gap-1 justify-center my-2 flex-column">
  //         <h6 className="text-xl">Options: </h6>
  //         <ul className="py-3" ref={ulRef}>
  //           <div className="my-2">
  //             <li className="flex items-center">
  //               <input
  //                 type="radio"
  //                 name="option"
  //                 id="option1"
  //                 className="me-3 option-input"
  //               />
  //               <label htmlFor="option1"></label>
  //               <span className="me-4">A.</span>{" "}
  //               <input
  //                 type="text"
  //                 className="py-1 px-2 border outline w-1/2"
  //                 placeholder="option one"
  //               />
  //             </li>
  //           </div>
  //           <div className="my-2">
  //             <li className="flex items-center">
  //               <input
  //                 type="radio"
  //                 name="option"
  //                 id="option2"
  //                 className="me-3 option-input"
  //               />
  //               <label htmlFor="option2"></label>
  //               <span className="me-4">B.</span>{" "}
  //               <input
  //                 type="text"
  //                 className="py-1 px-2 border outline w-1/2"
  //                 placeholder="option two"
  //               />
  //             </li>
  //           </div>
  //           <div className="my-2">
  //             <li className="flex items-center">
  //               <input
  //                 type="radio"
  //                 name="option"
  //                 id="option3"
  //                 className="me-3 option-input"
  //               />
  //               <label htmlFor="option3"></label>
  //               <span className="me-4">C.</span>{" "}
  //               <input
  //                 type="text"
  //                 className="py-1 px-2 border outline w-1/2"
  //                 placeholder="option three"
  //               />
  //             </li>
  //           </div>
  //           <div className="my-2">
  //             <li className="flex items-center">
  //               <input
  //                 type="radio"
  //                 name="option"
  //                 id="option4"
  //                 className="me-3 option-input"
  //               />
  //               <label htmlFor="option4"></label> <span className="me-4">D.</span>{" "}
  //               <input
  //                 type="text"
  //                 className="py-1 px-2 border outline w-1/2"
  //                 placeholder="option four"
  //               />
  //             </li>
  //           </div>
  //         </ul>
  //         {/* <button onClick={addOption}>Add option</button> */}
  //       </div>
  //     </div>
  //   );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionData({ ...questionData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await axios.post('http://localhost:5000/api/question', {quizId: id, options, correctOption, score, questionType, title})
        setQuestionData(initialState)
        toast.success('Question created!')
    } catch (error) {
        console.log(error)
    }
  };

  const addOptions = ()=>{
    if (!option1 || !option2 || !option3 || !option4 || !correctOption) {
        return toast.error("Enter the required fields");
      }
      const optionsArr = [option1, option2, option3, option4];
      setQuestionData({ ...questionData, options: [...optionsArr] });
      setAddedOptions(true)
      toast.success('Options synced! You can proceed to create the question')
  }

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

export default CreateQuestion;
