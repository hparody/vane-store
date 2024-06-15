import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

const httpAdapterInstance = axios.create({
  baseURL: BASE_URL, // Base URL de la API
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

export default httpAdapterInstance;
