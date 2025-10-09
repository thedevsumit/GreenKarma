import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "https://chatlly.onrender.com/api",
  baseURL: "https://greenkarma-backend-h3qs.onrender.com/api",
  withCredentials: true,
});
