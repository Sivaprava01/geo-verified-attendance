import axios from "axios";

const api = axios.create({
  baseURL: "https://geo-verified-attendance.onrender.com/api",
});

export default api;
