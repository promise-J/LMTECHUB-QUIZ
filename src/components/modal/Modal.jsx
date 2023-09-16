import React, { useEffect, useRef } from "react";
import useSingleQuiz from "../../hooks/useSingleQuiz";

const Modal = ({ isOpen, onClose, proceedButton, cancelButton, title, bodyContent, lone }) => {
    const singleQuizHook = useSingleQuiz()

  const modalRef = useRef(null);
  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  const isClickInsideRectangle = (e, element) => {
    const r = element.getBoundingClientRect();

    return e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom;
  };

  if(lone){
    return (
      <dialog ref={modalRef} className="w-[100vw] h-[100vh] bg-blue-400 top-0 left-0 relative"
      onClick={(e)=> modalRef.current && !isClickInsideRectangle(e, modalRef.current) && onClose()}
      >
        {bodyContent}
      </dialog>
    )
  }

  return (
    <dialog
      ref={modalRef}
      className="w-[60vw] h-[90vh] t-0 l-0 relative modal-open"
      onClick={(e)=> modalRef.current && !isClickInsideRectangle(e, modalRef.current) && onClose()}
    >
      <h1 className="text-4xl ms-4 mt-4">{title}</h1>
      {bodyContent}
      {cancelButton()}
      {proceedButton()}
    </dialog>
  );
};

export default Modal;
