import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ error: string }>) => {
    const res = error.response;

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      // window.location.href = "/admin/login";
    }

    if (res?.data?.error) {
      // 將 error 字串轉換成 JS Error
      return Promise.reject(new Error(res.data.error));
    }

    // fallback：預設錯誤物件
    return Promise.reject(error);
  },
);

export default api;
