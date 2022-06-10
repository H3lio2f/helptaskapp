import axios from "axios";

axios.defaults.headers["Access-Control-Allow-Origin"] = "*";

const api = axios.create({
  baseURL: "https://helptask-api.herokuapp.com/api/",
  /* baseURL: "http://localhost:8000/api/", */
});

export default api;
