import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import {TokenService} from "../services/token.service";

const api = axios.create({
  baseURL: "http://localhost:8080/",
  // import.meta.env.VITE_API_URL ||
  headers: {
    "Content-Type": "application/json",
  },
});

// Agrega el access token a todas las peticiones
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = TokenService.getLocalAccessToken();
  if (token) {
    config.headers["Authorization"] = 'Bearer ' + token;
  }
  return config;
});

// Intenta refrescar el token si vence
api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalConfig = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (originalConfig.url !== "/auth/signin" && error.response) {
      // Access Token was expired
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await api.post("/auth/refreshtoken", {
            refreshToken: TokenService.getLocalRefreshToken(),
          });

          const { accessToken } = rs.data;
          TokenService.updateLocalAccessToken(accessToken);

          return api(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
