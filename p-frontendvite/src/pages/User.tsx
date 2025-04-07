import { useState, useEffect } from "react";

interface RepsWeight {
  reps: number;
  weight: number;
}

interface RoutineExercise {
  id: number;
  exerciseId: number; // ID del ejercicio asociado
  order: number;
  repsWeights: RepsWeight[];
}

interface Routine {
  id: number;
  name: string;
  description?: string; // Opcional
  createdAt: string; // Fecha en formato ISO
  updatedAt?: string; // Opcional
  routineExercises: RoutineExercise[];
}

interface userInfo {
  username: string;
  email: string;
  role: string;
  routines: Routine[];
}

export default function User() {
  const [user, setUser] = useState<userInfo>({
    username: "",
    email: "",
    role: "",
    routines: [],
  });

  const loadProfile = async () => {
    try {
      const response = await fetch("http://localhost:8080/users/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      }

      const data = await response.json();
      console.log("User profile loaded:", data);

      // Actualiza el estado con los datos del usuario
      setUser(data);
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  };

  // Ejecuta loadProfile al cargar el componente
  useEffect(() => {
    loadProfile();
  }, []); // El array vacío asegura que solo se ejecute una vez al montar el componente

  return (
    <div>
      <h1>User Profile</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <h2>Routines:</h2>
      <ul>
        {user.routines.map((routine) => (
          <li key={routine.id}>
            <strong>{routine.name}</strong>: {routine.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
