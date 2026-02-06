import axios from "axios";

const api = axios.create({
  baseURL: "https://locallensbackend.onrender.com",
});

export default api;
