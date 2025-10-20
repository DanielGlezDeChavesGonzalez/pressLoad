import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { TokenService } from "../services/token.service";

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

    if (originalConfig.url !== "/auth/login" && error.response) {
      // Access Token was expired
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const refreshToken = TokenService.getLocalRefreshToken();

          if (!refreshToken) {
            // No hay refresh token, redirigir al login
            window.location.href = "/login";
            return Promise.reject(error);
          }

          // Envía el refresh token en el header Authorization (como lo espera el backend)
          const rs = await axios.post(
            "http://localhost:8080/auth/refreshtoken",
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          );

          const { access_token, refresh_token } = rs.data;

          // Actualiza ambos tokens
          TokenService.updateLocalAccessToken(access_token);
          if (refresh_token) {
            TokenService.updateLocalRefreshToken(refresh_token);
          }

          // Actualiza el header de la petición original con el nuevo token
          originalConfig.headers["Authorization"] = `Bearer ${access_token}`;

          return api(originalConfig);
        } catch (_error) {
          // Si falla el refresh, limpia tokens y redirige al login
          TokenService.removeUser();
          window.location.href = "/login";
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
