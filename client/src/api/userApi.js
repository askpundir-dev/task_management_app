import axios from "axios";
import { throwAPIError } from "../utils/apiError";

// ----------------------------------------------
const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, //
});

export default api;
// ----------------------------------------------

// register user
const postRegisterRequest = async (email, password, fullName) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/register`, {
      email,
      password,
      fullName,
    });

    return response.data; // { success, message }
  } catch (error) {
    throwAPIError(error); // util fn to normalize error
  }
};

const postLoginRequest = async (email, password) => {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throwAPIError(error);
  }
};

const getLogoutResponse = async () => {
  try {
    const res = await api.get("/auth/logout");
    return res.data;
  } catch (error) {
    throwAPIError(error);
  }
};

export { postRegisterRequest, postLoginRequest, getLogoutResponse };
