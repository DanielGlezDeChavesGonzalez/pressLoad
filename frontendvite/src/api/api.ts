import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: "http://localhost:8080/",
  // import.meta.env.VITE_API_URL ||
});

// Agrega el access token a todas las peticiones
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("accessToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intenta refrescar el token si vence
api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        window.location.replace("/login");
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post<{ accessToken: string }>(
          "http://localhost:8080/auth/refresh",
          { refreshToken }
        );

        localStorage.setItem("accessToken", data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.replace("/login");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
