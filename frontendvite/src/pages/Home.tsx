import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
// import LateralPanel from "../components/LateralPanel";
// import {
//   ChartBarIcon,
//   FireIcon,
//   UsersIcon,
//   TrophyIcon,
// } from "@heroicons/react/24/outline";

// DAVE GRAY: React Persistent User Login Authentication with JWT Tokens

export default function Home() {
  const { user, isAuthenticated, fetchUser } = useAuth();

  useEffect(() => {
    if (isAuthenticated && !user) {
      fetchUser(); // en caso de recarga de página
    }
  }, [isAuthenticated, user]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">pressLoad</h1>

      {isAuthenticated && user ? (
        <>
          <p>
            Bienvenido <b>{user.username}</b>
          </p>
          <p>Email: {user.email}</p>
        </>
      ) : (
        <p className="text-gray-600">
          Inicia sesión o regístrate para acceder a tus rutinas.
        </p>
      )}
    </div>
  );
}
