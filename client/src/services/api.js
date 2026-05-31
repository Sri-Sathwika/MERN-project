import axios from "axios";

const API = axios.create({
  baseURL:
    "https://mern-project-1-2b5e.onrender.com/",
});

// ADD TOKEN AUTOMATICALLY

API.interceptors.request.use(
  (req) => {

    const token =
      localStorage.getItem("token");

    if (token) {

      req.headers.Authorization =
        `Bearer ${token}`;
    }

    return req;
  }
);

export default API;