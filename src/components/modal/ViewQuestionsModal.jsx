import React from "react";
import Modal from "./Modal";
import useViewQuiz from "../../hooks/useViewQuiz";
import {AiOutlineEdit} from 'react-icons/ai'
import {RiDeleteBinLine} from 'react-icons/ri'



const ViewQuestionsModal = () => {
  const viewQuizHook = useViewQuiz();

  const cancelButton = () => (
    <button className="absolute bottom-12 left-20 text-red-500 border-none py-1 px-4 hover:bg-red-500 hover:text-white outline-none" onClick={() => viewQuizHook.onClose()}>Close</button>
  );

  const proceedButton = ()=> (
    <button className="absolute bottom-12 right-20 text-blue-500 border-none py-1 px-4 hover:bg-blue-500 hover:text-white">Save</button>
  )

  const bodyContent = (
    <div className="mx-3 my-4 p-3">
        <div className="p-2 flex items-center justify-between border-b border-gray-5 pb-3">
            <h6 className="font-semibold text-lg">Is Http an API or Protocol?</h6>
            <div className="flex items-center gap-10">
                <p>40 mins</p>
                <div className="flex gap-2">
                    <AiOutlineEdit cursor={'pointer'} size={20} />
                    <RiDeleteBinLine cursor={'pointer'} size={20} />
                </div>
            </div>
        </div>
        <div className="p-2 flex items-center justify-between border-b border-gray-5 pb-3">
            <h6 className="font-semibold text-lg">Which of these styles will be applied to the element</h6>
            <div className="flex items-center gap-10">
                <p>10 mins</p>
                <div className="flex gap-2">
                    <AiOutlineEdit cursor={'pointer'} size={20} />
                    <RiDeleteBinLine cursor={'pointer'} size={20} />
                </div>
            </div>
        </div>
        <div className="p-2 flex items-center justify-between border-b border-gray-5 pb-3">
            <h6 className="font-semibold text-lg">What is the full meaning of HTTP</h6>
            <div className="flex items-center gap-10">
                <p>25 mins</p>
                <div className="flex gap-2">
                    <AiOutlineEdit cursor={'pointer'} size={20} />
                    <RiDeleteBinLine cursor={'pointer'} size={20} />
                </div>
            </div>
        </div>
    </div>
  )

  return (
    <Modal
      isOpen={viewQuizHook.isOpen}
      onClose={viewQuizHook.onClose}
      cancelButton={cancelButton}
      title='Review Questions'
      bodyContent={bodyContent}
      proceedButton={proceedButton}
    />
  );
};

export default ViewQuestionsModal;
