import axios from "axios";

const BASE_URL = "http://localhost:8081/vs";

const axiosInstance = axios.create({
  baseURL: BASE_URL, // Base URL de la API
  headers: {
    "Content-Type": "application/json",
  },
});

// Setting up Authentication
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(new Error(`Request failed: ${error.message}`));
  }
);

export default axiosInstance;
