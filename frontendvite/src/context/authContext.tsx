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
      if (response.accessToken) {
        TokenService.updateLocalAccessToken(response.accessToken);
      }
      if (response.refreshToken) {
        TokenService.updateLocalRefreshToken(response.refreshToken);
      }

      // Obtiene los datos del usuario
      const userResponse = await AuthService.getCurrentUser();
      setUser(userResponse.data);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
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
      if (response.accessToken) {
        TokenService.updateLocalAccessToken(response.accessToken);
      }
      if (response.refreshToken) {
        TokenService.updateLocalRefreshToken(response.refreshToken);
      }

      // Obtiene los datos del usuario
      const userResponse = await AuthService.getCurrentUser();
      setUser(userResponse.data);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = () => {
    AuthService.logout();
    TokenService.removeUser();
    setUser(null);
  };

  const value: AuthContextType = {
    isAuthenticated: !!user,
    loading,
    user,
    login,
    register,
    logout,
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
