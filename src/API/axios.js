import axios from "axios";

export const instance = axios.create({
  baseURL: "https://reqres.in/api/",
  timeout: 2000,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;

    // if (token) {
    //   return {
    //     ...config,
    //     headers: {
    //       ...config.headers,
    //       Authorization: `Bearer ${token}`,
    //     },
    //   };
    // }
  },
  (error) => Promise.reject(error)
);
