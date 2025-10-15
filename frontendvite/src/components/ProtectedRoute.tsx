import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { JSX } from "react";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();

  // Muestra un loading mientras verifica la autenticación
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Cargando...</div>
      </div>
    );
  }

  return isAuthenticated ? (
    children
  ) : (
    <Navigate
      to="/login"
      replace
    />
  );
}
