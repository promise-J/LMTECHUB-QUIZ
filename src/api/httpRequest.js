import axios from "axios";
import baseUrl from "./baseUrl";
import { X_TOKEN } from "../libs/constants";
import { ERROR_JWT_EXPIRED, ERROR_JWT_MALFORMED } from "../libs/error_messsge";
import { toast } from "react-toastify";

async function createHttpRequest(
  requestType,
  reqPath,
  data = {},
  token = null
) {
  let res;
  try {
    if (requestType === "put" || requestType === "post" || requestType === "delete") {
      res = await axios[requestType](`${baseUrl}${reqPath}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
        return res
    } else {
      // if(token){
        res = await axios[requestType](`${baseUrl}${reqPath}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res
      // }
      // return res = await axios[requestType](`${baseUrl}${reqPath}`)
    }
  } catch (error) {
    if (error?.response?.data?.message === ERROR_JWT_EXPIRED) {
      localStorage.removeItem(X_TOKEN);
      toast.error('Your session has expired')
      window.location.href = "/";
    }
    // console.log(error, 'custom request error')
  }

  return res;
}

export default createHttpRequest;
