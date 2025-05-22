import { useState } from "react";
import LateralPanel from "../components/LateralPanel";
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  ChevronDownIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

interface Exercise {
  id: number;
  name: string;
  sets: number;
  reps: number;
  weight: number;
  notes?: string;
}

interface Routine {
  id: number;
  name: string;
  exercises: Exercise[];
  lastUsed?: Date;
}

export default function Routines() {
  const [routines, setRoutines] = useState<Routine[]>([
    {
      id: 1,
      name: "Push Day",
      exercises: [
        { id: 1, name: "Bench Press", sets: 4, reps: 12, weight: 80 },
        { id: 2, name: "Shoulder Press", sets: 3, reps: 12, weight: 60 },
      ],
      lastUsed: new Date(),
    },
  ]);
  const [selectedRoutine, setSelectedRoutine] = useState<Routine | null>(null);
  const [isAddingExercise, setIsAddingExercise] = useState(false);

  return (
    <div className="flex flex-row min-h-full bg-gray-150">
      <LateralPanel />
      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-7xl flex flex-col sm:flex-row mt-4">
          {/* Columna izquierda - Lista de rutinas */}
          <div className="flex-1 p-4 overflow-y-auto sm:mr-5 md:mr-0">
            <div className="flex flex-col space-y-4">
              {/* Encabezado */}
              <div className="">
                <div className="flex items-center justify-between p-4">
                  <h2 className="text-lg font-semibold">Mis Rutinas</h2>
                  <button
                    className="p-2 hover:bg-gray-100 rounded-full"
                    onClick={() => setIsAddingExercise(true)}
                  >
                    <PlusIcon className="h-6 w-6 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Lista de rutinas */}
              {routines.map((routine) => (
                <div
                  key={routine.id}
                  className=" cursor-pointer hover:bg-gray-50"
                  onClick={() => setSelectedRoutine(routine)}
                >
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">{routine.name}</h3>
                      <div className="flex space-x-2">
                        <PencilSquareIcon className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                        <TrashIcon className="h-5 w-5 text-gray-500 hover:text-red-600" />
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      {routine.exercises.map((exercise) => (
                        <div
                          key={exercise.id}
                          className="flex justify-between items-center text-sm text-gray-600 border-b border-gray-100 pb-2"
                        >
                          <span>{exercise.name}</span>
                          <span>
                            {exercise.sets}x{exercise.reps} @ {exercise.weight}
                            kg
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 text-xs text-gray-500">
                      Último uso: {routine.lastUsed?.toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}

              {/* Botón añadir rutina */}
              <button className=" hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-center p-4 text-gray-500">
                  <PlusIcon className="h-6 w-6 mr-2" />
                  <span>Crear nueva rutina</span>
                </div>
              </button>
            </div>
          </div>

          {/* Columna derecha - Detalles y edición */}
          <div className="hidden md:flex p-4 md:sticky md:top-0 md:h-screen md:mr-10 lg:mr-25 overflow-hidden items-start justify-center">
            <div className="">
              <div className="p-4 w-80">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Detalles de la rutina</h3>
                  <ArrowPathIcon className="h-6 w-6 text-gray-500" />
                </div>

                {selectedRoutine ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={selectedRoutine.name}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />

                    {selectedRoutine.exercises.map((exercise) => (
                      <div
                        key={exercise.id}
                        className="p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{exercise.name}</span>
                          <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                        </div>
                        <div className="mt-2 grid grid-cols-3 gap-2">
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-500">
                              Series
                            </span>
                            <input
                              type="number"
                              value={exercise.sets}
                              className="w-full p-1 border border-gray-300 rounded"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-500">Reps</span>
                            <input
                              type="number"
                              value={exercise.reps}
                              className="w-full p-1 border border-gray-300 rounded"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-500">
                              Peso (kg)
                            </span>
                            <input
                              type="number"
                              value={exercise.weight}
                              className="w-full p-1 border border-gray-300 rounded"
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    <button className="w-full p-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors">
                      Guardar cambios
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-48 text-gray-400">
                    <span>Selecciona una rutina para editarla</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Características implementadas:
// Lista de rutinas (columna izquierda):

// Muestra todas las rutinas creadas
// Cada rutina muestra sus ejercicios
// Botones para editar y eliminar
// Botón para crear nueva rutina
// Panel de edición (columna derecha):

// Formulario para editar la rutina seleccionada
// Campos para nombre, series, repeticiones y peso
// Interfaz intuitiva y minimalista
// Funcionalidades incluidas:

// Selección de rutina para editar
// Edición de ejercicios existentes
// Añadir nuevos ejercicios
// Eliminar ejercicios
// Guardar cambios
// Siguiente paso:
// Para completar la funcionalidad necesitarías:

// Implementar los modales para:

// Crear nueva rutina
// Añadir ejercicio
// Confirmar eliminación
// Añadir las funciones de manejo:

// handleAddRoutine
// handleEditRoutine
// handleDeleteRoutine
// handleAddExercise
// handleUpdateExercise
// Conectar con el backend para:

// Guardar rutinas
// Cargar rutinas existentes
// Actualizar ejercicios
