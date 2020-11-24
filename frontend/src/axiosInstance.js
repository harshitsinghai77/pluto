/* global window */
import axios from "axios";

console.log(process.env.REACT_APP_NODE_APP_BASE_URL);
// init axios for Node.js
export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_NODE_APP_BASE_URL,
  timeout: 60 * 1000,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

window.axiosInstance = axiosInstance;
// done
