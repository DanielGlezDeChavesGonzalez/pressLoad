import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { AuthContextType, User } from "../types/auth.types";
import AuthService from "../services/auth.service";
import { TokenService } from "../services/token.service";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Al montar, verifica si hay un token válido
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = TokenService.getLocalAccessToken();
        if (token) {
          // Intenta obtener el usuario actual
          const response = await AuthService.getCurrentUser();
          setUser(response.data);
        }
      } catch (error) {
        // Si falla, limpia los tokens
        console.error("Error initializing auth:", error);
        TokenService.removeUser();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await AuthService.login(username, password);

      // Guarda los tokens (AuthService ya lo hace, pero por consistencia)
      if (response.access_token) {
        TokenService.updateLocalAccessToken(response.access_token);
      }
      if (response.refresh_token) {
        TokenService.updateLocalRefreshToken(response.refresh_token);
      }

      // Obtiene los datos del usuario
      const userResponse = await AuthService.getCurrentUser();
      setUser(userResponse.data);
    } catch (error: any) {
      // Manejo específico de errores según código HTTP
      const status = error.response?.status;
      const message = error.response?.data?.message || error.message;

      let errorMessage = "Error de autenticación";

      switch (status) {
        case 401:
          errorMessage = "El usuario no existe";
          break;
        case 403:
          errorMessage = "Contraseña incorrecta";
          break;
        case 405:
          errorMessage = "Error de autenticación. Intente nuevamente";
          break;
        default:
          errorMessage = message || "Error desconocido";
      }

      throw new Error(errorMessage);
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await AuthService.register(username, email, password);

      // Guarda los tokens
      if (response.access_token) {
        TokenService.updateLocalAccessToken(response.access_token);
      }
      if (response.refresh_token) {
        TokenService.updateLocalRefreshToken(response.refresh_token);
      }

      // Obtiene los datos del usuario
      const userResponse = await AuthService.getCurrentUser();
      setUser(userResponse.data);
    } catch (error: any) {
      const status = error.response?.status;
      const message = error.response?.data?.message || error.message;

      let errorMessage = "Error en el registro";

      switch (status) {
        case 400:
          errorMessage = "Datos inválidos. Verifique la información";
          break;
        case 409:
          errorMessage = "El usuario o email ya existe";
          break;
        default:
          errorMessage = message || "Error desconocido en el registro";
      }

      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    AuthService.logout();
    TokenService.removeUser();
    setUser(null);
  };

  // Función para refrescar los datos del usuario sin hacer login nuevamente
  const refreshUserData = async () => {
    try {
      const response = await AuthService.getCurrentUser();
      setUser(response.data);
    } catch (error) {
      console.error("Error refreshing user data:", error);
      throw error;
    }
  };

  const value: AuthContextType = {
    isAuthenticated: !!user,
    loading,
    user,
    login,
    register,
    logout,
    refreshUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
