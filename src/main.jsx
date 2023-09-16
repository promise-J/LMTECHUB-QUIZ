import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContextProvider } from "./context/Usercontext.jsx";
import 'bootstrap/dist/css/bootstrap.css';


ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <>
    <UserContextProvider>
      <ToastContainer
        position="top-right"
        hideProgressBar={true}
        limit={1}
        theme="colored"
      />
      <App />
    </UserContextProvider>
  </>
  // </React.StrictMode>,
);
