import React from "react";

const QuizMissing = () => {
  return (
    <div className="h-[100vh] d-flex justify-center items-center flex-column">
      <h1>Seems you weren't invited for this test.</h1>
      <h1>Please check your email for confirmation.</h1>
      <p>Please reach out to <a href="mailto:chiemelapromise30@gmail.com">Admin</a></p>
    </div>
  );
};

export default QuizMissing;
