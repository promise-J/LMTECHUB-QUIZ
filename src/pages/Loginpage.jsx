import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/Usercontext";
import { toast } from "react-toastify";
import sendSocketMessage from "../context/sendSocketMessage";
import { getWebSocket } from "../context/websocket";
import createHttpRequest from "../api/httpRequest";
import { ROUTE_LOGIN } from "../libs/routes";
import { POST_ACTION } from "../libs/routes_actions";

const Loginpage = () => {
  const initialState = { email: "", password: "" };
  const [data, setData] = useState(initialState);
  const { setUser } = useUserContext();

  const { email, password } = data;

  const navigate = useNavigate();
  // const {user} = useWebsocket()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleLogin = async () => {
    const ws = getWebSocket();
    try {
      if (!password || !email)
        return toast.error("Please provide crendentials");
      const { data } = await createHttpRequest(POST_ACTION, ROUTE_LOGIN, {
        email: email.toLowerCase(),
        password,
      });
      if (data?.success) {
        const res = data;
        if (res && res?.user?.role === "admin") {
          localStorage.setItem("x-token", res.token);
          toast.success("Log in successful!");
          setUser(res?.user);
          setData(initialState);
          data.user &&
            sendSocketMessage(ws, "init", {
              id: res.user._id,
              role: res.user.role,
            });
          navigate("/dashboard");
        } else {
          toast.error(
            "Something went wrong. Please ensure you are an admin to perform this action"
          );
        }
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message)
    }
    //  <Navigate to={'/dashboard'} />
  };

  useEffect(() => {
    const token = localStorage.getItem("x-token");
    if (token) {
      navigate("/dashboard");
    }
  });

  return (
    <div className="md:p-4">
      <h1 className="font-bold text-3xl text-center my-5 text-sky-300">
        LMTechub Quiz Application
      </h1>
      <div className="md:p-4 flex flex-col md:flex-row justify-around gap-8 md:gap-2">
        <div className="flex-1 md:ps-4">
          <h1 className="text-2xl font-semibold mb-3 text-center">
            For Company
          </h1>
          <div className="p-2">
            <div className="shadow-md rounded md:p-6 md:mt-5  flex flex-col gap-1 md:gap-4 items-center">
              <div className="relative w-full md:w-3/4 p-1">
                <input
                  id="input-email1"
                  value={email}
                  name="email"
                  onChange={handleChange}
                  type="text"
                  className="h-9 w-[100%] outline-none login-input border-bottom"
                />
                <label
                  htmlFor="input-email1"
                  className="absolute top-3 left-3 text-gray-500 text-sm"
                >
                  Email
                </label>
              </div>
              <div className="relative w-full md:w-3/4 p-1">
                <input
                  id="input-password1"
                  value={password}
                  name="password"
                  onChange={handleChange}
                  type="password"
                  className="h-9 w-[100%] outline-none p-2 login-input border-bottom"
                />
                <label
                  htmlFor="input-password1"
                  className="absolute top-3 left-3 text-gray-500 text-sm"
                >
                  Password
                </label>
              </div>
              <div className="relative w-full md:w-3/4 p-1">
                <button
                  onClick={() => handleLogin()}
                  className="cursor-pointer w-full p-1 bg-green-300 border-none outline-none"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
