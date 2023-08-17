import React, { useRef } from "react";
import Modal from "./Modal";
import { GrFormAdd } from "react-icons/gr";
import useCreateQuestion from "../../hooks/useCreateQuestion";

const CreateQuestionModal = () => {
  const createQuestion = useCreateQuestion();
  const ulRef = useRef(null);

  const cancelButton = () => (
    <button
      className="absolute bottom-12 left-20 text-red-500 border-none py-1 px-4 hover:bg-red-500 hover:text-white outline-none"
      onClick={() => createQuestion.onClose()}
    >
      Close
    </button>
  );

  const proceedButton = () => (
    <button className="absolute bottom-12 right-20 text-blue-500 border-none py-1 px-4 hover:bg-blue-500 hover:text-white">
      Create
    </button>
  );

  const addOption = () => {
    if (confirm("Are you sure you want to add an option?")) {
      if (ulRef.current) {
        const divEl = document.createElement("div");
        const spanEl = document.createElement("span");
        const liEl = document.createElement("li");
        spanEl.innerText = "F.";
        const inputEl = document.createElement("input");
        spanEl.setAttribute("className", "me-4");
        inputEl.setAttribute("type", "text");
        inputEl.setAttribute("placeholder", "option new");
        spanEl.classList.add("me-4");
        inputEl.classList.add("py-1");
        inputEl.classList.add("px-2");
        inputEl.classList.add("border");
        inputEl.classList.add("outline");
        inputEl.classList.add("w-1/2");
        divEl.classList.add("my-2");
        liEl.appendChild(spanEl);
        liEl.appendChild(inputEl);
        divEl.appendChild(liEl);
        ulRef.current.appendChild(divEl);
        //     const el = `
        //     <div className="my-2">
        //     <li>
        //       <span className="me-4">A.</span> <input type="text" className="py-1 px-2 border outline w-1/2" placeholder="option one" />
        //     </li>
        //   </div>
        // `
      }
    }
  };

  const bodyContent = (
    <div className="mx-5 my-4 p-3">
      <div className="py-2 flex gap-1 justify-center my-2 flex-column">
        <h6 className="text-xl">Question Type: </h6>
        <div className="p-1 flex justify-around">
          <div className="flex flex-column gap-1">
            <label htmlFor="">Objective</label>
            <input
              className="cursor-pointer"
              name="question-type"
              type="radio"
            />
          </div>
          <div className="flex flex-column gap-1">
            <label htmlFor="">Theory</label>
            <input
              className="cursor-pointer"
              name="question-type"
              type="radio"
            />
          </div>
          <div className="flex flex-column gap-1">
            <label htmlFor="">Sub Theory</label>
            <input
              className="cursor-pointer"
              name="question-type"
              type="radio"
            />
          </div>
        </div>
      </div>
      <div className="py-2 flex gap-5 items-center my-2">
        <h6 className="text-xl">Score: </h6>
        <input
          type="number"
          placeholder="Enter Score"
          className="border outline-none rounded py-1 px-2 w-1/2"
        />
      </div>
      <div className="py-2 flex gap-5 items-center my-2">
        <h6 className="text-xl">Title: </h6>
        <input
          type="number"
          placeholder="Enter Question"
          className="border outline-none rounded py-1 px-2 w-1/2"
        />
      </div>
      <div className="py-2 flex gap-1 justify-center my-2 flex-column">
        <h6 className="text-xl">Options: </h6>
        <ul className="py-3" ref={ulRef}>
          <div className="my-2">
            <li className="flex items-center">
              <input
                type="radio"
                name="option"
                id="option1"
                className="me-3 option-input"
              />
              <label htmlFor="option1"></label>
              <span className="me-4">A.</span>{" "}
              <input
                type="text"
                className="py-1 px-2 border outline w-1/2"
                placeholder="option one"
              />
            </li>
          </div>
          <div className="my-2">
            <li className="flex items-center">
              <input
                type="radio"
                name="option"
                id="option2"
                className="me-3 option-input"
              />
              <label htmlFor="option2"></label>
              <span className="me-4">B.</span>{" "}
              <input
                type="text"
                className="py-1 px-2 border outline w-1/2"
                placeholder="option two"
              />
            </li>
          </div>
          <div className="my-2">
            <li className="flex items-center">
              <input
                type="radio"
                name="option"
                id="option3"
                className="me-3 option-input"
              />
              <label htmlFor="option3"></label> 
              <span className="me-4">C.</span>{" "}
              <input
                type="text"
                className="py-1 px-2 border outline w-1/2"
                placeholder="option three"
              />
            </li>
          </div>
          <div className="my-2">
            <li className="flex items-center">
              <input
                type="radio"
                name="option"
                id="option4"
                className="me-3 option-input"
              />
              <label htmlFor="option4"></label> <span className="me-4">D.</span>{" "}
              <input
                type="text"
                className="py-1 px-2 border outline w-1/2"
                placeholder="option four"
              />
            </li>
          </div>
        </ul>
        {/* <button onClick={addOption}>Add option</button> */}
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={createQuestion.isOpen}
      onClose={createQuestion.onClose}
      cancelButton={cancelButton}
      title="Create Question"
      bodyContent={bodyContent}
      proceedButton={proceedButton}
    />
  );
};

export default CreateQuestionModal;
