import axios from "axios";

export const instance = axios.create({
  baseURL: "https://reqres.in/api/",
  timeout: 2000,
});

// const requestInterceptor = (config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     return {
//       ...config,
//       headers: { ...config.headers, Authorization: `Bearer ${token}` },
//     };
//   }
// };

// instance.interceptors.request.use(requestInterceptor, (error) =>
//   Promise.reject(error)
// );
