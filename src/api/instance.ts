import axios, { AxiosError } from "axios";
import type { APIErrorResponse } from "./api.type";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<APIErrorResponse>) => {
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
