import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ error: string }>) => {
    const res = error.response;

    if (res?.data?.error) {
      // 將 error 字串轉換成 JS Error
      return Promise.reject(new Error(res.data.error));
    }

    // fallback：預設錯誤物件
    return Promise.reject(error);
  },
);

export default api;
