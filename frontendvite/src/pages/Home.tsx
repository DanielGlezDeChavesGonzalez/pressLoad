import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { User } from "../types/auth.types";
// import LateralPanel from "../components/LateralPanel";
// import {
//   ChartBarIcon,
//   FireIcon,
//   UsersIcon,
//   TrophyIcon,
// } from "@heroicons/react/24/outline";

// DAVE GRAY: React Persistent User Login Authentication with JWT Tokens

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">pressLoad</h1>

      <>
        <p>Bienvenido</p>
        <p>Email: </p>
      </>
    </div>
  );
}
