import axios from "axios";
import { errorAsyncHandler } from "@/utils/errorAsyncHandler";
import Cookies from "js-cookie";

const apiBase = "https://todolist-api.hexschool.io";

const callAxios = axios.create({
  baseURL: apiBase,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

callAxios.interceptors.request.use((config) => {
  const token = Cookies.get("token");

  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

callAxios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return errorAsyncHandler(error.response?.data || error);
  }
);

export default callAxios;
