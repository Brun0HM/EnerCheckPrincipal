import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:7257",
});

export default api;
