import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

interface User {
  id: string;
  email: string;
  username: string;
  // roles?: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  // Cierra sesión si llega un evento "unauthorized"
  useEffect(() => {
    const handleUnauthorized = () => logout();
    window.addEventListener("unauthorized", handleUnauthorized);
    return () => window.removeEventListener("unauthorized", handleUnauthorized);
  }, []);

  const saveTokens = (accessToken: string, refreshToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  };

  const fetchUser = async () => {
    try {
      const { data } = await api.get<User>("/users/profile");
      setUser(data);
    } catch (err) {
      console.error("No se pudo obtener el usuario actual:", err);
      logout();
    }
  };

  const login = async (username: string, password: string) => {
    const { data } = await api.post<{ accessToken: string; refreshToken: string }>(
      "/auth/login",
      { username, password }
    );
    saveTokens(data.accessToken, data.refreshToken);
    await fetchUser();
    navigate("/");
  };

  const register = async (username: string, email: string, password: string) => {
    const { data } = await api.post<{ accessToken: string; refreshToken: string }>(
      "/auth/register",
      { username, email, password }
    );
    saveTokens(data.accessToken, data.refreshToken);
    await fetchUser();
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    navigate("/login");
  };

  // Al montar, si hay token, intenta cargar el usuario
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
};