import { useState, useEffect } from "react";
import LateralPanel from "../components/LateralPanel";
import MiniCalendar from "../components/MiniCalendar";
import { apiService, type Routine } from "../services/api";
import {
  PlusIcon,
  TrashIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

export default function Routines() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newRoutineName, setNewRoutineName] = useState("");
  const [newRoutineDescription, setNewRoutineDescription] = useState("");

  // Función helper para formatear fechas
  const formatDateToString = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(selectedDate);
    if (direction === "prev") {
      newDate.setDate(newDate.getDate() - 1);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setSelectedDate(newDate);
  };

  // Cargar rutinas para la fecha seleccionada
  useEffect(() => {
    const loadRoutines = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const dateString = formatDateToString(selectedDate);
        const routinesData = await apiService.getRoutinesByDate(dateString);
        setRoutines(routinesData);
      } catch (error) {
        console.error("Error loading routines:", error);
        setError("Error al cargar las rutinas");
        setRoutines([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadRoutines();
  }, [selectedDate]);

  // Funciones para manejar las operaciones CRUD
  const handleCreateRoutine = async () => {
    if (!newRoutineName.trim()) return;

    try {
      const routineData = {
        name: newRoutineName,
        description: newRoutineDescription,
        date: formatDateToString(selectedDate),
        notes: "",
      };
      const createdRoutine = await apiService.createRoutine(routineData);
      setRoutines((prev) => [...prev, createdRoutine]);
      setNewRoutineName("");
      setNewRoutineDescription("");
      setShowCreateForm(false);
    } catch (error) {
      console.error("Error creating routine:", error);
      setError("Error al crear la rutina");
    }
  };

  const handleDeleteRoutine = async (id: number) => {
    try {
      await apiService.deleteRoutine(id);
      setRoutines((prev) => prev.filter((routine) => routine.id !== id));
    } catch (error) {
      console.error("Error deleting routine:", error);
      setError("Error al eliminar la rutina");
    }
  };

  return (
    <div className='flex flex-row min-h-full bg-gray-50'>
      <LateralPanel />
      <div className='flex-1 flex justify-center'>
        <div className='w-full max-w-7xl flex flex-col sm:flex-row mt-4'>
          {/* Columna izquierda - Lista de rutinas */}
          <div className='flex-1 p-4 overflow-y-auto sm:mr-5 md:mr-0'>
            <div className='flex flex-col space-y-4'>
              {/* Navegación de fechas */}
              <div className='mb-4'>
                <div className='flex items-center justify-between p-4'>
                  <button
                    className='p-2 hover:bg-gray-100 rounded-full'
                    onClick={() => navigateDate("prev")}>
                    <ChevronLeftIcon className='h-6 w-6' />
                  </button>
                  <h2 className='text-lg font-semibold capitalize'>
                    {formatDate(selectedDate)}
                  </h2>
                  <button
                    className='p-2 hover:bg-gray-100 rounded-full'
                    onClick={() => navigateDate("next")}>
                    <ChevronRightIcon className='h-6 w-6' />
                  </button>
                </div>
              </div>

              {/* Mensaje de error */}
              {error && (
                <div className='bg-red-50 border border-red-200 rounded-lg p-4 mb-4'>
                  <p className='text-red-700'>{error}</p>
                  <button
                    onClick={() => setError(null)}
                    className='text-red-500 hover:text-red-700 underline text-sm mt-2'>
                    Cerrar
                  </button>
                </div>
              )}

              {/* Indicador de carga */}
              {isLoading ? (
                <div className='flex justify-center items-center py-8'>
                  <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
                  <span className='ml-2 text-gray-600'>
                    Cargando rutinas...
                  </span>
                </div>
              ) : routines.length === 0 ? (
                <div className='text-center py-8 text-gray-500'>
                  <p className='mb-4'>
                    No hay rutinas registradas para este día
                  </p>
                  <button
                    onClick={() => setShowCreateForm(true)}
                    className='text-blue-600 hover:text-blue-700 underline'>
                    Crear primera rutina
                  </button>
                </div>
              ) : (
                <>
                  {/* Lista de rutinas */}
                  <div className='space-y-4'>
                    {routines.map((routine) => (
                      <div
                        key={routine.id}
                        className='bg-white rounded-lg shadow p-4'>
                        <div className='flex justify-between items-start mb-2'>
                          <h3 className='text-lg font-semibold text-gray-800'>
                            {routine.name}
                          </h3>
                          <button
                            onClick={() => handleDeleteRoutine(routine.id)}
                            className='text-red-500 hover:text-red-700'>
                            <TrashIcon className='h-5 w-5' />
                          </button>
                        </div>
                        {routine.description && (
                          <p className='text-gray-600 text-sm mb-2'>
                            {routine.description}
                          </p>
                        )}
                        {routine.notes && (
                          <p className='text-gray-500 text-xs'>
                            {routine.notes}
                          </p>
                        )}
                        <div className='mt-3'>
                          <p className='text-sm text-gray-500'>
                            Ejercicios: {routine.exercises?.length || 0}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Botón para agregar nueva rutina */}
                  <button
                    onClick={() => setShowCreateForm(true)}
                    className='w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-3'>
                    <div className='flex items-center justify-center space-x-2'>
                      <PlusIcon className='h-4 w-4' />
                      <span className='font-medium text-sm'>
                        Añadir nueva rutina
                      </span>
                    </div>
                  </button>
                </>
              )}

              {/* Formulario de creación */}
              {showCreateForm && (
                <div className='bg-white rounded-lg shadow p-4 border-2 border-blue-200'>
                  <h4 className='text-lg font-semibold mb-4'>Nueva Rutina</h4>
                  <div className='space-y-4'>
                    <input
                      type='text'
                      placeholder='Nombre de la rutina'
                      value={newRoutineName}
                      onChange={(e) => setNewRoutineName(e.target.value)}
                      className='w-full p-2 border border-gray-300 rounded'
                    />
                    <textarea
                      placeholder='Descripción (opcional)'
                      value={newRoutineDescription}
                      onChange={(e) => setNewRoutineDescription(e.target.value)}
                      className='w-full p-2 border border-gray-300 rounded'
                      rows={3}
                    />
                    <div className='flex space-x-2'>
                      <button
                        onClick={handleCreateRoutine}
                        className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'>
                        Crear
                      </button>
                      <button
                        onClick={() => {
                          setShowCreateForm(false);
                          setNewRoutineName("");
                          setNewRoutineDescription("");
                        }}
                        className='px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400'>
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Columna derecha - Calendario */}
          <div className='hidden md:flex p-4 md:sticky md:top-0 md:h-screen md:mr-10 lg:mr-25 overflow-hidden items-start justify-center'>
            <div className='space-y-4'>
              <div className='bg-white rounded-lg shadow-sm p-4'>
                <MiniCalendar
                  selectedDate={selectedDate}
                  onDateSelect={setSelectedDate}
                  renderDay={(day) => {
                    // Aquí podrías agregar indicadores visuales para días con rutinas
                    return (
                      <div className='relative flex flex-col items-center'>
                        <span>{day.getDate()}</span>
                      </div>
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
