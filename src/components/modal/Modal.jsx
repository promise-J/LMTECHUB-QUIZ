import React, { useEffect, useRef } from "react";
import useSingleQuiz from "../../hooks/useSingleQuiz";

const Modal = ({ isOpen, onClose, proceedButton, cancelButton, title, bodyContent }) => {
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

  return (
    <dialog
      ref={modalRef}
      className="w-[60vw] h-[90vh] t-0 l-0 relative"
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
