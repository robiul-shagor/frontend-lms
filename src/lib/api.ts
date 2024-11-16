import axios from "axios";

const api = axios.create({
  baseURL: "https://api.houseton.ca",
});

export default api;
